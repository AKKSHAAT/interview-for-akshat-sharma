"use client";

import React, { useEffect, useState } from "react";
import { getLaunchByID } from "../services/spacexApi";
import { enrichLaunchData } from "../utils/launchUtils";

const data = Array.from({ length: 12 }, (_, i) => ({
  no: String(i + 1).padStart(2, "0"),
  launched: [
    "24 March 2006 at 22:30",
    "28 September 2008 23:15",
    "04 June 2010 18:45",
    "06 December 2020 16:17",
  ][i % 4],
  location: ["Kwajalein Atoll", "CCAFS SLC 40", "KSC LC 39A"][i % 3],
  mission: ["FalconSat", "RatSat", "Falcon 9 Test Flight", "CRS-21"][i % 4],
  orbit: ["LEO", "ISS"][i % 2],
  status: ["Failed", "Success", "Upcoming"][i % 3],
  rocket: "Falcon 9",
}));

const statusStyle: Record<string, string> = {
  Failed: "bg-red-100 text-red-500",
  Success: "bg-green-100 text-green-500",
  Upcoming: "bg-yellow-100 text-yellow-600",
};

interface TableProps {
  launches: any[];
}

const Table = ({ launches }: TableProps) => {
  const [enrichedData, setEnrichedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = launches.slice(startIndex, startIndex + itemsPerPage);
  console.log("current: ", currentItems);

  useEffect(() => {
    const getData = async () => {
      const data = await enrichLaunchData(currentItems);
      console.log("data", data); 
      setEnrichedData(data);
    };
    getData();
  }, []);
  
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full text-sm text-left rounded-xl overflow-hidden shadow-sm">
        <thead className="bg-gray-100 text-gray-700 font-medium">
          <tr>
            <th className="px-6 py-4">No:</th>
            <th className="px-6 py-4">Launched (UTC)</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4">Mission</th>
            <th className="px-6 py-4">Orbit</th>
            <th className="px-6 py-4">Launch Status</th>
            <th className="px-6 py-4">Rocket</th>
          </tr>
        </thead>
        <tbody className="">
          {enrichedData.map((launch, idx) => {
            return (
              <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{launch.no}</td>
                  <td className="px-6 py-4">{new Date(launch.launchedUtc).toUTCString()}</td>
                  <td className="px-6 py-4">{launch.location}</td>
                  <td className="px-6 py-4">{launch.mission}</td>
                  <td className="px-6 py-4">{launch.orbit}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle[launch.status]}`}
                    >
                      {launch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{launch.rocket}</td>
              </tr>
              )
            })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-1 mt-4 text-sm">
        <button className="px-3 py-1 border rounded-md">&lt;</button>
        <button className="px-3 py-1 border rounded-md bg-gray-200 font-semibold">
          1
        </button>
        <button className="px-3 py-1 border rounded-md">2</button>
        <span className="px-2">...</span>
        <button className="px-3 py-1 border rounded-md">10</button>
        <button className="px-3 py-1 border rounded-md">&gt;</button>
      </div>
    </div>
  );
};

export default Table;
