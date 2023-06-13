"use client";

import React, { Suspense, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import firebase_app from "@/firebase/config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import ProfileImg from "./profileImg";
import Repos from "./repos";
import LoadImg from "./loadImg";
import LoadUser from "./loadUser";
import User from "./User";
import LoadRepo from "./loadRepo";

const auth = getAuth(firebase_app);
const page = () => {
  const db = getFirestore(firebase_app);
  const [text, setText] = useState({ id: "user", msg: "" });
  const [returnText, setReturnText] = useState("");
  const { user } = useGlobalContext();
  const router = useRouter();
  
  useEffect(() => {
    if (user == []) {
      router.push("/")
      }
  }, [user]);

  const sendToDb = async () => {
    await setDoc(doc(db, "message", "content"), text);
    setText({...text, msg:''})
  };
  const returnFromDb = async () => {
    const docRef = doc(db, "message", "content");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setReturnText(docSnap.data().msg);
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  return (
      <div className="wrap flex flex-col gap-3 admin">
        <h1>
          Welcome Home, <Suspense fallback={<LoadUser/>}><User/></Suspense>
        </h1>
        <div className="w-[200px] h-[200px] overflow-hidden rounded-[50%] flex items-center justify-center flex-col">
        <Suspense fallback={<LoadImg/>}>
          <ProfileImg/>
        </Suspense>
        </div>
        <div className="p-3 flex flex-col gap-3 mx-auto">
          <textarea
            className="text-black"
            placeholder="slap your thoughts in here"
            value={text.msg}
            onChange={(e) => setText({ ...text, msg: e.target.value })}
          ></textarea>
          <button className="link-btn" onClick={sendToDb}>
            send message to database
          </button>
          <button className="link-btn" onClick={returnFromDb}>
            return message to database
          </button>
          <p className="border p-2">
            {returnText == ""
              ? "Database is empty at the moment, enter anything in the field above"
              : returnText}
          </p>
        </div>
        <h3 className="sub-head">My repos</h3>
        <Suspense fallback={<LoadRepo/>}>
        <Repos/>
        </Suspense>
        <button className="btn" onClick={() => auth.signOut()}>
          sign out
        </button>
      </div>
  );
};

export default page;
