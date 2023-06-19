import React from "react";

export default function Rows() {
  const getRows = () => {
    const rows = [];
    for (let i = 0; i < 11; i++) {
      rows.push(
        <div
          key={i}
          className="absolute w-full h-1 bg-purple-400 relative"
        >
          <p className=" text-purple-500">{i * 10}%</p>
        </div>
      );
    }
    return rows;
  };

  return <div className="absolute z-50 h-full w-full top-0 flex flex-col justify-between">{getRows()}</div>;
}
