// components/Filter.tsx
"use client";

import { useState } from "react";

const Filter = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const options = ["All Launches", "Success", "Failed", "Upcoming"]

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 8h18v12a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
        </svg>
        {selected}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                selected === option ? "font-semibold" : ""
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
