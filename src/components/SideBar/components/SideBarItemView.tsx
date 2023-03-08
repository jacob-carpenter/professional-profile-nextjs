import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Link } from "@nextui-org/react";
import { useRouter } from "next/router";
import * as React from "react";
import { memo } from "react";
import { ChevronDown, ChevronRight, Iconly } from "react-iconly";
import { IconType } from "../../../models/Route";
import { isRouteSelected } from "../../../utils/routeUtilities";
import { withDefaults } from "../../../utils/withDefaults";

interface PlaceElementProps {
  children?: JSX.Element | (JSX.Element | string)[];
  placement?: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };
}

const PlaceElement = ({ children, placement }: PlaceElementProps) => {
  return (
    <span
      style={{
        position:
          placement?.top ||
          placement?.bottom ||
          placement?.right ||
          placement?.left
            ? "relative"
            : undefined,
        top: placement?.top ? `${placement.top}px` : undefined,
        bottom: placement?.bottom ? `${placement.bottom}px` : undefined,
        right: placement?.right ? `${placement.right}px` : undefined,
        left: placement?.left ? `${placement.left}px` : undefined,
      }}
    >
      {children}
    </span>
  );
};

export interface SideBarItemViewProps {
  title: string;
  icon?: string;
  iconType?: IconType;
  level: number;
  expanded: boolean;
  onExpand: () => void;
  path?: string;
  link?: string;
  hasSubContent: boolean;
  children?: JSX.Element;
}

const SideBarItemViewComponent = (props: SideBarItemViewProps) => {
  const {
    level,
    title,
    icon,
    iconType,
    children,
    expanded,
    onExpand,
    path,
    link,
    hasSubContent,
  } = props;
  const router = useRouter();

  const href = link || `/${path}`;
  const color = isRouteSelected(path, router.asPath) ? "secondary" : "text";

  return (
    <>
      <Text h3={level === 0} h6={level === 1} color={color}>
        <Link color={color} isExternal={!!link} href={href}>
          {icon ? (
            <PlaceElement placement={{ right: 4, top: 3 }}>
              {iconType === "fontawesome" ? (
                <FontAwesomeIcon icon={icon as IconProp} size="xl" />
              ) : (
                <Iconly name={icon} set="bold" size="medium" />
              )}
              {"  "}
            </PlaceElement>
          ) : undefined}
          {`${title}`}
        </Link>

        {hasSubContent ? (
          <>
            {" "}
            <PlaceElement placement={{ left: 4, top: 4 }}>
              <span onClick={onExpand}>
                {expanded ? <ChevronDown /> : <ChevronRight />}
              </span>
            </PlaceElement>
          </>
        ) : undefined}
      </Text>
      {children}
    </>
  );
};

export const SideBarItemView = withDefaults(memo(SideBarItemViewComponent), {});
