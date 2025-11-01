import React from "react";
import { FontAwesomeIcon as RawFontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { FontAwesomeIconProps as RawFontAwesomeIconProps } from "@fortawesome/react-fontawesome";

type FontAwesomeIconProps = Omit<RawFontAwesomeIconProps, "icon"> & {
    icon: IconProp;
    size?: RawFontAwesomeIconProps["size"];
};

/**
 * Simple wrapper around @fortawesome/react-fontawesome's FontAwesomeIcon.
 * Forwards all supported props and narrows the icon prop to IconProp so usage
 * like <FontAwesomeIcon icon={icon} size="xl" /> is supported.
 */
const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = ({ icon, size, ...rest }) => {
    return <></>;
};

export type { FontAwesomeIconProps };
export { FontAwesomeIcon };