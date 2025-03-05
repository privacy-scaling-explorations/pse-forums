import { classed } from "@tw-classed/react";

const BannerBase = classed.div(
  "rounded-md p-4",
);

const BannerLabel = classed.span("font-inter font-normal text-xs", {
  variants: {
    variant: {
      error: "text-[#DC2626] opacity-90",
    },
  },
  defaultVariants: {
    variant: "error",
  },
});

const BannerComponent = classed(BannerBase, {
  variants: {
    variant: {
      error: "bg-[#FEE2E2] border border-[#DC2626]",
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
