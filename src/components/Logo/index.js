import { Icon, IconProps, useColorModeValue, useTheme } from '@chakra-ui/react';

export const Logo = (props: IconProps) => {
  const theme = useTheme();

  const foreground = useColorModeValue(
    theme.colors.pink[400],
    theme.colors.pink[400]
  );
  const background = useColorModeValue(
    theme.colors.pink[100],
    theme.colors.pink[900]
  );

  return (
    <Icon
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M 280 140 L 200 60 L 120 60 L 40 140 L 40 220 L 120 300 L 200 380 L 280 460 L 360 380 L 440 300 L 520 220 L 520 140 L 440 60 L 360 60 L 280 140 Z"
        fill={background}
      />
      <path
        d="M 280 140 L 200 60 L 120 60 L 40 140 L 40 220 L 120 300 L 200 380 L 280 460 L 360 380 L 440 300 L 520 220 L 520 140 L 440 60 L 360 60 L 280 140 Z"
        fill={background}
      />
      <path
        d="M 280 140 L 200 60 L 120 60 L 40 140 L 40 220 L 120 300 L 200 380 L 280 460 L 360 380 L 440 300 L 520 220 L 520 140 L 440 60 L 360 60 L 280 140 Z"
        fill={foreground}
      />
      <path
        d="M 280 140 L 200 60 L 120 60 L 40 140 L 40 220 L 120 300 L 200 380 L 280 460 L 360 380 L 440 300 L 520 220 L 520 140 L 440 60 L 360 60 L 280 140 Z"
        fill={foreground}
      />
    </Icon>
  );
};