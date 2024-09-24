"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { isEntryEmpty, validateEmail } from "../../utils/utils";
import Link from "next/link";

interface ForgotPasswordProps {
  loading: boolean;
  errorMessage: string;
  forgotPasswordSuccess: boolean;
  onSubmit: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const { loading, errorMessage, forgotPasswordSuccess, onSubmit } = props;
  const [emailData, setEmailData] = React.useState({
    value: "",
    error: "",
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

  const onSubmitEmailDetails = () => {
    if (isEntryEmpty(emailData.value)) {
      setEmailData((prev) => {
        return {
          ...prev,
          error: "Invalid email",
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
    };
    onSubmit(userDetails.email);
  };

  return (
    <>
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: "32px" }}
        data-cy={"forgot-password-title"}
      >
        Forgot your password?
      </Typography>
      {!forgotPasswordSuccess && (
        <Typography variant="body2" align="center" data-cy="signup-description">
          No problem! Provide your email address and we will send you a new
          password.
        </Typography>
      )}
      {errorMessage && (
        <Typography align="center" color="red">
          {errorMessage}
        </Typography>
      )}
      {forgotPasswordSuccess && (
        <Typography variant="body2" align="center">
          Check your email for the reset link password
        </Typography>
      )}
      {!forgotPasswordSuccess && (
        <>
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

          <Button
            variant="contained"
            disabled={loading}
            onClick={onSubmitEmailDetails}
            type="submit"
            fullWidth
            data-cy="signin"
            sx={{ width: "110px" }}
          >
            Send
          </Button>
        </>
      )}
      <Typography variant="body2" align="center" sx={{ cursor: "pointer" }}>
        <Link data-cy="singup-link" href="/signup">
          Back to register
        </Link>
      </Typography>
    </>
  );
};

export default ForgotPassword;
