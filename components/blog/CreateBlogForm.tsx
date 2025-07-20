'use client';

import { useForm } from 'react-hook-form';
import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import FormField from '@/components/common/FormField';
import AddCover from '@/components/blog/AddCover';
import { useState } from 'react';

const CreateBlogForm = () => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [uploadedCover, setUploadedCover] = useState<string>();

  console.log(uploadedCover);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      userId,
      isPublished: false,
    },
  });

  return (
    <form className='m-auto flex min-h-[85vh] max-w-[1200px] flex-col justify-between'>
      <div>
        <AddCover setUploadedCover={setUploadedCover} />
        <FormField
          id='title'
          placeholder='Blog Title'
          register={register}
          errors={errors}
          disabled={false}
          inputClassNames='border-none text-5xl font-bold dark:bg-transparent px-4'
        />
      </div>
    </form>
  );
};

export default CreateBlogForm;
