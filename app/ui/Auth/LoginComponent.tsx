"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { isEntryEmpty, validateEmail } from "../../utils/utils";
import Link from "next/link";

interface LoginComponentProps {
  onSubmit: (userData: {
    email: string;
    password: string;
  }) => void;
  errorMessage: string;
  loading: boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = (props) => {
  const { onSubmit, errorMessage, loading } = props;
  const [emailData, setEmailData] = React.useState({
    value: "",
    error: "",
  });

  const [passwordData, setPasswordData] = React.useState({
    value: "",
    error: "",
    showPassword: false,
  });

  // functions
  const onChangeEmail = (event: any) => {
    setEmailData((prev) => {
      return {
        ...prev,
        error: "",
        value: event.target.value,
      };
    });
  };

  const onChangePassword = (event: any) => {
    setPasswordData((prev) => {
      return {
        ...prev,
        error: "",
        value: event.target.value,
      };
    });
  };

  const onToggleShowPassword = () => {
    setPasswordData((prev) => {
      return {
        ...prev,
        showPassword: !prev.showPassword,
      };
    });
  };

  const onSubmitLoginDetails = () => {
    if (isEntryEmpty(emailData.value)) {
      setEmailData((prev) => {
        return {
          ...prev,
          error: "Invalid email",
        };
      });
      return;
    }
    if (isEntryEmpty(passwordData.value)) {
      setPasswordData((prev) => {
        return {
          ...prev,
          error: "Incorrect password.",
        };
      });
      return;
    }
    if (!validateEmail(emailData.value)) {
      setEmailData((prev) => {
        return {
          ...prev,
          error: "Invalid email",
        };
      });
      return;
    }
    const userDetails = {
      email: emailData.value,
      password: passwordData.value
    };
    onSubmit(userDetails);
  };

  const handlePasswordKeyboard = (e: any) => {
    if (e.key === "Enter") {
      onSubmitLoginDetails();
    }
  };

  return (
    <div>
      {errorMessage && <Typography color="red">{errorMessage}</Typography>}
      <TextField
        placeholder={"Email"}
        id="email"
        error={!isEntryEmpty(emailData.error)}
        label={emailData.error}
        value={emailData.value}
        onChange={onChangeEmail}
        type="email"
        inputProps={{
          "data-cy": "email",
        }}
        variant="outlined"
        required
        fullWidth
        sx={{ marginBottom: "16px" }}
      />

      <TextField
        placeholder={"password"}
        id="password"
        error={!isEntryEmpty(passwordData.error)}
        label={passwordData.error}
        value={passwordData.value}
        onChange={onChangePassword}
        type={passwordData.showPassword ? "text" : "password"}
        variant="outlined"
        required
        inputProps={{
          "data-cy": "password",
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={onToggleShowPassword}>
              {passwordData.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
        fullWidth
        sx={{ marginBottom: "12px" }}
        onKeyDown={handlePasswordKeyboard}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "28px",
          justifyContent: "end",
        }}
      >
        <Link href="/forgot-password" data-cy="forgot-password">
          <Typography variant="body2"> Forgot password? </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" align="center">
          No account yet? &nbsp;
          <Link color="inherit" data-cy="signin-link" href="/signup">
            Register here
          </Link>
        </Typography>
        <Button
          variant="contained"
          onClick={onSubmitLoginDetails}
          disabled={loading}
          type="submit"
          fullWidth
          data-cy="signin"
          sx={{ width: "110px", background: "#008AD1" }}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default LoginComponent;
