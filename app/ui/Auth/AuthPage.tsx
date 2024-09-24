"use client";
import React from "react";
import { Box, Paper } from "@mui/material";
import AuthForm from "./AuthForm";

export default function AuthPage({ tokenId }: { tokenId?: string }) {
  return (
    <Box
      id="main-page"
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AuthForm tokenId={tokenId} />
      </Paper>
    </Box>
  );
}
