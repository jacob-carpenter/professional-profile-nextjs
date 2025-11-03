import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { LoadingPage } from "../../components/LoadingPage/LoadingPage";
import { useRoutes } from "../../content/useRoutes";
import { flattenRoutes } from "../../utils/routeUtilities";

const HomePageComponent = () => {
  const router = useRouter();
  const { routes } = useRoutes();
  const flattenedRoutes = flattenRoutes(routes);
  const foundHome = flattenedRoutes.find(
    (route) => route.isHomePage && route.path
  );

  useEffect(() => {
    if (foundHome) router.push(foundHome.path);
  }, [foundHome, router]);

  return <LoadingPage />;
};

const HomePageComponentMemo = memo(HomePageComponent);

export default HomePageComponentMemo;
