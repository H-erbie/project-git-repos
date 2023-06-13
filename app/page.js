'use client'
import React, { Suspense } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/AuthContext";

const HomePage = () => {

  return (
      <div className="wrap">
        <h1 className="head">HerbieCodes</h1>
        <h2 className="sub-head">
          Hello there! kindly{" "}
          <Link className="link-btn" href="/signin">
            {" "}
            Sign In
          </Link>{" "}
          or{" "}
          <Link className="link-btn" href="signup">
            {" "}
            Sign Up
          </Link>{" "}
          to continue
        </h2>
      </div>
  );
};

export default HomePage;
