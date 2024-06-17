import { Inter } from "next/font/google";
import "./globals.css";
import { FilesStoreProvider } from "@/providers/file-store-provider";
import Link from "next/link";

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
          <header className="w-full items-center p-4 bg-slate-950 text-white">
            <nav className="flex justify-center gap-20">
              <Link href="/">
                <span className="relative text-xl hover:transition-all hover:duration-300 hover:ease-in group">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-50 transition-all duration-300 ease-in group-hover:w-full"></span>
                </span>
              </Link>
              <Link href="/about">
                <span className="relative text-xl hover:transition-all hover:duration-300 hover:ease-in group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-50 transition-all duration-300 ease-in group-hover:w-full"></span>
                </span>
              </Link>
            </nav>
          </header>
          <main className="flex min-h-screen flex-col items-center pt-28 px-28 bg-slate-950 gap-10">
            {children}
          </main>
        </FilesStoreProvider>
      </body>
    </html>
  );
}
