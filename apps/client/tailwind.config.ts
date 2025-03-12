import typography from "@tailwindcss/typography"
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      boxShadow: {
        tabs: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
        input: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        black: {
          DEFAULT: "#18181B",
          secondary: "#71717A",
        },
        gray: "#E4E4E7",
        white: {
          DEFAULT: "#FFFFFF",
          dark: "#FAFAFA",
          light: "#F4F4F5",
        },
        purple: {
          DEFAULT: "#6366F1",
        },
        base: {
          logo: "var(--logo-base)",
          border: "var(--border)",
          input: "var(--input)",
          background: "var(--background)",
          foreground: "var(--foreground)",
          muted: "var(--muted)",
          "muted-foreground": "var(--muted-foreground)",
          primary: "var(--primary)",
          "primary-foreground": "var(--primary-foreground)",
          secondary: "var(--secondary)",
          "secondary-foreground": "var(--secondary-foreground)",
          
        },
        error: "var(--error)",
        link: "var(--link)",
        banner: {
          error: "var(--banner-error)",
          "error-foreground": "var(--banner-error-foreground)",
        },
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
          hover: "var(--card-hover)",
        },
      
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        foreground: "var(--foreground)",
       
     
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
      
        ring: "var(--ring)",
      
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          foreground: "var(--sidebar-foreground)",
          background: "var(--sidebar-background)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
        },
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [typography],
}

export default config
