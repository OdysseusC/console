import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from '@tkeel/console-components';
import { QueryClient } from '@tkeel/console-hooks';
import themes, {
  DEFAULT_THEME,
  DEFAULT_THEME_NAME,
  ThemeNames,
} from '@tkeel/console-themes';
import { Logo } from '@tkeel/console-types';

import Routes from '@/tkeel-console-portal-base/routes';

const themeName =
  (GLOBAL_PORTAL_CONFIG.client.themeName as ThemeNames) || DEFAULT_THEME_NAME;
const theme = themes[themeName] || DEFAULT_THEME;

type Props = {
  documentHeadComponent: ReactNode;
  requireAuthContainer: ReactNode;
  requireNoAuthContainer: ReactNode;
  requireNoAuthRoutes: ReactNode;
  notRequireAuthRoutes?: ReactNode;
  userActionMenusComponent: ReactNode;
  logo: Logo;
};

const queryClient = new QueryClient();

export default function App({
  documentHeadComponent,
  requireAuthContainer,
  requireNoAuthContainer,
  requireNoAuthRoutes,
  notRequireAuthRoutes,
  userActionMenusComponent,
  logo,
}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider theme={theme}>
          {documentHeadComponent}
          <Routes
            requireAuthContainer={requireAuthContainer}
            requireNoAuthContainer={requireNoAuthContainer}
            requireNoAuthRoutes={requireNoAuthRoutes}
            notRequireAuthRoutes={notRequireAuthRoutes}
            userActionMenusComponent={userActionMenusComponent}
            logo={logo}
          />
          <ToastContainer />
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
}
