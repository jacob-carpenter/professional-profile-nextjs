import { Avatar, Container, Text } from "@nextui-org/react";
import { memo } from "react";
import { useSiteConfiguration } from "../../../content/useSiteConfiguration";

const SiteBrandComponent = () => {
  const { siteSettings } = useSiteConfiguration();
  const { avatarImageSrc, name: siteTitle, role } = siteSettings;

  return (
    <>
      <Avatar squared zoomed src={avatarImageSrc} size="xl" text={siteTitle} />
      <Container css={{ padding: "8px" }}>
        <Text h3 b css={{ position: "relative", top: "12px" }}>
          {siteTitle}
        </Text>
        <Text css={{ paddingLeft: "40px", top: "-4px", position: "relative" }}>
          {role}
        </Text>
      </Container>
    </>
  );
};

export const SiteBrand = memo(SiteBrandComponent);
