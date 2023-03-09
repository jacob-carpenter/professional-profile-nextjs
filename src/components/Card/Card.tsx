import { Card as NextUICard, Grid } from "@nextui-org/react";
import { memo } from "react";
import { CardHeader } from "./CardHeader";
import { Card as CardType } from "../../models/Document";
import dompurify from "dompurify";
import { v4 } from "uuid";

const CardComponent = (
  props: {
    children?: JSX.Element | JSX.Element[];
  } & CardType
) => {
  const { body, children, details } = props;
  return (
    <>
      <NextUICard>
        <CardHeader {...props} />
        {body || children ? (
          <>
            <NextUICard.Divider />
            <NextUICard.Body>
              <span
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(body),
                }}
              />
              {children}
            </NextUICard.Body>
          </>
        ) : undefined}
        {details?.length ? (
          <>
            <NextUICard.Divider />
            <NextUICard.Footer>
              <Grid.Container>
                {details?.map((eventDetail) => (
                  <Grid key={v4()} xs={12} css={{ paddingLeft: "24px" }}>
                    <span
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
      </NextUICard>
    </>
  );
};

export const Card = memo(CardComponent);
