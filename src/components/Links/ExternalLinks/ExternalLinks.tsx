import { Link, Tooltip } from "@heroui/react";
import { memo } from "react";
import { v4 } from "uuid";
import { SocialMediaLink } from "../SocialMediaLinks/SocialMediaLink";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "../../Icons/FontAwesomeIcon";

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
      placement={"left-start"}
      content={
        <div className="flex gap-1">
          {links.map((link, index) => (
            <div key={v4()} className="h-9">
              <SocialMediaLink
                href={link}
                gutterRight={index + 1 === links.length}
              />
            </div>
          ))}
        </div>
      }
    >
      <Link>
        <FontAwesomeIcon icon={faLink} size="xl" />
      </Link>
    </Tooltip>
  );
};

export const ExternalLinks = memo(ExternalLinksComponent);
