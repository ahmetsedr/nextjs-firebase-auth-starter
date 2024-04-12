import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function CreateProfile() {
  const [newProfile, setNewProfile] = useState({
    backgroundImage: '',
    profileName: '',
    phoneNumber: '',
    birthDate: '',
    profileImage: '',
    kvkk: false,
    postaIletisim: false,
  });
  
  const handleKvkkChange = (e) => {
    setNewProfile({
      ...newProfile,
      kvkk: e.target.checked,
    });
  };
  
  const handlePostaTalimatiChange = (e) => {
    setNewProfile({
      ...newProfile,
      postaIletisim: e.target.checked,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user && newProfile.kvkk && newProfile.postaIletisim) {
      const userProfileDocRef = doc(db, 'ProfileUserInfo', user.uid);

      try {
        // Update the user's profile data in Firestore
        await setDoc(userProfileDocRef, newProfile, { merge: true });

        window.location.href = "/";
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile.');
      }
    } else {
      alert('KVKK ve Posta İletişimini kabul etmelisiniz.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };

  const handleVarsayilan = (type) => {
    const varsayilanProfile = 'https://i.stack.imgur.com/l60Hf.png';
    const varsayilanBackground = 'https://www.nextofwindows.com/wp-content/uploads/2016/06/img13.jpg';

    if (type === 'profile') {
      setNewProfile({
        ...newProfile,
        profileImage: varsayilanProfile,
      });
    } else if (type === 'background') {
      setNewProfile({
        ...newProfile,
        backgroundImage: varsayilanBackground,
      });
    }
  };

  const handleChangePhoneNumber = (e) => {
    const { value } = e.target;

    // Girilen değer 10 karakterden azsa veya 11 ve sonrasında +90 yoksa, telefon numarasını güncelleme
    if (value.length < 10 || (value.length >= 11 && !value.includes('+90'))) {
      setNewProfile({
        ...newProfile,
        phoneNumber: value,
      });
    }
    // Girilen değer 10 karakter veya daha fazlaysa ve +90 ile başlamıyorsa, +90 ile başlayarak telefon numarasını güncelleme
    else if (value.length >= 10 && !value.includes('+90')) {
      setNewProfile({
        ...newProfile,
        phoneNumber: '+90 ' + value,
      });
    }
    // Diğer durumlarda sadece telefon numarasını güncelleme
    else {
      setNewProfile({
        ...newProfile,
        phoneNumber: value,
      });
    }
  };

  return (
    <div className="mt-12 min-h-screen flex justify-center items-center">
  <main className="container mx-auto mt-6 px-4 sm:px-0 max-w-lg">
    <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">👋 Aramıza Hoşgeldin</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="profileName" className="block font-semibold">
            Profil Adınız
          </label>
          <input
            type="text"
            name="profileName"
            id="profileName"
            className="w-full p-3 md:p-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={newProfile.profileName}
            onChange={handleChange}
            placeholder="Profile Adınız"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block font-semibold">
            Profil Fotoğrafınız
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="profileImage"
              id="profileImage"
              className="flex-1 p-3 md:p-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
              value={newProfile.profileImage}
              onChange={handleChange}
              placeholder="Profile Fotoğrafı"
              required
            />
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => handleVarsayilan('profile')}
            >
              Varsayılan
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="backgroundImage" className="block font-semibold">
            Profil Arkaplan Fotoğrafınız
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="backgroundImage"
              id="backgroundImage"
              className="flex-1 p-3 md:p-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
              value={newProfile.backgroundImage}
              onChange={handleChange}
              placeholder="Arkaplan Fotoğrafı"
              required
            />
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={() => handleVarsayilan('background')}
            >
              Varsayılan
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold">
            Telefon (Örnek: 535 555 55 55) - İsteğe Bağlı
          </label>
          <input
            type="phone"
            name="phoneNumber"
            id="phoneNumber"
            className="w-full p-3 md:p-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={newProfile.phoneNumber}
            onChange={handleChangePhoneNumber}
            placeholder="555 555 55 55 - İsteğe Bağlı"
            maxLength={14} // Maksimum uzunluk 14 karakter olmalı (+90 ile birlikte)
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthDate" className="block font-semibold">
            Doğum Günü (Örnek: 02.06.2004)
          </label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            pattern="[0-9]{2}.[0-9]{2}.[0-9]{4}"
            className="w-full p-3 md:p-4 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={newProfile.birthDate}
            onChange={handleChange}
            placeholder="02.06.2004"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="kvkkCheckbox"
            name="kvkkCheckbox"
            className="mr-2"
            checked={newProfile.kvkk}
            onChange={handleKvkkChange}
            required
          />
          <label htmlFor="kvkkCheckbox" className="font-semibold">
            KVKK'ya Kabul Ediyorum
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="postaTalimatiCheckbox"
            name="postaTalimatiCheckbox"
            className="mr-2"
            checked={newProfile.postaIletisim}
            onChange={handlePostaTalimatiChange}
            required
          />
          <label htmlFor="postaTalimatiCheckbox" className="font-semibold">
            Posta Talimatı ve Arama Almayı Kabul Ediyorum
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
        >
          Kaydet
        </button>
      </form>
    </div>
  </main>
</div>


  );
}

export default CreateProfile;
