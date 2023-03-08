import { Container, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { memo } from "react";
import { useRoutes } from "../../content/useRoutes";
import { flattenRoutes } from "../../utils/routeUtilities";

const HomePageComponent = () => {
  const router = useRouter();
  const { routes } = useRoutes();
  const flattenedRoutes = flattenRoutes(routes);
  const foundHome = flattenedRoutes.find(
    (route) => route.isHomePage && route.path
  );

  if (foundHome) router.push(foundHome.path);

  return (
    <Container fluid>
      <Text>No home route was bound...</Text>
    </Container>
  );
};

const HomePageComponentMemo = memo(HomePageComponent);

export default HomePageComponentMemo;
