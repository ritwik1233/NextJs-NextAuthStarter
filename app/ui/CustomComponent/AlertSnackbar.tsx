import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface AlertSnackbarProps {
  open: boolean;
  onClose: () => void;
  text: string;
  severity: "success" | "info" | "warning" | "error";
}

export default function AlertSnackbar({
  open,
  onClose,
  text,
  severity,
}: AlertSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
