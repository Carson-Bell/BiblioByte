
import './globals.css';
import Image from 'next/image';
import NavbarUnauth from "../components/NavbarUnauth.js";
export const metadata = {
  title: 'BiblioByte',
  description: 'A book search and review platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Header Component */}
        <NavbarUnauth />

        {/* Main Content */}
        <div>{children}</div>
      </body>
    </html>
  );
}