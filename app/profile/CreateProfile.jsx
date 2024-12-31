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

  // Profil fotoğrafı için handler
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfile({
          ...newProfile,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Arkaplan fotoğrafı için handler
  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfile({
          ...newProfile,
          backgroundImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">👋 Aramıza Hoşgeldin</h2>
              <p className="text-gray-400">Profilini oluşturarak başlayalım</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profil Adı */}
              <div>
                <label htmlFor="profileName" className="block text-sm font-medium text-gray-300 mb-2">
                  Profil Adınız
                </label>
                <input
                  type="text"
                  name="profileName"
                  id="profileName"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 transition duration-200"
                  value={newProfile.profileName}
                  onChange={handleChange}
                  placeholder="Profil Adınız"
                  required
                />
              </div>

              {/* Profil Fotoğrafı */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                  Profil Fotoğrafı
                </label>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                      id="profileImageInput"
                    />
                    <label
                      htmlFor="profileImageInput"
                      className="flex items-center justify-center w-32 h-32 rounded-full bg-gray-800/50 border-2 border-dashed border-gray-600 hover:border-indigo-500 cursor-pointer group-hover:bg-gray-700/50 transition duration-300"
                    >
                      {newProfile.profileImage ? (
                        <img
                          src={newProfile.profileImage}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <i className="fas fa-camera text-gray-400 text-xl mb-2"></i>
                          <p className="text-sm text-gray-400">Fotoğraf Seç</p>
                        </div>
                      )}
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleVarsayilan('profile')}
                    className="px-4 py-2 text-sm text-indigo-400 hover:text-indigo-300 transition duration-200"
                  >
                    Varsayılan
                  </button>
                </div>
              </div>

              {/* Arkaplan Fotoğrafı */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Arkaplan Fotoğrafı
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageChange}
                    className="hidden"
                    id="backgroundImageInput"
                  />
                  <label
                    htmlFor="backgroundImageInput"
                    className="flex items-center justify-center w-full h-40 rounded-lg bg-gray-800/50 border-2 border-dashed border-gray-600 hover:border-indigo-500 cursor-pointer group-hover:bg-gray-700/50 transition duration-300"
                  >
                    {newProfile.backgroundImage ? (
                      <img
                        src={newProfile.backgroundImage}
                        alt="Background"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <i className="fas fa-image text-gray-400 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-400">Arkaplan Fotoğrafı Seç</p>
                      </div>
                    )}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleVarsayilan('background')}
                    className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-900/70 text-gray-300 rounded-full hover:bg-gray-900 transition duration-200"
                  >
                    Varsayılan
                  </button>
                </div>
              </div>

              {/* Telefon */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefon Numarası <span className="text-gray-500">(İsteğe Bağlı)</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                  value={newProfile.phoneNumber}
                  onChange={handleChangePhoneNumber}
                  placeholder="555 555 55 55"
                  maxLength={14}
                />
              </div>

              {/* Doğum Tarihi */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Doğum Tarihi
                </label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                  value={newProfile.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Checkbox'lar */}
              <div className="space-y-4">
                <label className="flex items-center space-x-3 text-gray-300 hover:text-white transition duration-200">
                  <input
                    type="checkbox"
                    id="kvkkCheckbox"
                    checked={newProfile.kvkk}
                    onChange={handleKvkkChange}
                    className="w-4 h-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
                    required
                  />
                  <span className="text-sm">KVKK'yı Kabul Ediyorum</span>
                </label>

                <label className="flex items-center space-x-3 text-gray-300 hover:text-white transition duration-200">
                  <input
                    type="checkbox"
                    id="postaTalimatiCheckbox"
                    checked={newProfile.postaIletisim}
                    onChange={handlePostaTalimatiChange}
                    className="w-4 h-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
                    required
                  />
                  <span className="text-sm">Posta Talimatı ve Arama Almayı Kabul Ediyorum</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300 transform hover:scale-[1.02]"
              >
                Profili Oluştur
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
