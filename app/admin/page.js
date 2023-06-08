"use client";

import React, { Suspense, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useGlobalContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import firebase_app, { storage } from "@/firebase/config";
import Loading from "../loading";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import Link from "next/link";

const auth = getAuth(firebase_app);
const page = () => {
  const [reps, setReps] = useState([]);
  const db = getFirestore(firebase_app);
  const [imageList, setImageList] = useState([]);
  const [text, setText] = useState({ id: "user", msg: "" });
  const [returnText, setReturnText] = useState("");
  const { user } = useGlobalContext();
  const router = useRouter();
  useEffect(()=>{
    console.log(imageList)
  },[imageList])
  useEffect(() => {
    if (user == []) {
      router.push("/")
      console.log('user null!')
      }
  }, [user]);
  const imagesRef = ref(storage, `${user != [] ? user.email : ''}/`);
  const fetchImg = async() => {
      await listAll(imagesRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          console.log(imageList)
        });
      });
    })
  }
  useEffect(() => {
   fetchImg()
  }, []);

  const fetchRepos = async () => {
    const response = await fetch("https://api.github.com/users/H-erbie/repos");
    const repos = await response.json();
    setReps(repos);
  };
  useEffect(() => {
    fetchRepos();
  }, [reps]);

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
    <Suspense fallback={<Loading />}>
      <div className="wrap flex flex-col gap-3 admin">
        <h1>
          Welcome Home, <span className="font-semibold">{user != [] ? user.email : ''}</span>
        </h1>
        <Suspense fallback={<Loading />}>
        <div className="w-[200px] h-[200px] overflow-hidden rounded-[50%] flex items-center justify-center flex-col">
        {imageList.map((url) => {
            return (
              <img
                src={url}
                className="rounded-[50%] w-full h-auto img"
                alt="Picture of the user"
              />
            );
          })}
        </div>
        </Suspense>
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
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-3">
          <Suspense fallback={<Loading />}>
            {reps.map((item) => {
              const { id, name } = item;
              return (
                <Link
                  href={`/admin/${name}`}
                  className="link-btn text-white bg-gray-400 p-5"
                >
                  <div key={id}>
                    <p>{name}</p>
                  </div>
                </Link>
              );
            })}
          </Suspense>
        </div>
        <button className="btn" onClick={() => auth.signOut()}>
          sign out
        </button>
      </div>
    </Suspense>
  );
};

export default page;
