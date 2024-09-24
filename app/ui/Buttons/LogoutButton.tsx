"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Logout } from "@mui/icons-material";
export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
  };
  return (
    <>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Uitloggen" />
      </ListItemButton>
    </>
  );
}
