import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  variant?: 'default' | 'outline' | 'primary';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  className, 
  onClick, 
  children 
}) => {
  // Define styles for each variant
  const variantClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    primary: 'bg-green-500 text-white hover:bg-green-600'
  };

  // Combine the base and variant classes
  const buttonClasses = clsx(
    'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2', 
    variantClasses[variant],
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
