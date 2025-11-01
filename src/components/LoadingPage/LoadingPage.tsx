import { Spinner } from "@heroui/react";
import { memo } from "react";

const LoadingPageComponent = () => {
  return (
    <div className="w-full flex justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export const LoadingPage = memo(LoadingPageComponent);
