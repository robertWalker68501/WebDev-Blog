'use client';

import {
  Container,
  ThemeToggle,
  SearchInput,
  Notifications,
  UserButton,
  SiteLogo,
} from '@/components/layout';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  const path = usePathname();

  console.log('Session:', session);

  useEffect(() => {
    if (!isLoggedIn && path) {
      const updateSession = async () => {
        await session.update();
      };

      updateSession();
    }
  }, [path, isLoggedIn]);

  return (
    <nav className='sticky top-0 z-50 border-b bg-white dark:bg-slate-950'>
      <Container>
        <div className='flex items-center justify-between gap-8'>
          <SiteLogo />
          <SearchInput />

          <div className='flex items-center gap-5 sm:gap-8'>
            <ThemeToggle />
            {isLoggedIn && <Notifications />}
            {isLoggedIn && <UserButton />}
            {!isLoggedIn && (
              <>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Register</Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
