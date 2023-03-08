import { useRoutes } from "../../content/useRoutes";
import { v4 } from "uuid";
import { Route } from "../../models/Route";
import {
  evaluateRoute,
  resolveFullRoutePaths,
} from "../../utils/routeUtilities";
import { SideBarItem } from "./components/SideBarItem";
import { useMobile } from "../../utils/useMobile";
import { Container, useTheme } from "@nextui-org/react";
import styles from "./SideBar.module.css";
import clsx from "clsx";
import { memo } from "react";
import { withDefaults } from "../../utils/withDefaults";

export const MAX_SIDE_BAR_LEVEL = 2;

interface SideBarProps {
  routes?: Route[];
  level?: number;
}

const SideBarComponent = ({ routes, level = 0 }: SideBarProps) => {
  const isMobile = useMobile();
  const { isDark } = useTheme();

  const { routes: defaultRoutes } = useRoutes();
  let resolvedRoutes = routes;
  if (!routes) {
    resolvedRoutes = resolveFullRoutePaths(defaultRoutes);
  }

  return (
    <Container
      className={clsx({
        [styles.baseSideBar]: level === 0,
        [styles.isMobile]: isMobile,
        [styles.fullResolution]: !isMobile,
        [styles.isDark]: isDark,
      })}
    >
      {resolvedRoutes
        .filter((route) =>
          evaluateRoute(
            route,
            (route) =>
              !!(isMobile
                ? route.sideBarDisplaySettings?.showInMobile
                : route.sideBarDisplaySettings?.show)
          ).some((evalutation) => evalutation)
        )
        .map((route, index, resolvedItems) => (
          <SideBarItem
            key={v4()}
            {...route}
            level={level}
            gutterBottom={
              level === MAX_SIDE_BAR_LEVEL && index + 1 === resolvedItems.length
            }
          />
        ))}
    </Container>
  );
};

export const SideBar = withDefaults(memo(SideBarComponent), {});
