"use client";
import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface HeaderButtonProps {
  openSideNavigation: boolean;
  setOpenSideNavigation: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderButton : React.FC<HeaderButtonProps>= (props) => {
  const { openSideNavigation, setOpenSideNavigation } = props;
  return (
    <IconButton
      size="large"
      edge="start"
      aria-label="open drawer"
      style={{
        marginRight: 2,
        color: "white",
        opacity: 1,
      }}
      onClick={() => {
        setOpenSideNavigation(!openSideNavigation);
      }}
    >
      <Menu sx={{ opacity: "0.66" }} />
    </IconButton>
  );
};
export default HeaderButton;
