import { Card as NextUICard, Grid } from "@nextui-org/react";
import { memo } from "react";
import { HistoryEventCardHeader } from "./HistoryEventCardHeader";
import { v4 } from "uuid";
import {
  HistoryCard as HistoryCardType,
} from "../../models/Document";
import { HistoryEventCard } from "./HistoryEventCard";
import dompurify from "dompurify";

const HistoryCardComponent = (cardConfiguration: HistoryCardType) => {
  const { body, details } = cardConfiguration;
  return (
    <NextUICard>
      <HistoryEventCardHeader {...cardConfiguration} />
      {body || cardConfiguration.events ? (
        <>
          <NextUICard.Divider />
          <NextUICard.Body>
            {body}
            <Grid.Container gap={1}>
              {cardConfiguration.events?.map((historyEvent) => (
                <Grid key={v4()} xs={12}>
                  <HistoryEventCard {...historyEvent} />
                </Grid>
              ))}
            </Grid.Container>
          </NextUICard.Body>
          {details?.length ? (
            <>
              <NextUICard.Divider />
              <NextUICard.Footer>
                <Grid.Container>
                  {details?.map((eventDetail) => (
                    <Grid xs={12} key={v4()} css={{ paddingLeft: "24px" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: dompurify.sanitize(eventDetail),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid.Container>
              </NextUICard.Footer>
            </>
          ) : undefined}
        </>
      ) : undefined}
    </NextUICard>
  );
};

export const HistoryCard = memo(HistoryCardComponent);
