"use client";

import React from "react";
import Link from "next/link";
import signUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import { storage } from "@/firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const page = () => {
  const [email, setEmail] = React.useState("");
  const [imageUpload, setImageUpload] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const uploadImage = () => {
    if (uploadImage == null) return;
    const imageRef = ref(storage, `${email}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  };
  const handleForm = async (e) => {
    e.preventDefault();
    const { result, error } = await signUp(email, password);
    uploadImage();
    if (error) {
      return console.log(error);
    }
    // else successful
    console.log(result);
    return router.push("/admin");
  };

  return (
    <>
      <nav className="absolute top-4 left-3">
        <span>
          <Link href="/" className="link-btn">
            Home
          </Link>
          /Sign up
        </span>
      </nav>
      <div className="wrap">
        <h2 className="head">sign Up</h2>
        <form className="form-wrap" onSubmit={handleForm}>
          <label htmlFor="email">Your email address</label>
          <input
            type="email"
            required
            placeholder="enter your email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          
          <button type="submit" className="btn">
            sign up
          </button>
        </form>
        <p className="mt-5">
          Already have an account?{" "}
          <Link href="/signin" className="link-btn">
            sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default page;
