import { memo } from "react";
import { v4 } from "uuid";
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { ButtonLinkComponent } from "../../ButtonLink/ButtonLink";
import { Spacer } from "@nextui-org/react";

const gitHubRegex = /^(http(s?):\/\/)?(www\.)?github\.([a-z])+/;
const linkedinRegex =
  /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/;
const twitterRegex =
  /^(http(s?):\/\/)?(www\.)?twitter\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/;

interface SocialMediaLinkComponentProps {
  href: string;
  gutterRight?: boolean;
}

export const getLinkInfo = (link: string) => {
  if (gitHubRegex.test(link))
    return {
      icon: faGithub,
      tooltip: "GitHub",
    };
  if (linkedinRegex.test(link))
    return {
      icon: faLinkedin,
      tooltip: "LinkedIn",
    };
  if (twitterRegex.test(link))
    return {
      icon: faTwitter,
      tooltip: "Twitter",
    };
};

const SocialMediaLinkComponent = ({
  href,
  gutterRight = false,
}: SocialMediaLinkComponentProps) => {
  const linkInfo = getLinkInfo(href);

  return (
    <>
      <ButtonLinkComponent
        key={v4()}
        href={href}
        icon={linkInfo?.icon}
        tooltip={linkInfo?.tooltip}
      />
      {gutterRight ? <Spacer /> : undefined}
    </>
  );
};

export const SocialMediaLink = memo(SocialMediaLinkComponent);
