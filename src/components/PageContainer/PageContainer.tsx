import { memo } from "react";
import { withDefaults } from "../../utils/withDefaults";
import { Fixed } from "../Fixed/Fixed";
import { SideBar } from "../SideBar/SideBar";
import { useIsDarkTheme } from "../../hooks/useIsDarkTheme";

export interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainerComponent = ({ children }: PageContainerProps) => {
  const isDark = useIsDarkTheme();
  return (
    <main
      id="main-container"
      className="relative pb-9 min-h-[calc(100vh-76px)] p-0 m-0 max-w-full flex"
      style={{
        backgroundColor: isDark ? "rgb(60, 60, 60)" : "rgb(200, 200, 200)",
      }}
    >
      <div className="flex w-full p-0 md:pt-4 gap-0">
        <div className="hidden sm:block sm:w-[32%] md:w-[18%] xl:w-[14%]">
          <Fixed
            css={{
              maxHeight: "calc(100vh - 4rem)",
              overflow: "auto",
              zIndex: "$2",
              pb: "$28",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              height: "100%",
              padding: "0px",
              "@md": {
                width: "19%",
              },
              "@xl": {
                width: "14%",
              },
            }}
            offset={76}
          >
            <SideBar />
          </Fixed>
        </div>
        <div className="max-w-full min-h-full overflow-auto mt-9 p-0 sm:pl-6 xl:pl-9 flex-1">
          {children}
        </div>
      </div>
    </main>
  );
};

export const PageContainer = withDefaults(memo(PageContainerComponent), {});
