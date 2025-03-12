import { classed } from "@tw-classed/react";

const BannerBase = classed.div(
  "rounded-md p-4",
);

const BannerLabel = classed.span("font-inter font-normal ", {
  variants: {
    variant: {
      error: "text-banner-error opacity-90",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
    }
  },
  defaultVariants: {
    variant: "error",
    size: "xs",
  },
});

const BannerComponent = classed(BannerBase, {
  variants: {
    variant: {
      error: "bg-banner-error-foreground border border-banner-error",
    },
  },
  defaultVariants: {
    variant: "error",
  },
});

const Banner = {
  displayName: "Banner",
  Base: BannerComponent,
  Label: BannerLabel,
};

export { Banner };
