import { createContext, useContext } from "react";
import { DocumentConfiguration } from "../models/Document";
import jacobResumeDocumentConfig from "./static/documents/dcfea758-826f-4b2e-8cb3-9116e76b3d8e.json";
import jacobPastProjectsDocumentConfig from "./static/documents/754cfe8d-e649-4aef-a76d-8a70e2274f2a.json";
import jacobAboutMeDocumentConfig from "./static/documents/7f113c07-36e4-4c15-852d-21943ebfe54e.json";

// TODO API Support
export const getDocumentConfiguration = (id: string) => {
  if (id === "dcfea758-826f-4b2e-8cb3-9116e76b3d8e")
    return jacobResumeDocumentConfig as DocumentConfiguration;
  else if (id === "754cfe8d-e649-4aef-a76d-8a70e2274f2a")
    return jacobPastProjectsDocumentConfig as DocumentConfiguration;
  else if (id === "7f113c07-36e4-4c15-852d-21943ebfe54e")
    return jacobAboutMeDocumentConfig as DocumentConfiguration;
};

const DocumentConfigurationContext = createContext<
  DocumentConfiguration | undefined
>(undefined);

export const DocumentConfigurationContextProvider = (props: {
  children?: JSX.Element | JSX.Element[];
  documentConfigurationId: string;
}) => {
  const { children, documentConfigurationId } = props;

  return (
    <DocumentConfigurationContext.Provider
      value={getDocumentConfiguration(documentConfigurationId)}
    >
      {children}
    </DocumentConfigurationContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentConfigurationContext);
  if (context === undefined)
    console.warn(
      "useDocument MUST be used within a DocumentConfigurationContext. Failure to do so can result in the site not functioning appropriately."
    );
  return context;
};
