import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavBar } from "../components/NavBar/NavBar";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { useSSR } from "@nextui-org/react";
import {
  SiteConfigurationContextProvider,
  useSiteConfiguration,
} from "../content/useSiteConfiguration";
import {
  getRouteConfiguration,
  RouteConfigurationContextProvider,
} from "../content/useRoutes";
import { withDefaults } from "../utils/withDefaults";
import { memo } from "react";

import "../content/fontAwesomeInitializer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { flattenRoutes } from "../utils/routeUtilities";
import { getAllFontAwesomeIconsForRoutes } from "../utils/fontAwesome";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
  className: "isDark",
});

const ApplicationContentComponent = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const {
    siteSettings: { routeConfigurationId },
  } = useSiteConfiguration();

  const allRequiredIcons = getAllFontAwesomeIconsForRoutes(
    flattenRoutes(getRouteConfiguration(routeConfigurationId)?.routes)
  );

  // Manual treeshaking of FA icons for now... not the greatest
  library.reset();
  library.add(...allRequiredIcons);

  return (
    <RouteConfigurationContextProvider
      routeConfigurationId={routeConfigurationId}
    >
      {children}
    </RouteConfigurationContextProvider>
  );
};

const ApplicationContent = withDefaults(memo(ApplicationContentComponent), {});

const Application = ({ Component, pageProps }) => {
  const { isBrowser } = useSSR();
  return (
    isBrowser && (
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <SiteConfigurationContextProvider
            // TODO Currently statically defined, but maybe route based for flexing subject of site?
            siteId={"2f8346a0-9f48-49ac-9317-c671bebd1415"}
          >
            <ApplicationContent>
              <NavBar />
              <PageContainer>{<Component {...pageProps} />}</PageContainer>
            </ApplicationContent>
          </SiteConfigurationContextProvider>
        </NextUIProvider>
      </NextThemesProvider>
    )
  );
};

const ApplicationComponent = withDefaults(memo(Application), {});

export default ApplicationComponent;
