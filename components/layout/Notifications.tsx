import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <div className='absolute bottom-2 left-2 flex size-6 items-center justify-center rounded-full bg-rose-500 text-sm'>
          <span className=''>5</span>
        </div>
        <Bell size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[100%] max-w-[400px]'>
        <div className='mb-2 flex justify-between gap-4 p-2'>
          <h3 className='text-lg font-bold'>Notifications</h3>
          <button className=''>Mark all as read</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
