"use client";
import {
  Box,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../Header/Header";
import { useSession } from "next-auth/react";

const ProfileContainer = () => {
  const session = useSession();
  const user: any = session.data?.user;
 


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: "8px",
            maxHeight: "7vh",
            background: "#13082a",
            color: "white",
          }}
        >
          <Header />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "900px",
              padding: "24px",
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            elevation={4}
          >
            <Typography variant="h6">Profile</Typography>
            <TextField
              value={user?.email || " "}
              variant="filled"
              fullWidth
              label="Email"
              disabled
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ProfileContainer;
