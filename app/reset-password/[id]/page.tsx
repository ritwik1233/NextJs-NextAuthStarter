import AuthPage from "@/app/ui/Auth/AuthPage";
import React from "react";
import AuthGuard from "../../ui/Auth/AuthGuard";

interface PageProps {
  params: {
    id: string;
  };
}
const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <AuthGuard authRequired={false} redirectTo="/">
        <AuthPage tokenId={params.id} />
      </AuthGuard>
    </>
  );
};
export default Page;
