'use client';

import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Heading from '@/components/common/Heading';
import FormField from '@/components/common/FormField';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from '@/schemas/PasswordResetSchema';
import { useSearchParams } from 'next/navigation';
import { passwordReset } from '@/actions/auth/password-reset';

const PasswordResetFormClient = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const token = searchParams.get('token');

  const onSubmit: SubmitHandler<PasswordResetSchemaType> = (data) => {
    setError('');
    startTransition(async () => {
      passwordReset(data, token).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto mt-8 flex max-w-[500px] flex-col gap-2'
    >
      <Heading
        title='Set a new WEBDEV.blog password'
        lg
        center
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
        label={isPending ? 'Submitting...' : 'Save New Password'}
        type='submit'
        disabled={isPending}
      />
    </form>
  );
};

export default PasswordResetFormClient;
