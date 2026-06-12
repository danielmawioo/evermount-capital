"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent"; // ✅ Optional: include if you're using it
import ChatWidget from "./ChatWidget";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify",
];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthRoute = authRoutes.includes(pathname);
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isBookDemoPage = pathname === "/book-demo";

  const hideNavbar = isAuthRoute || isDashboardRoute;
  const hideFooter = isAuthRoute || isDashboardRoute || isBookDemoPage;
  const hideChat = isAuthRoute;

  return (
    <ThemeProvider>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
      {!hideFooter && <CookieConsent />}{" "}
      {/* ✅ Optional: display cookie banner */}
      {!hideChat && <ChatWidget />}
    </ThemeProvider>
  );
}
