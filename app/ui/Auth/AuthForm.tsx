"use client";
import { usePathname } from "next/navigation";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import AuthGuard from "./AuthGuard";
export default function AuthForm({ tokenId }: { tokenId?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] =
    React.useState(false);
  const handleLogin = async (userData: {
    email: string;
    password: string;
    twoFactorCode?: string;
  }) => {
    setErrorMessage("");
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: userData.email,
      password: userData.password,
      token: userData.twoFactorCode,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/");
    }
    if (result?.error) {
      setErrorMessage(result.error);
    }
  };
  const handleRegister = async (userData: {
    email: string;
    password: string;
  }) => {
    setErrorMessage("");
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    setLoading(false);
    if (response.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
      });
      if (result?.ok) {
        router.push("/");
      } else {
        if (result?.error) {
          setErrorMessage(result?.error);
        }
        console.log(result?.error);
      }
    } else {
      // Handle error
      const data = await response.json();
      setErrorMessage(data.error);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setErrorMessage("");
    setForgotPasswordSuccess(false);
    setLoading(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (response.ok) {
      setForgotPasswordSuccess(true);
    } else {
      const data = await response.json();
      setErrorMessage(data.error);
    }
  };

  const handleResetPassword = async (password: string) => {
    setErrorMessage("");
    setLoading(true);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, tokenId }),
    });
    setLoading(false);
    if (response.ok) {
      router.push("/signin");
    } else {
      const data = await response.json();
      setErrorMessage(data.error);
    }
  };
  React.useEffect(() => {
    if (pathname.includes("/reset-password") && !tokenId?.length) {
      router.push("/signin");
    }
  }, [tokenId, router, pathname]);

  return (
    <>
      <AuthGuard authRequired={false} redirectTo="/">
        {pathname.includes("/signin") && (
          <LoginComponent
            loading={loading}
            errorMessage={errorMessage}
            onSubmit={handleLogin}
          />
        )}
        {pathname.includes("/signup") && (
          <RegisterComponent
            errorMessage={errorMessage}
            loading={loading}
            onSubmit={handleRegister}
          />
        )}
        {pathname.includes("/forgot-password") && (
          <ForgotPassword
            loading={loading}
            forgotPasswordSuccess={forgotPasswordSuccess}
            errorMessage={errorMessage}
            onSubmit={handleForgotPassword}
          />
        )}
        {pathname.includes("/reset-password") && (
          <ResetPassword
            loading={loading}
            errorMessage={errorMessage}
            handleResetPassword={handleResetPassword}
          />
        )}
      </AuthGuard>
    </>
  );
}
