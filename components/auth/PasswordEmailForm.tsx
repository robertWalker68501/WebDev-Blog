'use client';

import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  PasswordEmailSchema,
  PasswordEmailSchemaType,
} from '@/schemas/PasswordEmailSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Heading from '@/components/common/Heading';
import FormField from '@/components/common/FormField';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import { passwordEmail } from '@/actions/auth/password-email';

const PasswordEmailForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordEmailSchemaType>({
    resolver: zodResolver(PasswordEmailSchema),
  });

  const onSubmit: SubmitHandler<PasswordEmailSchemaType> = (data) => {
    setError('');
    startTransition(async () => {
      passwordEmail(data).then((res) => {
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
        title='Forgot your WEBDEV.blog password?'
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
        label={isPending ? 'Submitting...' : 'Send Reset Email'}
        type='submit'
        disabled={isPending}
      />
    </form>
  );
};

export default PasswordEmailForm;
