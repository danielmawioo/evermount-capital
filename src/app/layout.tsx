import "./styles/globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
