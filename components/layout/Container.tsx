import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className='mx-auto w-full max-w-[1920px] px-4 py-4 xl:px-20'>
      {children}
    </div>
  );
};

export default Container;
