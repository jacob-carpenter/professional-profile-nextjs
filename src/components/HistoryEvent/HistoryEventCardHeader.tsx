import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";
import { CardHeader, Spacer } from "@heroui/react";
import { memo } from "react";
import { Iconly } from "react-iconly";
import { IconType } from "../../models/Route";

interface HistoryEventCardHeaderComponentProps {
  header?: string;
  icon?: string;
  iconPrefix?: string;
  iconType?: IconType;
  headerSuffix?: string | React.ReactNode;
}

const HistoryEventCardHeaderComponent = ({
  header,
  icon,
  iconType,
  iconPrefix,
  headerSuffix,
}: HistoryEventCardHeaderComponentProps) => {
  let iconComponent = undefined;
  if (icon)
    iconComponent =
      iconType === "fontawesome" ? (
        <FontAwesomeIcon
          icon={{
            iconName: icon as IconName,
            prefix: iconPrefix as IconPrefix,
          }}
          size="xl"
        />
      ) : (
        <Iconly name={icon} set="bold" size="medium" />
      );
  return (
    <>
      <CardHeader>
        <div className="flex w-full gap-1">
          <div className={`flex items-center ${headerSuffix ? "flex-grow sm:flex-grow-0 sm:w-2/3 md:w-3/4 lg:w-9/12 xl:w-10/12" : "w-full"}`}>
            {iconComponent ? (
              <>
                {iconComponent}
                <Spacer x={1} />
              </>
            ) : undefined}
            <b style={{ fontWeight: "bolder" }}>{header}</b>
          </div>
          {headerSuffix ? (
            <div className="flex flex-row-reverse flex-grow sm:flex-grow-0 sm:w-1/3 md:w-1/4 lg:w-3/12 xl:w-2/12">
              {headerSuffix}
            </div>
          ) : undefined}
        </div>
      </CardHeader>
    </>
  );
};

export const HistoryEventCardHeader = memo(HistoryEventCardHeaderComponent);
