import React from 'react';
import Button from 'react-bootstrap/Button';

const CustomButton = ({ label, backgroundColor, borderColor, width, onClick }) => {
  return (
    <Button
      style={{ backgroundColor, borderColor, width }}
      className="btn-hover"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
