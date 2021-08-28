import { Menu } from '@headlessui/react';
import { HiMenuAlt2 } from 'react-icons/hi';

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-4 2xl:text-xl mx-auto max-w-[300px] sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <img src="/assets/logo.svg" className="h-12 object-contain 2xl:h-16" />

      {/* Tablet/Laptop */}

      <ul className="hidden sm:flex space-x-4 text-white font-medium">
        <li className="hover:scale-105 active:scale-100 transition-transform">
          <a href="#objective">Tujuan</a>
        </li>
        <li className="hover:scale-105 active:scale-100 transition-transform">
          <a href="#events">Acara</a>
        </li>
        <li className="hover:scale-105 active:scale-100 transition-transform">
          <a href="#docs">Dokumentasi</a>
        </li>
      </ul>

      {/* Mobile */}

      <Menu as="div" className="relative sm:hidden">
        <Menu.Button>
          <HiMenuAlt2 className="h-7 w-7 text-white" />
        </Menu.Button>
        <Menu.Items className="absolute bg-white right-0 flex flex-col space-y-4 py-4 px-12 z-50 rounded-md font-medium">
          <Menu.Item>
            <a href="#home">Home</a>
          </Menu.Item>
          <Menu.Item>
            <a href="#events">Acara</a>
          </Menu.Item>
          <Menu.Item>
            <a href="#presenters">Pemateri</a>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  );
}
