import { Entity } from "./Entity";

export interface BasicSiteInformation {
  name: string;
  role: string;
  avatarImageSrc: string;
  siteSource: string;
  routeConfigurationId: string;
  socialMediaLinks: { [key: string]: any };
}

export interface SiteConfiguration extends Entity {
  siteSettings: BasicSiteInformation;
}
