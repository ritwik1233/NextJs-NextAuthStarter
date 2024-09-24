import AuthPage from "@/app/ui/Auth/AuthPage";
import React from "react";
import AuthGuard from "../ui/Auth/AuthGuard";

export default function Page() {
  return (
    <AuthGuard authRequired={false} redirectTo="/">
      <AuthPage />
    </AuthGuard>
  );
}
