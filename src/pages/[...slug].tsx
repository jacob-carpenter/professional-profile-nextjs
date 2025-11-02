import { useRouter } from "next/router";
import { LoadingPage } from "../components/LoadingPage/LoadingPage";
import { PageContent } from "../components/PageContent/PageContent";

// TODO Dynamic rendering of routes from content

const CustomPage = () => {
  const router = useRouter();

  if (!router.asPath || router.asPath === "/[...slug]") return <LoadingPage />;

  return (
    <div className="w-full">
      <PageContent />
    </div>
  );
};

export default CustomPage;
