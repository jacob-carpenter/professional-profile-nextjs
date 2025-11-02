import { Card, CardHeader, CardBody } from "@heroui/react";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
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
      <div className="pl-6">
        <DocumentPageContent
          document={getDocumentConfiguration(
            resolvedRoute.documentConfigurationId
          )}
        />
        {resolvedRoute.children ? (
          <ParentPageContent route={resolvedRoute} />
        ) : undefined}
      </div>
    );

  if (content) return content;

  const flattenedRoutes = flattenRoutes(routes);
  const foundHome = flattenedRoutes.find(
    (route) => route.isHomePage && route.path
  );

  useEffect(() => {
    if (foundHome) {
      router.push(foundHome.path);
    }
  }, [foundHome, router]);

  if (foundHome) {
    return <LoadingPage />;
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>Route {router.asPath || 'unknown'} was not defined...</CardHeader>
        <CardBody>
          Also no home route was defined so.. this is awkward. We are not really
          sure where you should go ¯\_(ツ)_/¯
        </CardBody>
      </Card>
    </div>
  );
};

export const PageContent = memo(PageContentComponent);
