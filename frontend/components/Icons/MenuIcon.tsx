const MenuIcon = ({ color = '#FFFFFF' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="24" viewBox="0 0 35 24" fill="none">
      <line x1="1" y1="1" x2="34" y2="1" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="12" x2="26" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="23" x2="34" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default MenuIcon;
