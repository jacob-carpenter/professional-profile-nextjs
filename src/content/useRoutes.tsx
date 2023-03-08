import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { Page, RouteConfiguration } from "../models/Route";
import { flattenRoutes } from "../utils/routeUtilities";
import jacobRouteConfig from "./static/routes/685a5bf1-2e14-4035-99bc-fb1720f6b743.json";

// TODO API Support
export const getRouteConfiguration = (id: string) => {
  if (id === "685a5bf1-2e14-4035-99bc-fb1720f6b743")
    return jacobRouteConfig as RouteConfiguration;
};

const RouteConfigurationContext = createContext<RouteConfiguration | undefined>(
  undefined
);

export const RouteConfigurationContextProvider = (props: {
  children?: JSX.Element | JSX.Element[];
  routeConfigurationId: string;
}) => {
  const { children, routeConfigurationId } = props;
  // TODO load by id from api
  const routeConfiguration = getRouteConfiguration(routeConfigurationId);

  return (
    <RouteConfigurationContext.Provider value={routeConfiguration}>
      {children}
    </RouteConfigurationContext.Provider>
  );
};

export const useRoutes = () => {
  const context = useContext(RouteConfigurationContext);
  if (context === undefined)
    console.warn(
      "useRoutes MUST be used within a RouteConfigurationContext. Failure to do so can result in the site not functioning appropriately."
    );
  return context;
};

export const useRoute = () => {
  const { routes } = useRoutes();
  const router = useRouter();

  const flattenedRoutes = flattenRoutes(routes);

  return flattenedRoutes
    .filter((route) => (route as Page).path)
    .find((route) => `/${(route as Page).path}` === router.asPath);
};
