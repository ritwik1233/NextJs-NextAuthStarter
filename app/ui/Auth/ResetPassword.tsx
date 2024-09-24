"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, IconButton, InputLabel, Typography } from "@mui/material";
import { isEntryEmpty } from "../../utils/utils";

interface ResetPasswordProps {
  loading: boolean;
  errorMessage: string;
  handleResetPassword: (password: string) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const { handleResetPassword, loading, errorMessage } = props;
  const [password1, setPassword1] = React.useState({
    value: "",
    error: "",
    showPassword: false,
  });
  const [password2, setPassword2] = React.useState({
    value: "",
    error: "",
    showPassword: false,
  });
  const onChangePassword1 = (event: any) => {
    setPassword1((prev) => {
      return {
        ...prev,
        error: "",
        value: event.target.value,
      };
    });
  };
  const onChangePassword2 = (event: any) => {
    setPassword2((prev) => {
      return {
        ...prev,
        error: "",
        value: event.target.value,
      };
    });
  };

  const onToggleShowPassword1 = () => {
    setPassword1((prev) => {
      return {
        ...prev,
        showPassword: !prev.showPassword,
      };
    });
  };

  const onToggleShowPassword2 = () => {
    setPassword2((prev) => {
      return {
        ...prev,
        showPassword: !prev.showPassword,
      };
    });
  };

  const onSubmitRegisterDetails = () => {
    if (password1?.value?.length === 0) {
      setPassword1((prev) => {
        return {
          ...prev,
          error: "Password is empty",
        };
      });
      return;
    }
    if (password2?.value?.length === 0) {
      setPassword2((prev) => {
        return {
          ...prev,
          error: "Password is empty",
        };
      });
      return;
    }
    if (password1.value !== password2.value) {
      setPassword1((prev) => {
        return {
          ...prev,
          error: "Password don't match",
        };
      });
      setPassword2((prev) => {
        return {
          ...prev,
          error: "Password don't match",
        };
      });
      return;
    }
    setPassword1((prev) => {
      return {
        ...prev,
        error: "",
      };
    });
    setPassword2((prev) => {
      return {
        ...prev,
        error: "",
      };
    });
    handleResetPassword(password1.value);
  };
  return (
    <div>
      {errorMessage && (
        <Typography align="center" color="red">
          {errorMessage}
        </Typography>
      )}
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: "32px" }}
        data-cy={"forgot-password-title"}
      >
        Wachtwoord vergeten?
      </Typography>
      <InputLabel htmlFor="password"> Password </InputLabel>
      <TextField
        id="password"
        error={!isEntryEmpty(password1.error)}
        label={password1.error}
        value={password1.value}
        onChange={onChangePassword1}
        type={password1.showPassword ? "text" : "password"}
        variant="outlined"
        required
        inputProps={{
          "data-cy": "password",
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={onToggleShowPassword1}>
              {password1.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
        size="small"
        fullWidth
        sx={{ marginBottom: "28px" }}
      />
      <InputLabel htmlFor="password">Confirm Password </InputLabel>
      <TextField
        id="cpassword"
        error={!isEntryEmpty(password2.error)}
        label={password2.error}
        value={password2.value}
        onChange={onChangePassword2}
        type={password2.showPassword ? "text" : "password"}
        variant="outlined"
        required
        inputProps={{
          "data-cy": "cpassword",
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={onToggleShowPassword2}>
              {password2.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
        size="small"
        fullWidth
        sx={{ marginBottom: "28px" }}
      />
      <Button
        variant="contained"
        disabled={loading}
        onClick={onSubmitRegisterDetails}
        type="submit"
        fullWidth
        data-cy="reset-password-button"
        sx={{ marginBottom: "22px" }}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ResetPassword;
