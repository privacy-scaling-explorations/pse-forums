import { classed } from "@tw-classed/react";

const PageTitle = classed.h1(
  "font-inter text-[24px] lg:text-[30px] lg:leading-[36px] text-foreground font-bold",
);

const PageDescription = classed.span(
  "font-inter text-sm text-base-muted-foreground font-normal",
);

const Labels = {
  displayName: "Labels",
  PageTitle,
  PageDescription,
};

export { Labels };
