import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NavBar } from "../components/NavBar/NavBar";
import { PageContainer } from "../components/PageContainer/PageContainer";
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
import "../styles/globals.css";

const ApplicationContentComponent = ({
  children,
}: {
  children: React.ReactNode;
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
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
    >
      <HeroUIProvider>
        <SiteConfigurationContextProvider
          // TODO Currently statically defined, but maybe route based for flexing subject of site?
          siteId={"2f8346a0-9f48-49ac-9317-c671bebd1415"}
        >
          <ApplicationContent>
            <div
              style={{
                display: "grid",
                padding: "0",
                margin: "0",
                maxWidth: "100%",
              }}
            >
              <NavBar />
              <PageContainer>{<Component {...pageProps} />}</PageContainer>
            </div>
          </ApplicationContent>
        </SiteConfigurationContextProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
};

const ApplicationComponent = withDefaults(memo(Application), {});

export default ApplicationComponent;
