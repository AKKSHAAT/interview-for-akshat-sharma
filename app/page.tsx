'use client' 
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { allLaunches, queryLaunches } from "./services/spacexApi";

export default function Home() {
  const [launches, setLaunches] = useState([]);
  const [filter, setFilter] = useState('');



  useEffect(()=> {
    async function getData() {
      if (!filter || filter === '' || filter === 'All Launches') {
        const res = await allLaunches();
        setLaunches(res.data);
      }  else {
        const q = { 
          query: filter.toLowerCase() === "success"
            ? { success: true, upcoming: false }
            : filter.toLowerCase() === "failed"
            ? { success: false, upcoming: false }
            : { upcoming: true },
          options : { sort: { date_utc: "asc" } }
        };
        const res = await queryLaunches(q);
        console.log(res.data.docs);
        setLaunches(res.data.docs)
      }
    } 
    getData();
  }, [filter]);

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 overflow-hidden">
        <div className="flex min-w-[65vw] justify-between pt-2"> 
          <div></div>
          <Filter selected={filter} onChange={setFilter}/>
        </div>
        <Table launches={launches}/>
      </main>
    </div>
  );
}
