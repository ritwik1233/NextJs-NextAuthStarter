import type { Metadata } from "next";
import CustomeSessionProvider from "./ui/CustomComponent/CustomSessionProvider";


export const metadata: Metadata = {
  title: "",
  description: "avant guarde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{
        padding: 0,
        margin: 0,
      }}>
          <CustomeSessionProvider>{children}</CustomeSessionProvider>
      </body>
    </html>
  );
}
