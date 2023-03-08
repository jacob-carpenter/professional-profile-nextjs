import { Container, Loading } from "@nextui-org/react";
import { memo } from "react";

const LoadingPageComponent = () => {
  return (
    <Container fluid>
      <Loading size="xl" css={{ left: "50%" }} />
    </Container>
  );
};

export const LoadingPage = memo(LoadingPageComponent);
