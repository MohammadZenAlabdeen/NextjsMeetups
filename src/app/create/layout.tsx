import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
  description: "Add a new meetup",
};
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>{children}</>;
  }

