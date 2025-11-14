import React from 'react';

type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function ButtonPrimary({
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonPrimaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden text-black font-bold rounded py-3 px-8 min-w-[150px] group ${className}`}
    >
      <span className="absolute inset-0 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] transition-opacity duration-700 ease-out group-hover:opacity-0" />
      <span className="absolute inset-0 bg-[var(--color-gold)] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
