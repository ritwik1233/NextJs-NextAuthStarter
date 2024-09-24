"use client";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import LogoutButton from "../Buttons/LogoutButton";
import Link from "next/link";
import { Settings, SmartToy } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface LeftMenuProps {
  openSideNavigation: boolean;
  setOpenSideNavigation: React.Dispatch<React.SetStateAction<boolean>>;
}
const LeftMenu: React.FC<LeftMenuProps> = (props) => {
  const router = useRouter();
  const { openSideNavigation, setOpenSideNavigation } = props;
  const session: any = useSession();
  const user = session?.data?.user;
  const onProfileClick = () => {
    router.push("/profile");
  };
  return (
    <SwipeableDrawer
      open={openSideNavigation}
      anchor="left"
      onClose={() => {
        setOpenSideNavigation(false);
      }}
      onOpen={() => {
        setOpenSideNavigation(true);
      }}
      sx={{ "& .MuiPaper-root": { width: "320px" } }}
    >
      <List
        subheader={
          <>
            {session && (
              <ListItem
                sx={{ py: "1em", cursor: "pointer" }}
                data-cy={"side-menu-profile"}
                onClick={onProfileClick}
              >
                <ListItemAvatar>
                  <Avatar src="" />
                </ListItemAvatar>
                <Typography>{user.email}</Typography>
              </ListItem>
            )}
          </>
        }
      >
        <ListItem>
          <LogoutButton />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

export default LeftMenu;
