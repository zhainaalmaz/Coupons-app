import React, { useState } from 'react';

interface IProps {
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  id: number;
  backgroundColor: string;
  fontSize: string;
}

const CouponsButton: React.FC<IProps> = ({
  color,
  children,
  height,
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
        height,
        border: 'none',
        padding: '8px 16px',
        fontSize,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default CouponsButton;
