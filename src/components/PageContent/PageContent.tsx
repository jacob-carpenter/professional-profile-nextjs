import { Card, Container } from "@nextui-org/react";
import { useRouter } from "next/router";
import { memo } from "react";
import { useRoute } from "../../content/useRoutes";
import { Route } from "../../models/Route";
import { getDocumentConfiguration } from "../../content/useDocument";
import { useRoutes } from "../../content/useRoutes";
import { flattenRoutes } from "../../utils/routeUtilities";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { DocumentPageContent } from "./Components/DocumentPageContent";
import { ParentPageContent } from "./Components/ParentPageContent";

interface PageContentComponentProps {
  route?: Route;
}

const PageContentComponent = ({
  route: providedRoute,
}: PageContentComponentProps) => {
  const defaultRoute = useRoute();
  let resolvedRoute = providedRoute ? providedRoute : defaultRoute;
  const router = useRouter();
  const { routes } = useRoutes();

  let content = undefined;
  if (resolvedRoute?.documentConfigurationId)
    content = (
      <>
        <DocumentPageContent
          document={getDocumentConfiguration(
            resolvedRoute.documentConfigurationId
          )}
        />
        {resolvedRoute.children ? (
          <ParentPageContent route={resolvedRoute} />
        ) : undefined}
      </>
    );

  if (content) return content;

  const flattenedRoutes = flattenRoutes(routes);
  const foundHome = flattenedRoutes.find(
    (route) => route.isHomePage && route.path
  );

  if (foundHome) {
    router.push(foundHome.path);
    return <LoadingPage />;
  }

  return (
    <Container>
      <Card>
        <Card.Header>Route {router.asPath} was not defined...</Card.Header>
        <Card.Body>
          Also no home route was defined so.. this is awkward. We are not really
          sure where you should go ¯\_(ツ)_/¯
        </Card.Body>
      </Card>
    </Container>
  );
};

export const PageContent = memo(PageContentComponent);
