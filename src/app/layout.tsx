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
        <FilesStoreProvider>
          <main className="flex min-h-screen flex-col items-center pt-28 px-28 bg-slate-950 gap-10">
            {children}
          </main>
        </FilesStoreProvider>
      </body>
    </html>
  );
}
