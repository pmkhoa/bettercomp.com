const CloseIcon = ({ color = '#ffffff' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
      <line
        x1="2.41421"
        y1="1"
        x2="25.7487"
        y2="24.3345"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="24.5853"
        x2="24.3345"
        y2="1.25077"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseIcon;
