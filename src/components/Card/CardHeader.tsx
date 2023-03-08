import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Grid, Spacer } from "@nextui-org/react";
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
    <>
      {iconComponent ? (
        <>
          {iconComponent}
          <Spacer />
        </>
      ) : undefined}

      <b style={{ fontWeight: "bolder" }}>{header}</b>
    </>
  );
  return (
    <>
      <Card.Header>
        {externalLinks?.length ? (
          <Grid.Container gap={0}>
            <Grid xs={10}>{cardTitle}</Grid>
            <Grid xs={2} css={{ flexDirection: "row-reverse" }}>
              <ExternalLinks links={externalLinks} />
            </Grid>
          </Grid.Container>
        ) : (
          cardTitle
        )}
      </Card.Header>
    </>
  );
};

export const CardHeader = memo(CardHeaderComponent);
