"use client"
import React from 'react';
import Link from 'next/link';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="relative overflow-hidden p-8 bg-black flex flex-col items-center justify-center">
      <section className='container flex flex-col'>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">© 2025 Pizzario. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-white">
              <FaFacebookSquare />
            </Link>
            <Link href="#" className="text-white">
              <FaSquareInstagram />
            </Link>
            <Link href="#" className="text-white">
              <FaSquareWhatsapp />
            </Link>
          </div>
        </div>
      </section>

    </footer>
  );
}
