import { Card as HeroUICard, CardBody, Divider } from "@heroui/react";
import { memo } from "react";
import { HistoryEventCardHeader } from "./HistoryEventCardHeader";
import { v4 } from "uuid";
import { HistoryEvent } from "../../models/Document";
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
      <HeroUICard>
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
            <Divider />
            <CardBody>
              <div className="flex flex-col w-full">
                {details?.map((eventDetail) => (
                  <div key={v4()} className="w-full pl-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dompurify.sanitize(eventDetail),
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardBody>
          </>
        ) : undefined}
      </HeroUICard>
    </>
  );
};

export const HistoryEventCard = memo(HistoryEventCardComponent);
