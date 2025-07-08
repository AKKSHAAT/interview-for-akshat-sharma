"use client";

import React, { useEffect, useState } from "react";
import { enrichLaunchData } from "../utils/launchUtils";

const statusStyle: Record<string, string> = {
  Failed: "bg-red-100 text-red-500",
  Success: "bg-green-100 text-green-500",
  Upcoming: "bg-yellow-100 text-yellow-600",
};

interface TableProps {
  launches: any[];
}

const Table = ({ launches }: TableProps) => {
  const itemsPerPage = 12;
  const [enrichedData, setEnrichedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    if (!launches || launches.length === 0) return;

    const pageLaunches = launches.slice(startIndex, startIndex + itemsPerPage);
    const getData = async () => {
      const data = await enrichLaunchData(pageLaunches);
      setEnrichedData(data);
    };

    getData();
  }, [currentPage, launches]);

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
        <tbody>
          {enrichedData.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No results found for the specified filter
              </td>
            </tr>
          ) : (
            enrichedData.map((launch, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4">{launch.no}</td>
                <td className="px-6 py-4">
                  {new Date(launch.launchedUtc).toUTCString()}
                </td>
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
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-1 mt-4 text-sm">
        <button
          className="px-3 py-1 border rounded-md"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          &lt;
        </button>
        {[1, 2, "...", 10].map((item, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${
              item === currentPage ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() =>
              typeof item === "number" && setCurrentPage(item)
            }
            disabled={item === "..."}
          >
            {item}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded-md"
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, Math.ceil(launches.length / itemsPerPage)))
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
