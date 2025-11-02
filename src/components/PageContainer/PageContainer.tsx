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
  const columnMaxSpan = Math.min(maxSpan * 3, 12); // Using triple the span for more columns
  
  const isMobile = useMobile();
  const sideBarSpan = isMobile ? 0 : Math.max(Math.floor(columnMaxSpan / 4), 2);
  return (
    <main
      id="main-container"
      className="block"
      style={{
        backgroundColor: isDark ? "rgb(60, 60, 60)" : "rgb(200, 200, 200)",
      }}
    >
      <div className={`h-full grid grid-cols-${columnMaxSpan}`}>
        {!isMobile && (
          <div className={`col-span-${sideBarSpan}`}>
            <div className="h-full pl-2">
              <SideBar />
            </div>
          </div>)
        }
        <div className={`mt-8 col-span-${columnMaxSpan - sideBarSpan} pb-6 ${isMobile ? 'px-4' : 'px-6'}`} style={{ minHeight: 'calc(100vh - 97px)' }}>
          {children}
        </div>
      </div>
    </main>
  );
};

export const PageContainer = withDefaults(memo(PageContainerComponent), {});
