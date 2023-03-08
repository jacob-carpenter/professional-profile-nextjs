import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Grid, Spacer } from "@nextui-org/react";
import { memo } from "react";
import { Iconly } from "react-iconly";
import { IconType } from "../../models/Route";

interface HistoryEventCardHeaderComponentProps {
  header?: string;
  icon?: string;
  iconPrefix?: string;
  iconType?: IconType;
  headerSuffix?: string | JSX.Element | JSX.Element[];
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
      <Card.Header>
        <Grid.Container gap={1}>
          <Grid
            xs={headerSuffix ? 6 : 12}
            md={headerSuffix ? 8 : 12}
            lg={headerSuffix ? 9 : 12}
            xl={headerSuffix ? 10 : 12}
          >
            {iconComponent ? (
              <>
                {iconComponent}
                <Spacer />
              </>
            ) : undefined}
            <b style={{ fontWeight: "bolder" }}>{header}</b>
          </Grid>
          {headerSuffix ? (
            <Grid
              xs={6}
              md={4}
              lg={3}
              xl={2}
              css={{ flexDirection: "row-reverse" }}
            >
              {headerSuffix}
            </Grid>
          ) : undefined}
        </Grid.Container>
      </Card.Header>
    </>
  );
};

export const HistoryEventCardHeader = memo(HistoryEventCardHeaderComponent);
