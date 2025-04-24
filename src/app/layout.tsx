// src/app/layout.tsx
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeSections from "./components/HomeSections";

export const metadata = {
  title: "Evermount Capital",
  description: "High-performance hedge fund platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        {children}
        <HomeSections />
        <Footer />
      </body>
    </html>
  );
}
