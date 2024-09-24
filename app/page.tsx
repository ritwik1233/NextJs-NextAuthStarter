import React from "react";
import AuthGuard from "./ui/Auth/AuthGuard";
import ProfileContainer from "./ui/Profile/ProfileContainer";

export default function Page() {
  return (
    <>
      <AuthGuard authRequired={true} redirectTo="/signin">
        <ProfileContainer />
      </AuthGuard>
    </>
  );
}
