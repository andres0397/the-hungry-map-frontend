import { GlobeAmericasIcon } from '@heroicons/react/24/solid';
import { Ribeye } from 'next/font/google';

const ribeye = Ribeye({ subsets: ['latin'], weight: '400' });

const HungryLogo = () => {
  return (
    <div className={`${ribeye.className} flex gap-2 `}>
      <p>The Hungry Map </p>
      <p>
        <GlobeAmericasIcon className="w-6 h-6 text-[var(--hungry-map-tertiary)]" />
      </p>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="bg-[#FFFF] w-full flex justify-center items-center h-[70px]">
      <HungryLogo />
    </nav>
  );
};

export default NavBar;
