import Button from '@/components/common/Button';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { LOGIN_REDIRECT } from '@/routes';

const SocialAuth = () => {
  const handleOnClick = async (provider: 'google' | 'github') => {
    await signIn(provider, {
      redirectTo: LOGIN_REDIRECT[0],
    });
  };

  return (
    <div className='flex flex-col gap-2 md:flex-row'>
      <Button
        type='button'
        label='Continue with Github'
        outlined
        icon={FaGithub}
        onClick={() => handleOnClick('github')}
      />

      <Button
        type='button'
        label='Continue with Google'
        outlined
        icon={FaGoogle}
        onClick={() => handleOnClick('google')}
      />
    </div>
  );
};

export default SocialAuth;
