"use client"

import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function VeriEkle() {
  const [rewards, setRewards] = useState([]);

  // Örnek kimlik oluşturucu fonksiyon
  const generateId = () => {
    return Math.random().toString(36).substring(7);
  };

  useEffect(() => {
    // Veritabanından verileri al
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, user.uid);
        const docSnap = await userDocRef.get();
        if (docSnap.exists()) {
          setRewards(docSnap.data().rewards || []);
        }
      }
    };

    fetchData();
  }, []);

  const addReward = () => {
    const newReward = { id: generateId(), vote: '', art: '', kategories: [] };
    setRewards([...rewards, newReward]);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const updatedRewards = rewards.map(reward =>
      reward.id === id ? { ...reward, [name]: value } : reward
    );
    setRewards(updatedRewards);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, 'asciiArts', 'asciiDepo');

      try {
        await setDoc(userDocRef, { rewards }, { merge: true });
        alert('Veriler başarıyla gönderildi');
      } catch (error) {
        console.error('Verileri gönderme hatası:', error);
        alert('Verilerinizi gönderirken bir hata oluştu.');
      }
    }
  };

  const handleDelete = (id) => {
    const updatedRewards = rewards.filter(reward => reward.id !== id);
    setRewards(updatedRewards);
  };

  return (
    <div className="bg-gray-900">
      <main>
        <div className="container mx-auto mt-6">
          <div className="bg-gray-900 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold w-full text-white">Profil Düzenle</h2>
            {rewards.map((reward) => (
              <div key={reward.id} className="m-9">
                <label htmlFor={`vote-${reward.id}`} className="block font-semibold text-white">
                  Oy
                </label>
                <input
                  type="text"
                  id={`vote-${reward.id}`}
                  name="vote"
                  value={reward.vote}
                  onChange={(e) => handleChange(e, reward.id)}
                  className="w-full p-2 border rounded"
                />
                <label htmlFor={`art-${reward.id}`} className="block font-semibold text-white">
                  Sanat
                </label>
                <textarea
                  id={`art-${reward.id}`}
                  name="art"
                  value={reward.art}
                  onChange={(e) => handleChange(e, reward.id)}
                  className="w-full p-2 border rounded"
                />

                <label htmlFor={`kategories-${reward.id}`} className="block font-semibold text-white">
                  Kategoriler
                </label>
                <input
                  type="text"
                  id={`kategories-${reward.id}`}
                  name="kategories"
                  value={reward.kategories}
                  onChange={(e) => handleChange(e, reward.id)}
                  className="w-full p-2 border rounded"
                />
                <button onClick={() => handleDelete(reward.id)} className="text-red-500">Sil</button>
              </div>
            ))}
            <div>
              <button
                onClick={addReward}
                className="bg-blue-600 text-white font-semibold p-2 rounded hover:bg-blue-700 mt-4 mr-2"
              >
                + Ekle
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white font-semibold p-2 rounded hover:bg-green-700 mt-4"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VeriEkle;
