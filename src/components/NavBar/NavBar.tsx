import { useTheme as useNextTheme } from "next-themes";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NavbarLink, Switch } from "@heroui/react";
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
import { useIsDarkTheme } from "../../hooks/useIsDarkTheme";

const NavBarComponent = () => {
  const { setTheme } = useNextTheme();
  const isDark = useIsDarkTheme();
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
      position="sticky"
      className={clsx({
        [styles.navigationBarContainer]: true,
        [styles.isDark]: isDark,
      })}
      classNames={{
        wrapper: "min-w-full px-2",
      }}
    >
      <NavbarBrand>
        <SiteBrand />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
            const isActive = isRouteSelected(route, router.asPath || '');
            return (
              <NavbarItem key={link || `/${path}`} isActive={isActive}>
                <NavbarLink
                  isExternal={!!link}
                  href={link || `/${path}`}
                >
                  {title}
                </NavbarLink>
              </NavbarItem>
            );
          })}
      </NavbarContent>
      <NavbarContent
        justify="end"
        style={{
          gap: isMobile ? "10px" : undefined,
        }}
      >
        {Object.keys(socialMediaLinks).length ? (
          <NavbarItem>
            <SocialMediaLinks socialMediaLinks={socialMediaLinks} />
          </NavbarItem>
        ) : undefined}
        <NavbarItem>
          <Switch
            isSelected={isDark}
            onValueChange={(checked) => setTheme(checked ? "dark" : "light")}
            thumbIcon={isDark ? <MoonIcon filled /> : <SunIcon filled />}
          />
        </NavbarItem>
        {isMobile ? (
          <NavbarItem>
            <NavBarMenuButton />
          </NavbarItem>
        ) : undefined}
      </NavbarContent>
    </Navbar>
  );
};

export const NavBar = withDefaults(memo(NavBarComponent), {});
