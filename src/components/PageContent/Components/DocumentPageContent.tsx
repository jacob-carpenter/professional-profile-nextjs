import { v4 } from "uuid";
import { memo } from "react";
import { useDocument } from "../../../content/useDocument";
import { DocumentConfiguration } from "../../../models/Document";
import { DocumentEntity } from "./DocumentEntityComponent";
import { useResponsive } from "../../../utils/useMobile";

interface DocumentPageContentComponentProps {
  document?: DocumentConfiguration;
}

const DocumentPageContentComponent = ({
  document: providedDocument,
}: DocumentPageContentComponentProps) => {
  const defaultDocument = useDocument();
  const { columnMaxSpan } = useResponsive();
  let resolvedDocument = providedDocument ? providedDocument : defaultDocument;

  const documentComponents = resolvedDocument.document.sections?.map(
    (section) => <DocumentEntity key={v4()} {...section} />
  );
  return <div className={`grid grid-cols-${columnMaxSpan} gap-4`}>{documentComponents}</div>;
};

export const DocumentPageContent = memo(DocumentPageContentComponent);
