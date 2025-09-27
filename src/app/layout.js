import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/common/ScrollProgress";

export const metadata = {
  title: "Zaigam Enterprises | Construction Company",
  description:
    "Leading construction company specializing in steel work, waterproofing, road construction, and sewerage systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
