"use client";
import { CircularProgress, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box } from "@mui/material";

interface AuthGuardProps {
  children: React.ReactNode;
  authRequired: boolean;
  redirectTo: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  authRequired,
  redirectTo,
}) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Don't do anything while loading

    if (authRequired && status === "unauthenticated") {
      router.push(redirectTo);
    } else if (!authRequired && status === "authenticated") {
      router.push(redirectTo);
    }
  }, [status, router, authRequired, redirectTo]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "40%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography>Loading </Typography>
      </Box>
    );
  }

  if (authRequired && status === "unauthenticated") {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "40%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography>Unauthorised! you are being redirected </Typography>
      </Box>
    );
  }

  if (!authRequired && status === "authenticated") {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "40%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography>You are being redirected </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
