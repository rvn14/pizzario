"use client"
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';


export default function Footer() {
  

  return (
    <footer className="relative bg-cover bg-center bg-no-repeat text-wood-50">
      
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      <div className="relative container mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col items-start">
            <p className="font-ragas font-black text-3xl pointer-events-none select-none">
                PIZZA
                <span className="text-transparent bg-gradient-to-r from-anzac-400 to-anzac-300 bg-clip-text">
                  R.3IO
                </span>
              </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting authentic Italian pizzas with passion and the finest ingredients since 2010. Experience a slice of Italy right here.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-anzac-400 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-anzac-400 transition-colors duration-300">Menu</Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-anzac-400 transition-colors duration-300">Reservations</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-anzac-400 mt-1 mr-3 flex-shrink-0 "><FiMapPin size={20} /></span>
                <span className='hover:text-anzac-400 transition-colors duration-300 cursor-pointer'>123 Pizza Street, Galle, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <span className="text-anzac-400 mr-3 flex-shrink-0"><FiPhone size={20} /></span>
                <Link href="tel:+94123456789" className="hover:text-anzac-400 transition-colors duration-300">+94 123 456 789</Link>
              </li>
              <li className="flex items-center">
                <span className="text-anzac-400 mr-3 flex-shrink-0"><FiMail size={20} /></span>
                <Link href="mailto:contact@pizzario.com" className="hover:text-anzac-400 transition-colors duration-300">contact@pizzario.com</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Opening Hours & Socials */}
          <div>
            <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider">Opening Hours</h3>
            <div className="text-wood-50">
              <p className="flex justify-between"><span>Mon - Fri</span> <span>11am - 10pm</span></p>
              <p className="flex justify-between border-t border-wood-50/50 mt-2 pt-2"><span>Sat - Sun</span> <span>10am - 11pm</span></p>
            </div>
             <h3 className="text-xl font-semibold mt-8 mb-4 uppercase tracking-wider">Follow Us</h3>
             <div className="flex items-center space-x-4">
               <Link href="#" aria-label="Facebook" className="text-wood-50 hover:text-anzac-400 transition-colors duration-300">
                 <FaFacebookF size={22} />
               </Link>
               <Link href="#" aria-label="Instagram" className="text-wood-50 hover:text-anzac-400 transition-colors duration-300">
                 <FaInstagram size={22} />
               </Link>
               <Link href="#" aria-label="Twitter" className="text-wood-50 hover:text-anzac-400 transition-colors duration-300">
                 <FaTwitter size={22} />
               </Link>
               <Link href="#" aria-label="WhatsApp" className="text-wood-50 hover:text-anzac-400 transition-colors duration-300">
                 <FaWhatsapp size={22} />
               </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-wood-50/50 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-wood-100 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Pizzario. All rights reserved.
          </p>
          <p className="text-wood-100 text-sm">
            Designed by rvn14.
          </p>
        </div>
      </div>
    </footer>
  );
}


