"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Repos = async () => {
  const [reps, setReps] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/H-erbie/repos")
      .then((res) => res.json())
      .then((data) => setReps(data));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-3">
        {reps.map((item) => {
          const { id, name } = item;
          return (
            <Link
              key={id}
              href={`/admin/${name}`}
              className="link-btn text-white bg-gray-400 p-5"
            >
              <div key={id} className="w-[5rem] h-[5rem]">
                <p>{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Repos;
