import { Entity } from "./Entity";

interface DisplaySettings {
  showInMobile?: boolean;
  show?: boolean;
}

export type IconType = "fontawesome" | "iconly";

export interface Route {
  isHomePage?: boolean;
  title: string;
  navigationBarDisplaySettings?: DisplaySettings;
  sideBarDisplaySettings?: DisplaySettings;
  children?: Route[];
  iconPrefix?: string;
  icon?: string;
  iconType?: IconType;
}

export interface Page extends Route {
  path: string;
}

export interface DocumentPage extends Page {
  documentConfigurationId: string;
}

export interface ComponentPage extends Page {
  // TODO if document, then children need to be auto-determined if they aren't statically defined
  // TODO Support direct document navigation based on path/link click
  content: JSX.Element | Document;
}

export interface Link extends Route {
  link?: string;
}

export interface RouteConfiguration extends Entity {
  routes: (Page | Link)[];
}
