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
    <div>
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
          <h3 className="mt-11 text-2xl font-semibold text-white">{profileName}</h3>
          <p className="text-gray-500">{auth.currentUser ? auth.currentUser.email : ''}</p>
        </div>

        <div className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8">
  <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 mt-4 mb-8">
    {/* Profile Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">Profil Bilgileri</h2> 
    </div>

    {/* Profile Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Info Cards */}
      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-2">
          <i className="fas fa-user text-purple-400"></i>
          <span className="text-gray-400 text-sm">İsim</span>
        </div>
        <p className="text-white font-medium pl-8">{profileName}</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-2">
          <i className="fas fa-envelope text-blue-400"></i>
          <span className="text-gray-400 text-sm">Email</span>
        </div>
        <p className="text-white font-medium pl-8">
          {auth.currentUser ? auth.currentUser.email : ''}
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-2">
          <i className="fas fa-phone text-green-400"></i>
          <span className="text-gray-400 text-sm">Telefon Numarası</span>
        </div>
        <p className="text-white font-medium pl-8">{phoneNumber || 'Belirtilmedi'}</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
        <div className="flex items-center space-x-3 mb-2">
          <i className="fas fa-calendar text-pink-400"></i>
          <span className="text-gray-400 text-sm">Doğum Tarihi</span>
        </div>
        <p className="text-white font-medium pl-8">{birthDate || 'Belirtilmedi'}</p>
      </div>
    </div>

    {/* Additional Info Section */}
    <div className="mt-6 bg-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white/90">Hesap Durumu</h3>
        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
          Aktif
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-gray-400">Son Giriş</div>
        <div className="text-white">
          {auth.currentUser?.metadata.lastSignInTime || 'Bilgi yok'}
        </div>
        <div className="text-gray-400">Hesap Oluşturma</div>
        <div className="text-white">
          {auth.currentUser?.metadata.creationTime || 'Bilgi yok'}
        </div>
      </div>
    </div>
  </div>
</div>

      </main>
    </div>
  );
}

export default UserProfile;
