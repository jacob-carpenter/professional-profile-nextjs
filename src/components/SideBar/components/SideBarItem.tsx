import { Container, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Route } from "../../../models/Route";
import { withDefaults } from "../../../utils/withDefaults";
import { MAX_SIDE_BAR_LEVEL, SideBar } from "../SideBar";
import { SideBarItemView } from "./SideBarItemView";

export interface SideBarItemProps extends Route {
  level: number;
  path?: string;
  gutterBottom?: boolean;
}

const SideBarItemComponent = (props: SideBarItemProps) => {
  const { level, path, children, gutterBottom } = props;

  const router = useRouter();
  const resolvedRouterPath = router.asPath;
  const defaultExpanded = resolvedRouterPath.startsWith(`/${path}`);
  const [expanded, setExpanded] = useState(defaultExpanded);
  useEffect(() => {
    if (expanded !== defaultExpanded) setExpanded(defaultExpanded);
  }, [expanded, defaultExpanded]);

  const showChildren = children?.length && level + 1 <= MAX_SIDE_BAR_LEVEL;

  if (level > MAX_SIDE_BAR_LEVEL) return <></>;
  return (
    <Container color="text">
      <SideBarItemView
        {...props}
        path={path}
        expanded={expanded}
        onExpand={() => setExpanded((open) => !open)}
        hasSubContent={showChildren}
      >
        {expanded && showChildren ? (
          <SideBar level={level + 1} routes={children} />
        ) : undefined}
      </SideBarItemView>
      {gutterBottom ? <Spacer /> : undefined}
    </Container>
  );
};

export const SideBarItem = withDefaults(memo(SideBarItemComponent), {});
