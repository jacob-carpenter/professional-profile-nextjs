import { Spacer } from "@heroui/react";
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
        <div key={v4()} className="w-full">
          <Divider {...child} header={child.title} />
          <Spacer y={4} />
          <div className="w-full pl-8">
            <PageContent route={child} />
          </div>
          <Spacer y={4} />
        </div>
      ))}
    </>
  );
};

export const ParentPageContent = memo(ParentPageContentComponent);
