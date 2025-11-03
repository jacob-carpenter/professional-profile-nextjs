import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";
import { CardHeader as HeroUICardHeader, Spacer } from "@heroui/react";
import { memo } from "react";
import { Iconly } from "react-iconly";
import { IconType } from "../../models/Route";
import { ExternalLinks } from "../Links/ExternalLinks/ExternalLinks";

interface CardHeaderComponentProps {
  header?: string;
  icon?: string;
  iconPrefix?: string;
  iconType?: IconType;
  externalLinks?: string[];
}

const CardHeaderComponent = ({
  header,
  icon,
  iconType,
  iconPrefix,
  externalLinks,
}: CardHeaderComponentProps) => {
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

  const cardTitle = (
    <div className="flex items-center">
      {iconComponent ? (
        <>
          {iconComponent}
          <Spacer x={1} />
        </>
      ) : undefined}

      <b style={{ fontWeight: "bolder" }}>{header}</b>
    </div>
  );
  return (
    <>
      <HeroUICardHeader>
        {externalLinks?.length ? (
          <div className="flex w-full">
            <div className="flex-grow">{cardTitle}</div>
            <div className="flex flex-row-reverse">
              <ExternalLinks links={externalLinks} />
            </div>
          </div>
        ) : (
          cardTitle
        )}
      </HeroUICardHeader>
    </>
  );
};

export const CardHeader = memo(CardHeaderComponent);
