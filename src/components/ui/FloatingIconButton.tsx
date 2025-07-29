import React from 'react';

interface FloatingIconButtonProps {
  onClick: () => void;
  title: string;
  icon: React.ReactElement<{ style?: React.CSSProperties }>;
  style?: React.CSSProperties;
}

const FloatingIconButton: React.FC<FloatingIconButtonProps> = ({ onClick, title, icon, style }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      width: 32,
      height: 32,
      borderRadius: '8px',
      border: 'none',
      background: '#DDE7EE',
      boxShadow: '0 2px 8px rgba(67,147,228,0.18)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'common.black',
      transition: 'box-shadow 0.2s',
      ...style,
    }}
  >
    {React.cloneElement(icon, {
      style: {
        fontSize: 20,
        color: 'common.black',
        ...(icon.props.style || {}),
      },
    })}
  </button>
);

export default FloatingIconButton;
