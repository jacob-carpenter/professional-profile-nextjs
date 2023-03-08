import { Grid } from "@nextui-org/react";
import { v4 } from "uuid";
import { memo } from "react";
import { useDocument } from "../../../content/useDocument";
import { DocumentConfiguration } from "../../../models/Document";
import { DocumentEntity } from "./DocumentEntityComponent";

interface DocumentPageContentComponentProps {
  document?: DocumentConfiguration;
}

const DocumentPageContentComponent = ({
  document: providedDocument,
}: DocumentPageContentComponentProps) => {
  const defaultDocument = useDocument();
  let resolvedDocument = providedDocument ? providedDocument : defaultDocument;

  const documentComponents = resolvedDocument.document.sections?.map(
    (section) => <DocumentEntity key={v4()} {...section} />
  );
  return <Grid.Container gap={2}>{documentComponents}</Grid.Container>;
};

export const DocumentPageContent = memo(DocumentPageContentComponent);
