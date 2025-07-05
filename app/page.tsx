import Image from "next/image";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 overflow-hidden">
        <Table />
      </main>
    </div>
  );
}
