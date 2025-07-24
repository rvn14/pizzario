import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 font-inter border-t border-zinc-700/70 z-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="font-ragas text-white font-black text-2xl  group-hover:text-tomato transition">
            PIZZA<span className="text-tomato">R.3IO</span>
          </div>
        </Link>
        {/* Navigation */}
        
        
        {/* Copyright */}
        <div className="w-full text-xs text-gray-400 text-center md:text-right pt-4 md:pt-0">
          &copy; {new Date().getFullYear()} PIZZARIO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
