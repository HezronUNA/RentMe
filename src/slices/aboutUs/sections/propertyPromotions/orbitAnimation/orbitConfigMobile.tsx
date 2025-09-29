import { Facebook, Instagram } from 'lucide-react';
import { FaAirbnb, FaTiktok } from "react-icons/fa";
import type { OrbitItemConfig } from './OrbitAnimation';

// URLs de tus redes/plataformas
const urls = {
  booking: "https://www.booking.com/user/rentmecr",
  airbnb: "https://www.airbnb.com/users/show/RENTME_ID",
  facebook: "https://www.facebook.com/rentmecr",
  instagram: "https://www.instagram.com/rentmecr",
  tiktok: "https://www.tiktok.com/@rentmecr"
};

export const platformsConfigMobile: OrbitItemConfig[] = [
  {
    id: 'booking',
    radius: 120,
    duration: 4,
    delay: 0,
    direction: 1,
    initialAngle: 225,
    content: (
      <a
        href={urls.booking}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-white text-xs font-bold">B.</span>
        </div>
        <span className="text-blue-600 font-semibold text-[10px] mt-1">Booking</span>
      </a>
    )
  },
  {
    id: 'airbnb',
    radius: 100,
    duration: 6,
    delay: 1,
    direction: -1,
    initialAngle: 315,
    content: (
      <a
        href={urls.airbnb}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <FaAirbnb className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
        <span className="text-red-500 font-semibold text-[10px] mt-1">Airbnb</span>
      </a>
    )
  },
  {
    id: 'facebook',
    radius: 140,
    duration: 5,
    delay: 2,
    direction: 1,
    initialAngle: 170,
    content: (
      <a
        href={urls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Facebook className="w-4 h-4 text-white" />
        </div>
        <span className="text-blue-600 font-semibold text-[10px] mt-1">Facebook</span>
      </a>
    )
  },
  {
    id: 'instagram',
    radius: 80,
    duration: 7,
    delay: 0.5,
    direction: 1,
    initialAngle: 80,
    content: (
      <a
        href={urls.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <Instagram className="w-4 h-4 text-white" />
        </div>
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent font-semibold text-[10px] mt-1">
          Instagram
        </span>
      </a>
    )
  },
  {
    id: 'tiktok',
    radius: 110,
    duration: 4.5,
    delay: 3,
    direction: -1,
    initialAngle: 0,
    content: (
      <a
        href={urls.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <FaTiktok className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-800 font-semibold text-[10px] mt-1">TikTok</span>
      </a>
    )
  }
];