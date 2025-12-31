/** @format */

import "./globals.css";

export const metadata = {
  title: "Amir Matin Jamshidi",
  description: "Full-Stack Developer • Tehran, Iran",
};

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
    >
      <head>
        <link
          rel="preload"
          href="https://portfolio-psi-seven-3r7sq2kz7p.vercel.app/"
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
