import { memo } from "react";
import { withDefaults } from "../../utils/withDefaults";
import { Fixed } from "../Fixed/Fixed";
import { SideBar } from "../SideBar/SideBar";
import { useIsDarkTheme } from "../../hooks/useIsDarkTheme";
import { useMobile, useResponsive } from "../../utils/useMobile";

export interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainerComponent = ({ children }: PageContainerProps) => {
  const isDark = useIsDarkTheme();
  const { columnMaxSpan: maxSpan } = useResponsive();
  const columnMaxSpan = maxSpan * 2; // Using double the span for more columns
  
  const isMobile = useMobile();
  const sideBarSpan = isMobile ? 0 : Math.max(Math.floor(columnMaxSpan / 4), 2);
  return (
    <main
      id="main-container"
      className="relative pb-9 min-h-[calc(100vh-76px)] p-0 m-0 max-w-full flex"
      style={{
        backgroundColor: isDark ? "rgb(60, 60, 60)" : "rgb(200, 200, 200)",
      }}
    >
      <div className={`flex w-full p-0 md:pt-4 gap-0 grid grid-cols-${columnMaxSpan}`}>
        {!isMobile && (
        <div >
          <Fixed
          className={`col-span-${sideBarSpan}`}
            css={{
              maxHeight: "calc(100vh - 4rem)",
              overflow: "auto",
              display: "block",
              zIndex: "$2",
              pb: "$28",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              height: "100%",
              padding: "0px"
            }}
            offset={64}
          >
            <SideBar />
          </Fixed>
        </div>)
        }
        <div className={`max-w-full min-h-full overflow-auto mt-4 pl-6 col-span-${columnMaxSpan - sideBarSpan}`}>
          {children}
        </div>
      </div>
    </main>
  );
};

export const PageContainer = withDefaults(memo(PageContainerComponent), {});
