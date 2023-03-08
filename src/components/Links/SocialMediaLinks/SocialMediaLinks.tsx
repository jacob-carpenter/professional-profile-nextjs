import { memo } from "react";
import { v4 } from "uuid";
import { useMobile } from "../../../utils/useMobile";
import { SocialMediaLink } from "./SocialMediaLink";

interface SocialMediaLinksComponentProps {
  socialMediaLinks: { [key: string]: string };
}

const SocialMediaLinksComponent = ({
  socialMediaLinks = {},
}: SocialMediaLinksComponentProps) => {
  const isMobile = useMobile();
  return (
    <>
      {Object.entries(socialMediaLinks)
        .filter((_entry, index) => (isMobile && index <= 2) || !isMobile)
        .map((entry, index, entries) => {
          return (
            <SocialMediaLink
              key={v4()}
              href={entry[1]}
              gutterRight={index + 1 !== entries.length}
            />
          );
        })}
    </>
  );
};

export const SocialMediaLinks = memo(SocialMediaLinksComponent);
