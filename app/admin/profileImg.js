"use client";

import React, { useEffect, useState } from "react";
import { storage } from "@/firebase/config";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { useGlobalContext } from "@/context/AuthContext";

const ProfileImg = async() => {
  const [imageList, setImageList] = useState([]);
  const { user } = useGlobalContext();

  useEffect(() => { 
    const imagesRef = ref(storage, `${user != [] ? user.email : ""}/`);
    listAll(imagesRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          console.log(imageList);
        });
      });
    });
  }, [user]);
  return (
    <div>
      {imageList.map((url, index) => {
        return (
          <img
            key={index}
            src={url}
            className="rounded-[50%] w-full h-auto img"
            alt="Picture of the user"
          />
        );
      })}
    </div>
  );
};

export default ProfileImg;
