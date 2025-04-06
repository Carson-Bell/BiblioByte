import './globals.css';
import Navbar from "../components/Navbar.js";

export const metadata = {
  title: 'BiblioByte',
  description: 'A book search and review platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Header Component */}
        <Navbar />

        {/* Main Content */}
        <div>{children}</div>
      </body>
    </html>
  );
}
