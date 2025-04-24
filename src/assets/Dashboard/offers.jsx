import React from 'react';
import { MdLocalOffer } from 'react-icons/md';

export default function Offers() {
  const offerList = [
    {
      title: 'Summer Sale',
      description: 'Get up to 50% off on selected items.',
      code: 'SUMMER50',
      validTill: 'June 30, 2025',
    },
    {
      title: 'Buy 1 Get 1 Free',
      description: 'Applicable on selected fashion items.',
      code: 'BOGOF2025',
      validTill: 'May 15, 2025',
    },
    {
      title: 'Free Shipping',
      description: 'On all orders above $100.',
      code: 'FREESHIP',
      validTill: 'April 30, 2025',
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <MdLocalOffer className="text-3xl text-pink-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Available Offers</h1>
          <p className="text-sm text-gray-500">Grab the best deals and discounts today!</p>
        </div>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offerList.map((offer, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-lg font-semibold text-pink-600 mb-2">{offer.title}</h2>
            <p className="text-gray-600 mb-2">{offer.description}</p>
            <div className="text-sm text-gray-500 mb-2">Valid Till: {offer.validTill}</div>
            <div className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs inline-block font-semibold">
              Code: {offer.code}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
