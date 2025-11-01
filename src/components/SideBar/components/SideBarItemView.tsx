import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "../../Icons/FontAwesomeIcon";
import { Link } from "@heroui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { memo } from "react";
import { ChevronDown, ChevronRight, Iconly } from "react-iconly";
import { IconType } from "../../../models/Route";
import { isRouteSelected } from "../../../utils/routeUtilities";
import { withDefaults } from "../../../utils/withDefaults";

interface PlaceElementProps {
  children?: React.ReactNode;
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
  children?: React.ReactNode;
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
  const isActive = isRouteSelected(path, router.asPath || '');

  return (
    <>
      <div className={`${level === 0 ? 'text-xl font-bold' : level === 1 ? 'text-base font-semibold' : 'text-sm'} ${isActive ? 'text-primary' : ''}`}>
        <Link isExternal={!!link} href={href}>
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
      </div>
      {children}
    </>
  );
};

export const SideBarItemView = withDefaults(memo(SideBarItemViewComponent), {});
