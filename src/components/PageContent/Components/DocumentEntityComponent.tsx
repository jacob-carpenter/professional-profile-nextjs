import { memo } from "react";
import { v4 } from "uuid";
import { Divider } from "../../Divider/Divider";
import {
  Divider as DividerType,
  Card as CardType,
  DocumentEntityType,
  ParentEntity,
  HistoryCard as HistoryCardType,
} from "../../../models/Document";
import { Card } from "../../Card/Card";
import { HistoryCard } from "../../HistoryEvent/HistoryCard";
import { useMobile, useResponsive } from "../../../utils/useMobile";

const DocumentEntityComponent = (entity: DocumentEntityType) => {
  const isMobile = useMobile();
  const { columnMaxSpan } = useResponsive()
  const indentPadding = isMobile ? "pl-8" : "pl-16";
  const { indent } = entity;

  switch (entity.type) {
    case "Card":
      const cardConfiguration = entity as CardType;
      const { colSpan } = cardConfiguration;

      // Build responsive grid classes
      const gridClasses = [colSpan ? `col-span-${colSpan}` : "col-span-full"].filter(Boolean)

      return (
        <div
          key={v4()}
          className={`${gridClasses} ${indent ? indentPadding : ""}`}
        >
          <Card {...cardConfiguration} />
        </div>
      );

    case "Divider":
      const dividerConfiguration = entity as DividerType;
      return (
        <div key={v4()} className="col-span-full">
          <Divider {...dividerConfiguration} />
        </div>
      );

    case "ParentEntity":
      const parentEntity = entity as ParentEntity;
      return (
        <div
          key={v4()}
          className={`col-span-full ${indent ? indentPadding : ""}`}
        >
          <div className={`grid grid-cols-${columnMaxSpan} gap-4`}>
            {parentEntity.children.map((childDocumentEntity) => (
              <DocumentEntity key={v4()} {...childDocumentEntity} />
            ))}
          </div>
        </div>
      );

    case "HistoryCard":
      const historyCardConfiguration = entity as HistoryCardType;
      return (
        <div
          key={v4()}
          className={`col-span-full ${indent ? indentPadding : ""}`}
        >
          <HistoryCard {...historyCardConfiguration} />
        </div>
      );

    default:
      return <></>;
  }
};

export const DocumentEntity = memo(DocumentEntityComponent);
