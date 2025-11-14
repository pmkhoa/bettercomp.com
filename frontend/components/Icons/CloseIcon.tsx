const CloseIcon = ({ color = '#ffffff' }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="text-white"
    >
      <path
        d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"
        fill={color}
      ></path>
    </svg>
  );
};

const TriangleDown = ({ color = '#9EBAC8' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
    >
      <path
        d="M6.13398 0.499999C6.51888 -0.166667 7.48112 -0.166667 7.86603 0.5L13.0622 9.5C13.4471 10.1667 12.966 11 12.1962 11H1.80385C1.03405 11 0.552922 10.1667 0.937822 9.5L6.13398 0.499999Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
