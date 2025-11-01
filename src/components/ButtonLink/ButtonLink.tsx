import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";
import { Link, Tooltip } from "@heroui/react";
import { memo } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonLinkProps {
  href: string;
  tooltip?: string;
  icon: IconDefinition;
  placement?:
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "top-start"
    | "top-end"
    | "left-start"
    | "left-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end";
}

export const ButtonLinkComponent = ({
  href,
  tooltip,
  icon,
  placement = "bottom-start",
}: ButtonLinkProps) => {
  return (
    <Tooltip content={tooltip} placement={placement}>
      <Link href={href} isExternal>
        {icon ? <FontAwesomeIcon icon={icon} size="xl" /> : href}
      </Link>
    </Tooltip>
  );
};

export const ButtonLink = memo(ButtonLinkComponent);
