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
import { useMobile } from "../../../utils/useMobile";

const DocumentEntityComponent = (entity: DocumentEntityType) => {
  const isMobile = useMobile();
  const indentPadding = isMobile ? "pl-8" : "pl-16";
  const { indent } = entity;
  switch (entity.type) {
    case "Card":
      const cardConfiguration = entity as CardType;
      const { xs = 12, sm, md, lg, xl } = cardConfiguration;
      // Convert grid sizes to Tailwind widths
      const getWidthClass = () => {
        const classes = [];
        // xs is base (mobile first)
        if (xs) classes.push(`w-full`); // default to full width, can be refined
        if (sm) classes.push(`sm:w-${Math.floor((sm / 12) * 100)}%`);
        if (md) classes.push(`md:w-${Math.floor((md / 12) * 100)}%`);
        if (lg) classes.push(`lg:w-${Math.floor((lg / 12) * 100)}%`);
        if (xl) classes.push(`xl:w-${Math.floor((xl / 12) * 100)}%`);
        return classes.join(" ") || "w-full";
      };
      return (
        <div
          key={v4()}
          className={`${getWidthClass()} ${indent ? indentPadding : ""}`}
        >
          <Card {...cardConfiguration} />
        </div>
      );
    case "Divider":
      const dividerConfiguration = entity as DividerType;
      return (
        <div key={v4()} className="w-full">
          <Divider {...dividerConfiguration} />
        </div>
      );
    case "ParentEntity":
      const parentEntity = entity as ParentEntity;
      return (
        <div
          key={v4()}
          className={`w-full ${indent ? indentPadding : ""}`}
        >
          <div className="flex flex-wrap gap-1">
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
          className={`w-full ${indent ? indentPadding : ""}`}
        >
          <HistoryCard {...historyCardConfiguration} />
        </div>
      );
    default:
      return <></>;
  }
};

export const DocumentEntity = memo(DocumentEntityComponent);
