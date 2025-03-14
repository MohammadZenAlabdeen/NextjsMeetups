import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { StyledTheme } from "@/components/StyledTheme";
import { Container } from "@mui/material";
import MuiNavBar from "@/components/MuiNavBar";
export const metadata: Metadata = {
  title: "Meetups",
  description: "Home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <StyledTheme>
            <MuiNavBar/>
            <Container sx={{display:'flex',flexDirection:'column',alignItems:'center',py:5,}}>{children}</Container>
          </StyledTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
