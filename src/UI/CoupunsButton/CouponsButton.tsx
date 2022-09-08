import React from 'react';

interface IProps {
  color: string;
  children?: React.ReactNode;
  onClick: () => void;
  radius: string;
  id?: number;
  backgroundColor: string;
  fontSize: string;
  padding?: string;
}

const CouponsButton: React.FC<IProps> = ({
  padding,
  color,
  children,
  onClick,
  radius,
  backgroundColor,
  fontSize,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        color: color,
        backgroundColor: backgroundColor,
        borderRadius: radius,

        border: 'none',
        padding: padding,
        fontSize,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default CouponsButton;
