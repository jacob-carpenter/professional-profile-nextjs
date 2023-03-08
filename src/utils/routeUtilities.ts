import { Link, Page } from "../models/Route";

// TODO Should add a failsafe the recursive functions to prevent infinite recursion
export const isRouteSelected = <T extends Page | Link>(
  item: T | string,
  currentPath: string
) => {
  const path = (item as Page)?.path || item;
  if (!path) return false;
  7;
  return currentPath.startsWith(`/${path}`);
};

export const evaluateRoute = <T extends Page | Link>(
  item: T,
  evaluationFunction: (_item: T) => boolean
) => [
  evaluationFunction(item),
  ...(item.children || []).flatMap((child) =>
    evaluateRoute(child, evaluationFunction)
  ),
];

export const resolveFullRoutePaths = <T extends Page | Link>(
  elements: T[] = [],
  parentRoute?: string
) =>
  elements.map((route) => {
    const path = (route as Page).path;
    const combinedRoute = path
      ? `${parentRoute ? `${parentRoute}/` : ""}${path}`
      : parentRoute;
    return {
      ...route,
      path: combinedRoute,
      children: resolveFullRoutePaths(route.children, combinedRoute),
    };
  });

export const flattenRoutes = <T extends Page | Link>(
  elements: T[] = [],
  parentRoute?: string
) =>
  elements.flatMap((route) => {
    const path = (route as Page).path;
    const combinedRoute = path
      ? `${parentRoute ? `${parentRoute}/` : ""}${path}`
      : parentRoute;
    return [
      { ...route, path: combinedRoute },
      ...flattenRoutes(route.children || [], combinedRoute),
    ];
  });
