import {
  findIconDefinition,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import { getDocumentConfiguration } from "../content/useDocument";
import { DocumentEntityType, ParentEntity } from "../models/Document";
import { DocumentPage, Route } from "../models/Route";

// TODO Should add a failsafe the recursive functions to prevent infinite recursion
const getAllFontAwesomeIcons = (sections: DocumentEntityType[] = []) => {
  let requiredFontAwesomeIcons = [];
  sections
    .filter((section) => section.iconType === "fontawesome" && section.icon)
    .forEach((section) => {
      requiredFontAwesomeIcons.push(
        findIconDefinition({
          prefix: section.iconPrefix as IconPrefix,
          iconName: section.icon as IconName,
        })
      );
    });

  sections
    .filter((section) => (section as ParentEntity).children)
    .forEach((section) => {
      requiredFontAwesomeIcons = requiredFontAwesomeIcons.concat(
        getAllFontAwesomeIcons((section as ParentEntity).children)
      );
    });
  return requiredFontAwesomeIcons;
};

export const getAllFontAwesomeIconsForRoutes = (routes: Route[] = []) => {
  let requiredFontAwesomeIcons = [];
  routes
    .filter((route) => route.iconType === "fontawesome" && route.icon)
    .forEach((route) => {
      requiredFontAwesomeIcons.push(
        findIconDefinition({
          prefix: route.iconPrefix as IconPrefix,
          iconName: route.icon as IconName,
        })
      );
    });
  routes
    .filter((route) => (route as DocumentPage).documentConfigurationId)
    .forEach((route) => {
      const { document } = getDocumentConfiguration(
        (route as DocumentPage).documentConfigurationId
      );
      requiredFontAwesomeIcons = requiredFontAwesomeIcons.concat(
        getAllFontAwesomeIcons(document.sections)
      );
    });

  return requiredFontAwesomeIcons.filter((icon) => icon);
};
