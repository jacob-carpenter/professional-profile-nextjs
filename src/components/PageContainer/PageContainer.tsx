import { memo, useEffect, useState } from "react";
import { withDefaults } from "../../utils/withDefaults";
import { SideBar } from "../SideBar/SideBar";
import { useIsDarkTheme } from "../../hooks/useIsDarkTheme";
import { useMobile, useResponsive } from "../../utils/useMobile";

export interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainerComponent = ({ children }: PageContainerProps) => {
  const isDark = useIsDarkTheme();
  const isMobile = useMobile();

  return (
    <main
      id="main-container"
      className="block"
      style={{
        backgroundColor: isDark ? "rgb(60, 60, 60)" : "rgb(200, 200, 200)",
      }}
    >
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-[20%_80%]'} min-h-screen`}>
        {!isMobile && (
          <div className={`block w-min-33`}>
            <SideBar />
          </div>)
        }
        <div className={`w-full pb-6 ${isMobile ? 'px-4' : 'px-6'} mt-4`} style={{minHeight: 'calc(100vh - 64px)', overflowY: 'auto'}}>
          {children}
        </div>
      </div>
    </main>
  );
};

export const PageContainer = withDefaults(memo(PageContainerComponent), {});
