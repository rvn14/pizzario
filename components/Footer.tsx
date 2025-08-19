"use client"
import { TransitionLink } from './utils/TransitionLink';
import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative">
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-crown-950/60" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-crown-50">
          {/* Brand / Contact */}
          <div className="space-y-6">
            <TransitionLink href="/" className="inline-flex items-center gap-3 group">
              <div className="font-ragas text-crown-50 font-black text-2xl group-hover:text-tomato transition">
                PIZZA<span className="text-transparent bg-gradient-to-r from-anzac-400 to-anzac-300 bg-clip-text">R.3IO</span>
              </div>
            </TransitionLink>

            <div className="text-gray-200 text-sm space-y-2">
              <div>No 25 Kensington Garden, Colombo</div>
              <div>00400</div>
              <div>Email: <a href="mailto:reservations@culturecolombo.lk" className="text-gray-100 hover:underline">reservations@culturecolombo.lk</a></div>
              <div>Phone: <a href="tel:+94774422448" className="text-gray-100 hover:underline">(+94) 77 442 2448</a></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wider">Quick Links</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-anzac-400 to-anzac-300 mt-3 mb-6" />
            <ul className="space-y-3 text-gray-300">
              <li><TransitionLink href="/" className="hover:text-crown-50">Home</TransitionLink></li>
              <li><TransitionLink href="/about" className="hover:text-crown-50">About</TransitionLink></li>
              <li><TransitionLink href="/menu" className="hover:text-crown-50">Menu</TransitionLink></li>
              <li><TransitionLink href="/reservation" className="hover:text-crown-50">Reservation</TransitionLink></li>

              <li><TransitionLink href="/contact" className="hover:text-crown-50">Contact</TransitionLink></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wider">Opening Hours</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-anzac-400 to-anzac-300 mt-3 mb-6" />
            <div className="text-gray-300 space-y-3 text-sm">
              <div className="font-medium">MONDAY – THURSDAY</div>
              <div>12.00 – 3.30 PM &amp; 6.30 - 10.30 PM</div>

              <div className="mt-4 font-medium">FRIDAY – SUNDAY</div>
              <div>12.00 – 3.30 PM &amp; 6.30 - 10.30 PM</div>

              <div className="mt-4 text-xs text-gray-400">(Hours might differ)</div>
            </div>
          </div>

          
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-crown-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-crown-50">
            &copy; {new Date().getFullYear()} PIZZARIO. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            {/* social icons */}
            <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-md">
              <FaFacebookF className="w-5 h-5 text-crown-50" />
            </a>
            <a href="#" aria-label="Instagram" className="inline-flex items-center justify-center w-10 h-10 bg-black/50 rounded-md  ">
              <FaInstagram className="w-5 h-5 text-crown-50" />
            </a>
            <a href="#" aria-label="WhatsApp" className="inline-flex items-center justify-center w-10 h-10 bg-green-600 rounded-md">
              <FaWhatsapp className="w-5 h-5 text-crown-50" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
