"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import HeaderButton from "./HeaderButton";
import LeftMenu from "./LeftMenu";
import React from "react";

const Header: React.FC<any> = () => {
  const [openSideNavigation, setOpenSideNavigation] = React.useState(false);
  return (
    <>
      <LeftMenu
        openSideNavigation={openSideNavigation}
        setOpenSideNavigation={setOpenSideNavigation}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        id="header-container"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <HeaderButton
            openSideNavigation={openSideNavigation}
            setOpenSideNavigation={setOpenSideNavigation}
          />

          <MUIBreadcrumbs
            sx={{
              color: "inherit",
            }}
          >
            <Link href={"/"} passHref legacyBehavior>
              <Typography
                component="a"
                sx={{
                  color: "white",
                  textDecoration: "none", // Removes underline
                  cursor: "pointer", // Optional: to ensure it behaves like a link
                }}
              >
                Dashboard
              </Typography>
            </Link>
          </MUIBreadcrumbs>
        </Box>
      </Box>
    </>
  );
};

export default Header;
