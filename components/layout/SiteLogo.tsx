'use client';

import { MdNoteAlt } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const SiteLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className='flex cursor-pointer items-center gap-1'
    >
      <MdNoteAlt size={24} />
      <div className='text-xl font-bold'>WEBDEV.blog</div>
    </div>
  );
};

export default SiteLogo;
