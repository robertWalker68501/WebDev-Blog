'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyEmail } from '@/actions/auth/email-verification';
import Heading from '@/components/common/Heading';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';

const EmailVerificationClient = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [pending, setPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setPending(true);
    if (!token) return setError('Missing verification token');

    verifyEmail(token).then((res) => {
      setSuccess(res.success);
      setError(res.error);
    });
    setPending(false);
  }, [token]);
  return (
    <div className='mx-auto my-8 flex max-w-[400px] flex-col items-center gap-2 rounded-md border-2 p-2'>
      <Heading
        title='WEBDEVblog'
        center
      />
      {pending && <div>Verifying Email...</div>}
      {success && (
        <Alert
          message={success}
          success
        />
      )}
      {error && (
        <Alert
          message={error}
          error
        />
      )}
      {success && (
        <Button
          type='submit'
          label='Login'
          onClick={() => router.push('/login')}
        />
      )}
    </div>
  );
};

export default EmailVerificationClient;
