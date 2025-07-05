import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { allLaunches } from "./services/spacexApi";

export default async function Home() {
  const launches = await allLaunches();
  console.log("launches:", launches); // Add this
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 overflow-hidden">
        <Table launches={launches.data}/>
      </main>
    </div>
  );
}
