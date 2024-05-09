import { Inter } from "next/font/google";
import "./globals.css";
import { FilesStoreProvider } from "@/providers/file-store-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <FilesStoreProvider>{children}</FilesStoreProvider>
      </body>
    </html>
  );
}
