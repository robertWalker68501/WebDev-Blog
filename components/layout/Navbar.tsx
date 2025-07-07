import {
  Container,
  ThemeToggle,
  SearchInput,
  Notifications,
  UserButton,
  SiteLogo,
} from '@/components/layout';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 border-b bg-white dark:bg-slate-950'>
      <Container>
        <div className='flex items-center justify-between gap-8'>
          <SiteLogo />
          <SearchInput />

          <div className='flex items-center gap-5 sm:gap-8'>
            <ThemeToggle />
            <Notifications />
            <UserButton />

            <>
              <Link href='/login'>Login</Link>
              <Link href='/register'>Register</Link>
            </>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
