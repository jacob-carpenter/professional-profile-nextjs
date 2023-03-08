import { Container, Spacer } from "@nextui-org/react";
import { memo } from "react";
import { v4 } from "uuid";
import { Route } from "../../../models/Route";
import { PageContent } from "../PageContent";
import { Divider } from "../../Divider/Divider";

interface ParentPageContentComponentProps {
  route?: Route;
}

const ParentPageContentComponent = ({
  route,
}: ParentPageContentComponentProps) => {
  return (
    <>
      {route?.children.map((child) => (
        <Container key={v4()}>
          <Divider {...child} header={child.title} />
          <Spacer />
          <Container fluid css={{ paddingLeft: "16px" }}>
            <PageContent route={child} />
          </Container>
          <Spacer />
        </Container>
      ))}
    </>
  );
};

export const ParentPageContent = memo(ParentPageContentComponent);
