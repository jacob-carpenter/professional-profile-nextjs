import { Card } from "@nextui-org/react";
import { memo } from "react";
import { IconType } from "../../models/Route";
import { CardHeader } from "../Card/CardHeader";

interface DividerComponentProps {
  header?: string;
  icon?: string;
  iconType?: IconType;
}

const DividerComponent = (props: DividerComponentProps) => {
  return (
    <>
      <Card>
        <CardHeader {...props} />
      </Card>
    </>
  );
};

export const Divider = memo(DividerComponent);
