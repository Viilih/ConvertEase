"use client";
import Dropzone from "@/components/Dropzone";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-28 px-28 bg-slate-950 gap-20">
      <div className="flex flex-col gap-3 text-justify">
        <h1 className="text-bold text-3xl text-white tracking-wider text-center">
          File Converter
        </h1>

        <p className="text-slate-200 text-center">
          Welcome to ConvertEase, your free file converter. Here, you can
          effortlessly transform your files to various formats.
        </p>
        <p className="text-slate-200">
          Currently, we support conversions of images, videos, and audios. Stay
          tuned as we explore adding support for PDFs and DOCX files!
        </p>
      </div>
      <Dropzone />
      <Toaster />
    </main>
  );
}
