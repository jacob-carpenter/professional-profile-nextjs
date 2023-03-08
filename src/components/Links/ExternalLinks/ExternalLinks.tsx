import { Grid, Link, Tooltip } from "@nextui-org/react";
import { memo } from "react";
import { v4 } from "uuid";
import { SocialMediaLink } from "../SocialMediaLinks/SocialMediaLink";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ExternalLinksComponentProps {
  links: string[];
}

const ExternalLinksComponent = ({
  links = [],
}: ExternalLinksComponentProps) => {
  if (links.length === 1)
    return <SocialMediaLink href={links[0]} gutterRight={false} />;
  return (
    <Tooltip
      trigger="click"
      placement={"leftStart"}
      content={
        <Grid.Container gap={1}>
          {links.map((link, index) => (
            <Grid key={v4()} css={{ height: "36px" }}>
              <SocialMediaLink
                href={link}
                gutterRight={index + 1 === links.length}
              />
            </Grid>
          ))}
        </Grid.Container>
      }
    >
      <Link>
        <FontAwesomeIcon icon={faLink} size="xl" />
      </Link>
    </Tooltip>
  );
};

export const ExternalLinks = memo(ExternalLinksComponent);
