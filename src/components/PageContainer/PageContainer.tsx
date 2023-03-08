import { Col, Container, Row, useTheme } from "@nextui-org/react";
import { memo } from "react";
import { withDefaults } from "../../utils/withDefaults";
import { Fixed } from "../Fixed/Fixed";
import { SideBar } from "../SideBar/SideBar";

export interface PageContainerProps {
  children: JSX.Element | JSX.Element[];
}

const PageContainerComponent = ({ children }: PageContainerProps) => {
  const { isDark } = useTheme();
  return (
    <Container
      fluid
      as="main"
      css={{
        position: "relative",
        padding: "0px",
        paddingBottom: "36px",
        backgroundColor: isDark ? "rgb(60, 60, 60)" : "rgb(200, 200, 200)",
        minHeight: "calc(100vh - 76px)",
      }}
      display="flex"
      id="main-container"
    >
      <Row
        css={{
          "@md": {
            pt: "1rem",
          },
          padding: "0px",
        }}
        gap={0}
      >
        <Col
          css={{
            width: "32%",
            display: "none",
            "@sm": {
              display: "block",
            },
            "@md": {
              width: "18%",
            },
            "@xl": {
              width: "14%",
            },
          }}
        >
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
        </Col>
        <Col
          css={{
            maxWidth: "100%",
            minHeight: "100%",
            overflow: "auto",
            mt: "36px",
            "@xsMax": {
              p: 0,
            },
            "@xs": {
              paddingLeft: "0px",
            },
            "@sm": {
              paddingLeft: "24px",
            },
            "@xl": {
              paddingLeft: "36px",
            },
          }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export const PageContainer = withDefaults(memo(PageContainerComponent), {});
