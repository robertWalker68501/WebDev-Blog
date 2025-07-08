'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import FormField from '@/components/common/FormField';
import Button from '@/components/common/Button';
import Heading from '@/components/common/Heading';
import SocialAuth from '@/components/auth/SocialAuth';
import { signUp } from '@/actions/auth/register';
import { useState, useTransition } from 'react';
import Alert from '@/components/common/Alert';

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const formSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    setSuccess('');
    setError('');
    startTransition(() => {
      signUp(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className='mx-auto mt-8 flex max-w-[500px] flex-col gap-2'
    >
      <Heading
        title='Create a WEBDEV.blog Account'
        lg
        center
      />

      <FormField
        id='name'
        type='text'
        placeholder='Name'
        register={register}
        errors={errors}
        disabled={isPending}
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

      <FormField
        id='confirmPassword'
        type='password'
        placeholder='Confirm Password'
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
      {success && (
        <Alert
          message={success}
          success
        />
      )}

      <Button
        label={isPending ? 'Submitting...' : `Register`}
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

export default RegisterForm;
