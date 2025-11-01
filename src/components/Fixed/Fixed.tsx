import * as React from "react";
import { withDefaults } from "../../utils/withDefaults";
import { memo } from "react";

export interface FixedProps {
  offset?: number;
  shadow?: boolean;
  className?: string;
  css?: any; // Keep for backwards compatibility but will use inline styles
  children?: React.ReactNode;
}

const defaultProps = {
  offset: 0,
  shadow: false,
  className: "",
};

const FixedComponent: React.FC<FixedProps> = ({
  offset,
  children,
  shadow,
  css,
  className,
}) => {
  return (
    <div
      className={`${className} ${shadow ? "shadow-sm" : ""}`}
      style={{
        background: "transparent",
        position: "fixed",
        zIndex: 9999,
        top: offset || 0,
        ...css,
      }}
    >
      {children}
    </div>
  );
};

const MemoFixed = memo(FixedComponent);

export const Fixed = withDefaults(MemoFixed, defaultProps);
