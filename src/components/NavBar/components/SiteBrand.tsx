import { Avatar } from "@heroui/react";
import { memo } from "react";
import { useSiteConfiguration } from "../../../content/useSiteConfiguration";

const SiteBrandComponent = () => {
  const { siteSettings } = useSiteConfiguration();
  const { avatarImageSrc, name: siteTitle, role } = siteSettings;

  return (
    <div className="flex items-center gap-2">
      <Avatar
        radius="sm"
        src={avatarImageSrc}
        size="lg"
        name={siteTitle}
        isBordered
      />
      <div className="flex flex-col p-2">
        <h3 className="font-bold text-lg relative top-3">
          {siteTitle}
        </h3>
        <p className="text-sm pl-10 relative -top-1">
          {role}
        </p>
      </div>
    </div>
  );
};

export const SiteBrand = memo(SiteBrandComponent);
