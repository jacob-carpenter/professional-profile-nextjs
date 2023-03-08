import * as React from "react";
import { styled, CSS } from "@nextui-org/react";
import { withDefaults } from "../../utils/withDefaults";
import { memo } from "react";

export interface FixedProps {
  offset?: number;
  shadow?: boolean;
  className?: string;
  css?: CSS;
  children?: React.ReactNode;
}

const defaultProps = {
  offset: 0,
  shadow: false,
  className: "",
};

const StyledFixed = styled("div", {
  background: "transparent",
  position: "fixed",
  zIndex: "$max",
  variants: {
    shadow: {
      true: {
        bs: "$sm",
      },
    },
  },
});

const FixedComponent: React.FC<FixedProps> = ({
  offset,
  children,
  shadow,
  css,
}) => {
  return (
    <StyledFixed css={{ ...css, top: offset || 0 }} shadow={shadow}>
      {children}
    </StyledFixed>
  );
};

const MemoFixed = memo(FixedComponent);

export const Fixed = withDefaults(MemoFixed, defaultProps);
