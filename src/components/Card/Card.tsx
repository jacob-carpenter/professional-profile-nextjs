import { Card as HeroUICard, CardHeader as HeroUICardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import { memo } from "react";
import { CardHeader } from "./CardHeader";
import { Card as CardType } from "../../models/Document";
import dompurify from "dompurify";
import { v4 } from "uuid";

const CardComponent = (
  props: {
    children?: React.ReactNode;
  } & CardType
) => {
  const { body, children, details } = props;
  return (
    <>
      <HeroUICard>
        <CardHeader {...props} />
        {body || children ? (
          <>
            <Divider />
            <CardBody>
              <span
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(body),
                }}
              />
              {children}
            </CardBody>
          </>
        ) : undefined}
        {details?.length ? (
          <>
            <Divider />
            <CardFooter>
              <div className="flex flex-col w-full">
                {details?.map((eventDetail) => (
                  <div key={v4()} className="w-full pl-6">
                    <span
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
      </HeroUICard>
    </>
  );
};

export const Card = memo(CardComponent);
