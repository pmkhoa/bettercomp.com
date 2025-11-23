const TwitterIcon = ({ color = '#0092FF' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <mask
        id="mask0_1815_1973"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <path d="M24.5243 0.47583H0.0722656V23.2977H24.5243V0.47583Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1815_1973)">
        <path
          d="M0.131882 0.47583L9.57254 13.0635L0.0722656 23.2977H2.21039L10.5279 14.3375L17.2482 23.2977H24.5243L14.5524 10.0021L23.3953 0.47583H21.2571L13.5972 8.72807L7.40803 0.47583H0.131882ZM3.27616 2.04636H6.61884L21.3795 21.7269H18.0369L3.27616 2.04636Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default TwitterIcon;
