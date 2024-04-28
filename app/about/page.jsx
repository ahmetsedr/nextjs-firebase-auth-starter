import React from 'react';

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <textarea
        className="w-1/2 h-1/2 p-4 border border-gray-300 rounded-lg text-lg"
        value={`
BETA SÜRÜMÜNDEKİ UYGULAMAMIZA HOŞ GELDİNİZ

Nokta Sanatının Büyülü Dünyasına Hoş Geldiniz

Nokta sanatı, bilgisayar karakterlerinin kullanılarak oluşturulan eşsiz ve etkileyici sanat eserlerinin dünyasına bir kapı açar. Her bir karakterin dikkatlice yerleştirilmesiyle oluşturulan bu sanat eserleri, hem karmaşıklığı hem de basitliğiyle büyüler.

Keşfetmeye Hazır Mısınız?

Nokta sanatının çeşitliliği sizi şaşırtacak. Basit yüz ifadelerinden, karmaşık manzaralara kadar her türlü eser bulunabilir. Sanatçılar, sınırlı karakter setleriyle muhteşem eserler yaratmanın yaratıcı yollarını keşfetmişlerdir. Siz de bu benzersiz dünyayı keşfedin ve her bir eserin ardındaki hikayeyi hissedin.

Yaratıcılığınızı Serbest Bırakın

Nokta sanatı, herkesin deneyebileceği bir sanat formudur. Bilgisayar klavyesi veya özel yazılımlar kullanılarak kendi eserlerinizi oluşturabilirsiniz. Sadece hayal gücünüzle sınırlı olan bu sanat formunda, düşüncelerinizi ve duygularınızı karakterler aracılığıyla ifade edebilirsiniz. Ardından, eserlerinizi paylaşarak diğer sanatseverlerle etkileşime geçebilir ve ilham alabilirsiniz.
        `}
      ></textarea>
    </div>
  );
};

export default Page;
