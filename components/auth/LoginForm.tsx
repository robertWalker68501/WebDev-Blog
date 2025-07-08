'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import FormField from '@/components/common/FormField';
import Button from '@/components/common/Button';
import Heading from '@/components/common/Heading';
import SocialAuth from '@/components/auth/SocialAuth';
import { useState, useTransition } from 'react';
import { login } from '@/actions/auth/login';
import Alert from '@/components/common/Alert';
import { useRouter } from 'next/navigation';
import { LOGIN_REDIRECT } from '@/routes';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const formSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError('');
    startTransition(async () => {
      login(data).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (!res?.error) {
          router.push(LOGIN_REDIRECT[0]);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className='mx-auto mt-8 flex max-w-[500px] flex-col gap-2'
    >
      <Heading
        title='Login to WEBDEV.blog'
        lg
        center
      />

      <FormField
        id='email'
        type='email'
        placeholder='Email'
        register={register}
        errors={errors}
        disabled={isPending}
      />

      <FormField
        id='password'
        type='password'
        placeholder='Password'
        register={register}
        errors={errors}
        disabled={isPending}
      />

      {error && (
        <Alert
          message={error}
          error
        />
      )}
      <Button
        label={isPending ? 'Submitting...' : 'Login'}
        type='submit'
        disabled={isPending}
      />
      <div className='my-2 flex justify-center'>Or</div>
      <div className='flex w-full justify-center'>
        <SocialAuth />
      </div>
    </form>
  );
};

export default LoginForm;
