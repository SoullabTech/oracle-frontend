import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Importing spinner icon for loading state

// Define the props for the button
interface ButtonProps {
  onClick?: () => void; // Optional click handler
  children: React.ReactNode; // Button content (text or elements)
  className?: string; // Optional additional classes for custom styling
  type?: 'button' | 'submit' | 'reset'; // Button type (default is 'button')
  isLoading?: boolean; // Optional loading state
  variant?: 'primary' | 'secondary' | 'danger'; // Button style variant
  icon?: React.ReactNode; // Optional icon to display inside the button
  disabled?: boolean; // Optional disabled state
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  type = 'button',
  isLoading = false,
  variant = 'primary',
  icon,
  disabled = false,
}) => {
  // Define base classes for the button
  const baseClasses = 'px-4 py-2 rounded-md shadow-md focus:outline-none transition-all duration-300';

  // Define button color variants
  const colorVariants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  // Determine the color class based on the variant
  const colorClass = colorVariants[variant] || colorVariants.primary;

  // Define the spinner component for loading state
  const spinner = <FaSpinner className="animate-spin text-white" />;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${colorClass} ${className}`}
      disabled={isLoading || disabled} // Disable button if loading or manually disabled
      aria-label={children ? children.toString() : 'Button'} // Accessibility improvement
    >
      {isLoading ? (
        spinner
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>} {/* Optional icon */}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
