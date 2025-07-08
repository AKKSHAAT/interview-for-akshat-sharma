'use client' 
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import { allLaunches, queryLaunches } from "./services/spacexApi";
import {DateFilter} from "./components/DatePicker";

export default function Home() {
  const [launches, setLaunches] = useState([]);
  const [filter, setFilter] = useState('All Launches');
  const [date, setDate] = useState({from: '', to: ''});



  useEffect(() => {
    async function getData() {
      const baseQuery = {
        ...(filter.toLowerCase() === "success"
          ? { success: true, upcoming: false }
          : filter.toLowerCase() === "failed"
          ? { success: false, upcoming: false }
          : filter.toLowerCase() === "upcoming"
          ? { upcoming: true }
          : {}), // no status condition if "All Launches"

        ...(date.from && date.to && {
          date_utc: {
            $gte: new Date(date.from).toISOString(),
            $lte: new Date(date.to).toISOString(),
          },
        }),
      };

      const q = {
        query: baseQuery,
        options: { sort: { date_utc: "desc" } },
      };

      const shouldUseQuery = Object.keys(baseQuery).length > 0;

      if (shouldUseQuery) {
        console.log("Sending query:", JSON.stringify(q, null, 2));
        const res = await queryLaunches(q);
        console.log("Using queryLaunches", q);
        console.log("docs:", res.data.docs);
        setLaunches(res.data.docs);
      } else {
        console.log("Sending query:", JSON.stringify(q, null, 2));
        const res = await queryLaunches({
          query: {},
          options: { sort: { date_utc: "desc" } },
        });
        console.log("Using allLaunches");
        console.table(res.data.docs.map(d => ({
          no: d.flight_number,
          date: d.date_utc,
          name: d.name
        })));
        setLaunches(res.data.docs);
      }
    }

    getData();
  }, [filter, date]);


  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 overflow-hidden">
        <div className="flex min-w-[65vw] justify-between pt-2"> 
          <DateFilter onChange={setDate} />
          <Filter selected={filter} onChange={setFilter}/>
        </div>
        <Table launches={launches}/>
      </main>
    </div>
  );
}
