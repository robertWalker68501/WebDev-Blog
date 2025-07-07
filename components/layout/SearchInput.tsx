import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchInput = () => {
  return (
    <div className='relative hidden sm:block'>
      <Search className='absolute left-4 top-3 size-4 text-muted-foreground' />
      <Input
        placeholder='Search'
        className='bg-primary/10 pl-10'
      />
    </div>
  );
};

export default SearchInput;
