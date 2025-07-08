'use client';

import React from 'react';
import { IconType } from 'react-icons/lib';
import { cn } from '@/lib/utils';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outlined,
  small,
  icon: Icon,
  className,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'my-2 flex w-auto items-center justify-center gap-2 rounded-md border-2 border-slate-300 bg-slate-700 px-5 py-3 text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700',
        outlined &&
          'bg-transparent text-slate-700 dark:bg-transparent dark:text-slate-300',
        small && 'border-[1px] px-2 py-1 text-sm',
        className
      )}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;
