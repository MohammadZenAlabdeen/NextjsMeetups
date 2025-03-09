import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Details",
  description: "Meetup details",
};
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>{children}</>;
  }

