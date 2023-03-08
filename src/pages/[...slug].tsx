import { Container } from "@nextui-org/react";
import { useRouter } from "next/router";
import { LoadingPage } from "../components/LoadingPage/LoadingPage";
import { PageContent } from "../components/PageContent/PageContent";

// TODO Dynamic rendering of routes from content

const CustomPage = () => {
  const router = useRouter();

  if (router.asPath === "/[...slug]") return <LoadingPage />;

  return (
    <Container fluid css={{ paddingRight: "32px" }}>
      <PageContent />
    </Container>
  );
};

export default CustomPage;
