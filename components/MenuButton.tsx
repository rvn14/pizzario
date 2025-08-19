import React from 'react';
import Link from 'next/link';

interface MenuButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children = 'Explore More', onClick, className = 'font-abriel' }) => {
  return (
    <Link
      href="/menu"
      onClick={onClick}
      className={
        [
          'px-[40px]',            
          'py-[17px]',            
          'rounded-full',
          'border-0',
          'bg-persimmon-500',       
          'text-wood-100',
          'tracking-[1.5px]',
          'text-md',
          'transition-all',
          'duration-300',
          'ease-in-out',
          'cursor-pointer',
          'focus:outline-none',
          'shadow-[0_10px_0_theme(colors.crown.950)]',
          'hover:shadow-[0_7px_0_theme(colors.crown.950)]',
          'hover:translate-y-[3px]',
          'active:shadow-[0_0px_0_theme(colors.crown.950)]',
          'active:translate-y-[10px]',
          'active:duration-200',
          className
        ].join(' ')
      }
    >
      {children}
    </Link>
  );
}

export default MenuButton;
