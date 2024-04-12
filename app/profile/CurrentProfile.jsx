import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';

function UserProfile() {
  const [profileData, setProfileData] = useState({
    backgroundImage: '',
    profileName: '',
    phoneNumber: '',
    birthDate: '',
    profileImage: '',
  });

  useEffect(() => {
    // Firestore'dan verileri çekme işlemi
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, 'ProfileUserInfo', user.uid);

      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfileData(userData);
          } else {
            // Belirli bir kullanıcının verisi yoksa burada bir işlem yapabilirsiniz
          }
        })
        .catch((error) => {
          console.error('Veri çekme hatası:', error);
        });
    }
  }, []);

  const { backgroundImage, profileName, phoneNumber, birthDate, profileImage } = profileData;

  return (
    <div className="bg-blue-100">
      <main>
        <div className="bg-blue-600 h-64 relative flex items-center justify-center">
          <img
            src={backgroundImage}
            className="w-full h-full object-cover"
            alt="Background Image"
          />

          <div className="mt-12 absolute top-2/3 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gray-400">
            <Link href="/updateProfile" className="mt-12 absolute bottom-2/3 right-2/3 transform -translate-x-1/2 w-6 h-6 rounded-full bg-red-400 cursor-pointer" id="editIcon">
              <FaEdit className="m-1" size={16} color="white" />
            </Link>
            <img src={profileImage} className="w-full h-full rounded-full object-cover" alt="Profile Image" />
          </div>
        </div>

        <div className="pt-3 container mx-auto text-center mt-6">
          <h3 className="mt-11 text-2xl font-semibold">{profileName}</h3>
          <p className="text-gray-500">{auth.currentUser ? auth.currentUser.email : ''}</p>
        </div>

        <div className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8">
  <div className="bg-white rounded-lg shadow-md p-4">
    <h2 className="text-xl font-semibold">Profil Bilgileri</h2>
    <div className="bg-blue-200 rounded-md p-4 mt-4">
      <i className="fa fa-pen fa-xs text-gray-600"></i>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold">İsim</td>
              <td>:</td>
              <td>{profileName}</td>
            </tr>
            <tr>
              <td className="font-semibold">Email</td>
              <td>:</td>
              <td>{auth.currentUser ? auth.currentUser.email : ''}</td>
            </tr>
            <tr>
              <td className="font-semibold">Telefon Numarası</td>
              <td>:</td>
              <td>{phoneNumber}</td>
            </tr>
            <tr>
              <td className="font-semibold">Doğum Tarihi</td>
              <td>:</td>
              <td>{birthDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

      </main>
    </div>
  );
}

export default UserProfile;
