import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Tooltip } from "@nextui-org/react";
import { memo, useState } from "react";
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
    | "topStart"
    | "topEnd"
    | "leftStart"
    | "leftEnd"
    | "bottomStart"
    | "bottomEnd"
    | "rightStart"
    | "rightEnd";
}

export const ButtonLinkComponent = ({
  href,
  tooltip,
  icon,
  placement = "bottomStart",
}: ButtonLinkProps) => {
  const [showTooltip, setTooltip] = useState(false);

  return (
    <Tooltip content={tooltip} visible={showTooltip} placement={placement}>
      <Link href={href}>
        <div
          onMouseOver={() => setTooltip(true)}
          onMouseOut={() => setTooltip(false)}
        >
          {icon ? <FontAwesomeIcon icon={icon} size="xl" /> : href}
        </div>
      </Link>
    </Tooltip>
  );
};

export const ButtonLink = memo(ButtonLinkComponent);
