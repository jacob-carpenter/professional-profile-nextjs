import { useTheme as useNextTheme } from "next-themes";
import { Navbar, Switch, useTheme } from "@nextui-org/react";
import { MoonIcon } from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
import { useRoutes } from "../../content/useRoutes";
import { useSiteConfiguration } from "../../content/useSiteConfiguration";
import { Page, Link as LinkModel } from "../../models/Route";
import { useMobile } from "../../utils/useMobile";
import { NavBarMenuButton } from "./components/NavBarMenuButton";
import clsx from "clsx";
import styles from "./NavBar.module.css";
import { flattenRoutes, isRouteSelected } from "../../utils/routeUtilities";
import { SiteBrand } from "./components/SiteBrand";
import { useRouter } from "next/router";
import { memo } from "react";
import { withDefaults } from "../../utils/withDefaults";
import { SocialMediaLinks } from "../Links/SocialMediaLinks/SocialMediaLinks";

const NavBarComponent = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const router = useRouter();

  const { siteSettings } = useSiteConfiguration();
  const { socialMediaLinks } = siteSettings;

  const { routes } = useRoutes();
  const isMobile = useMobile();
  const maxLinks = isMobile ? 3 : 6;

  const flattenedRoutes = flattenRoutes(routes);

  return (
    <Navbar
      isBordered
      variant="sticky"
      className={clsx({
        [styles.navigationBarContainer]: true,
        [styles.isDark]: isDark,
      })}
      containerCss={{
        minWidth: "100%",
        paddingLeft: "8px",
        paddingRight: "8px",
      }}
    >
      <Navbar.Brand>
        <SiteBrand />
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" activeColor="secondary" variant="underline">
        {flattenedRoutes
          .filter((route) =>
            isMobile
              ? route.navigationBarDisplaySettings?.showInMobile
              : route.navigationBarDisplaySettings?.show
          )
          .filter((_route, index) => index < maxLinks)
          .map((route) => {
            const { title } = route;
            let link = (route as LinkModel).link;
            let path = (route as Page).path;
            return (
              <Navbar.Link
                key={link || `/${path}`}
                isExternal={!!link}
                href={link || `/${path}`}
                isActive={isRouteSelected(route, router.asPath)}
              >
                {title}
              </Navbar.Link>
            );
          })}
      </Navbar.Content>
      <Navbar.Content
        css={{
          gap: isMobile ? "10px" : undefined,
        }}
      >
        {Object.keys(socialMediaLinks).length ? (
          <Navbar.Item>
            <SocialMediaLinks socialMediaLinks={socialMediaLinks} />
          </Navbar.Item>
        ) : undefined}
        <Navbar.Item>
          <Switch
            squared
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            iconOn={<MoonIcon filled />}
            iconOff={<SunIcon filled />}
          />
        </Navbar.Item>
        {isMobile ? (
          <Navbar.Item>
            <NavBarMenuButton />
          </Navbar.Item>
        ) : undefined}
      </Navbar.Content>
    </Navbar>
  );
};

export const NavBar = withDefaults(memo(NavBarComponent), {});
