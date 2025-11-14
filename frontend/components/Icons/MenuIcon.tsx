const MenuIcon = ({ color = '#FFA700' }) => {
  return (
    <svg
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28.5" cy="28.5" r="28.5" fill={color} />
      <circle cx="28.5" cy="28.5" r="23.75" stroke="white" strokeWidth="2" />
      <line
        x1="19.75"
        y1="22.5"
        x2="37.75"
        y2="22.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="19.75"
        y1="34.5"
        x2="37.75"
        y2="34.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="19.75"
        y1="28.5"
        x2="33.5"
        y2="28.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MenuIcon;
