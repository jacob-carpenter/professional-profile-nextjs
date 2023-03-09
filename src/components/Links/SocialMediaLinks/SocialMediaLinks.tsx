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
          const isLastEntry = index + 1 === entries.length;
          const paddingRight = isMobile ? "8px" : "24px";
          return (
            <span
              key={v4()}
              style={{ paddingRight: !isLastEntry ? paddingRight : "" }}
            >
              <SocialMediaLink href={entry[1]} />
            </span>
          );
        })}
    </>
  );
};

export const SocialMediaLinks = memo(SocialMediaLinksComponent);
