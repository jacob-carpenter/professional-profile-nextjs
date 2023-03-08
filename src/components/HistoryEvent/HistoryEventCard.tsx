import { Card as NextUICard, Grid } from "@nextui-org/react";
import { memo } from "react";
import { HistoryEventCardHeader } from "./HistoryEventCardHeader";
import { v4 } from "uuid";
import {
  HistoryEvent,
} from "../../models/Document";
import dompurify from "dompurify";

const PRESENT_DATE_REGEX = /present/i;

const translateToDate = (dateString: string | Date) => {
  const providedDateString = (dateString || "").toString();
  if (PRESENT_DATE_REGEX.test(providedDateString))
    return (
      new Date().toLocaleString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + " (Present)"
    );
  else
    return new Date(providedDateString).toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
};

const HistoryEventCardComponent = (historyEvent: HistoryEvent) => {
  const { details } = historyEvent;
  return (
    <>
      <NextUICard isHoverable>
        <HistoryEventCardHeader
          {...historyEvent}
          headerSuffix={
            <>
              {translateToDate(historyEvent.startDate)}
              {" - "}
              {translateToDate(historyEvent.endDate)}
            </>
          }
        />
        {details?.length ? (
          <>
            <NextUICard.Divider />
            <NextUICard.Body>
              <Grid.Container>
                {details?.map((eventDetail) => (
                  <Grid xs={12} key={v4} css={{ paddingLeft: "24px" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dompurify.sanitize(eventDetail),
                      }}
                    />
                  </Grid>
                ))}
              </Grid.Container>
            </NextUICard.Body>
          </>
        ) : undefined}
      </NextUICard>
    </>
  );
};

export const HistoryEventCard = memo(HistoryEventCardComponent);
