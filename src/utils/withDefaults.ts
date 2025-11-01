import React from "react";

export const withDefaults = <P, DP extends Partial<P> = Partial<P>>(
  component: React.ComponentType<P>,
  defaultProps: DP
) => {
  type Props = Partial<DP> & Omit<P, keyof DP>;

  // Return a wrapper component that merges default props
  const ComponentWithDefaults: React.FC<Props> = (props) => {
    const mergedProps = { ...defaultProps, ...props } as P;
    return React.createElement(component, mergedProps);
  };

  // Preserve display name for debugging
  ComponentWithDefaults.displayName =
    component.displayName || component.name || 'ComponentWithDefaults';

  return ComponentWithDefaults as React.ComponentType<Props>;
};
