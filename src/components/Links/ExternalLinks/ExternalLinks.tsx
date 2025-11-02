import { Link, Tooltip } from "@heroui/react";
import { memo, useState } from "react";
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
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  let toolTipCloseProcess: NodeJS.Timeout | undefined = undefined;
  const closeTooltip = () => toolTipCloseProcess = setTimeout(() => setIsTooltipOpen(false), 700);
  const openTooltip = () => {
    if (toolTipCloseProcess) {
      clearTimeout(toolTipCloseProcess);
      toolTipCloseProcess = undefined;
    }
    setIsTooltipOpen(true);
  };
  const content = (<div className="flex gap-1" onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
          {links.map((link, index) => (
            <div key={v4()} className="h-9">
              <SocialMediaLink
                href={link}
                gutterRight={index + 1 === links.length}
              />
            </div>
          ))}
        </div>);
  if (links.length === 1)
    return <SocialMediaLink href={links[0]} gutterRight={false} />;
  return (
    <Tooltip
      placement={"left-start"}
      shouldCloseOnBlur={false}
      closeDelay={300}
      content={content}
      isOpen={isTooltipOpen}
    >
      <Link onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
        <FontAwesomeIcon icon={faLink} size="xl" />
      </Link>
    </Tooltip>
  );
};

export const ExternalLinks = memo(ExternalLinksComponent);
