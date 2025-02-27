import { Box, Center } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';

import MenuIcon from '@/tkeel-console-portal-base/containers/Layout/Menus/ExpandMenus/MenuIcon';

type Props = {
  icon: string;
  active: boolean;
  isMenuLink?: boolean;
};

function MenuItem({ icon, active, isMenuLink = false }: Props) {
  const primaryColor = useColor('primary');
  const primarySub2Color = useColor('primarySub2');

  const backgroundColor = active ? 'primary' : 'transparent';

  return (
    <Box
      borderRadius="4px"
      backgroundColor={backgroundColor}
      _hover={
        active
          ? {}
          : {
              svg: {
                color: `${primarySub2Color} !important`,
                fill: `${primaryColor} !important`,
              },
            }
      }
      cursor="pointer"
    >
      <Center width="40px" height="40px">
        <MenuIcon icon={icon} active={active} isMenuLink={isMenuLink} />
      </Center>
    </Box>
  );
}

export default MenuItem;
