"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import CurrentProfile from './CurrentProfile';
import CreateProfile from "./CreateProfile";

const Page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userProfileDocRef = doc(db, 'ProfileUserInfo', user.uid);
        const userProfileDoc = await getDoc(userProfileDocRef);
        if (userProfileDoc.exists() && userProfileDoc.data().profileName) {
          setProfileName(userProfileDoc.data().profileName);
        } else {
          setProfileName(null);
        }
      } else {
        setProfileName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Unsubscribe on component unmount
  }, []);

  return (
    <div className="p-4">
        {loading ? (
            <Spinner />
        ) : user ? (
            <div className="sm:p-8">
                {profileName ? (
                    <CurrentProfile />
                ) : (
                    <div className="text-center mt-6 sm:mt-10">
                        <CreateProfile />
                    </div>
                )}
            </div>
        ) : (
            <p>You must be logged in to view this page - protected route.</p>
        )}
    </div>
  );
};

export default Page;
