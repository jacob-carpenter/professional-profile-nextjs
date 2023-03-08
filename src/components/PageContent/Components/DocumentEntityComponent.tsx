import { Grid } from "@nextui-org/react";
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
  const indentPadding = isMobile ? "32px" : "64px";
  const { indent } = entity;
  switch (entity.type) {
    case "Card":
      const cardConfiguration = entity as CardType;
      const { xs, sm, md, lg, xl } = cardConfiguration;
      return (
        <Grid
          key={v4()}
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          css={{ paddingLeft: indent ? indentPadding : undefined }}
        >
          <Card {...cardConfiguration} />
        </Grid>
      );
    case "Divider":
      const dividerConfiguration = entity as DividerType;
      return (
        <Grid key={v4()} xs={12}>
          <Divider {...dividerConfiguration} />
        </Grid>
      );
    case "ParentEntity":
      const parentEntity = entity as ParentEntity;
      return (
        <Grid
          key={v4()}
          xs={12}
          css={{ paddingLeft: indent ? indentPadding : undefined }}
        >
          <Grid.Container gap={1}>
            {parentEntity.children.map((childDocumentEntity) => (
              <DocumentEntity key={v4()} {...childDocumentEntity} />
            ))}
          </Grid.Container>
        </Grid>
      );
    case "HistoryCard":
      const historyCardConfiguration = entity as HistoryCardType;
      return (
        <Grid
          key={v4()}
          xs={12}
          css={{ paddingLeft: indent ? indentPadding : undefined }}
        >
          <HistoryCard {...historyCardConfiguration} />
        </Grid>
      );
    default:
      return <></>;
  }
};

export const DocumentEntity = memo(DocumentEntityComponent);
