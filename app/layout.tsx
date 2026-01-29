/** @format */
import { Roboto } from "next/font/google";
import "./globals.css";
export const metadata = {
  title: "Amir Matin Jamshidi",
  description: "Full-Stack Developer • Tehran, Iran",
  manifest: "/manifest.json",
};
const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={roboto.variable}
    >
      <head>
        <link
          rel="preload"
          href="https://portfolio-psi-seven-3r7sq2kz7p.vercel.app/"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          href="/batman-icon.svg"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
