'use client';
import { GlobeAmericasIcon } from '@heroicons/react/24/solid';
import { HomeIcon, MagnifyingGlassIcon, StarIcon, UserIcon } from '@heroicons/react/24/solid';
import { Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import { Ribeye } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ribeye = Ribeye({ subsets: ['latin'], weight: '400' });

export const HungryLogo = () => {
  return (
    <div className={`${ribeye.className} flex gap-2 `}>
      <p>The Hungry Map </p>
      <p>
        <GlobeAmericasIcon className="w-6 h-6" />
      </p>
    </div>
  );
};

const linksItems = [
  { href: '/timeline', icon: <HomeIcon className="w-8 h-8" />, name: 'Home' },
  { href: '/profile', icon: <UserIcon className="w-8 h-8" />, name: 'Profile' },
  { href: '/search', icon: <MagnifyingGlassIcon className="w-8 h-8" />, name: 'Search' },
  { href: '/favorites', icon: <StarIcon className="w-8 h-8" />, name: 'Favorites' },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <Navbar className="bg-[#FFFF]">
      <NavbarContent
        className="lg:hidden flex justify-between w-full gap-4 bg-[#FFFF]!"
        justify="center"
      >
        {linksItems.map((item) => (
          <NavbarItem
            className={`${pathname === item.href ? 'text-[var(--hungry-map-tertiary)]' : ''} `}
            key={item.name}
          >
            <Link href={item.href}>{item.icon}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
