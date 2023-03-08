import { createContext, useContext } from "react";
import { SiteConfiguration } from "../models/SiteConfiguration";
import jacobStaticSiteConfig from "./static/siteConfiguration/2f8346a0-9f48-49ac-9317-c671bebd1415.json";

const SiteConfigurationContext = createContext<SiteConfiguration | undefined>(
  undefined
);

export const SiteConfigurationContextProvider = ({ children, _siteId }) => {
  // TODO load by id from api
  const siteConfiguration = jacobStaticSiteConfig;

  return (
    <SiteConfigurationContext.Provider value={siteConfiguration}>
      {children}
    </SiteConfigurationContext.Provider>
  );
};

export const useSiteConfiguration = () => {
  const context = useContext(SiteConfigurationContext);
  if (context === undefined)
    console.warn(
      "useSiteConfiguration MUST be used within a SiteConfigurationContext. Failure to do so can result in the site not functioning appropriately."
    );
  return context;
};
