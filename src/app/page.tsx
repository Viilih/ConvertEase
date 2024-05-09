"use client";
import Dropzone from "@/components/Dropzone";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-28 px-28 bg-slate-950 gap-20">
      <h1 className="text-bold text-3xl text-white tracking-wider">
        File Converter
      </h1>
      <Dropzone />
      <Toaster />
    </main>
  );
}
