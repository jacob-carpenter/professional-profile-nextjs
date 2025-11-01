import { Card as HeroUICard, CardBody, CardFooter, Divider } from "@heroui/react";
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
    <HeroUICard>
      <HistoryEventCardHeader {...cardConfiguration} />
      {body || cardConfiguration.events ? (
        <>
          <Divider />
          <CardBody>
            {body}
            <div className="flex flex-col gap-1">
              {cardConfiguration.events?.map((historyEvent) => (
                <div key={v4()} className="w-full">
                  <HistoryEventCard {...historyEvent} />
                </div>
              ))}
            </div>
          </CardBody>
          {details?.length ? (
            <>
              <Divider />
              <CardFooter>
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
              </CardFooter>
            </>
          ) : undefined}
        </>
      ) : undefined}
    </HeroUICard>
  );
};

export const HistoryCard = memo(HistoryCardComponent);
