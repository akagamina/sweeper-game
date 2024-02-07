"use client";
import Game from "@/components/Game";
import Sidebar from "@/components/SideBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <Game />
      <Sidebar />
    </main>
  );
}
