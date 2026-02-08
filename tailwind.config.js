export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#4A88EE",
        "brand-blue-1": "#2C8ED5",
        "brand-blue-2": "#1762AA",

        // Layout
        sidebar: "#F3F4F4",
        "sidebar-active": "#EDF4FF",

        // Cards
        "card-info": "#EDF4FF",
        "card-success": "#E9FAF6",
        "card-error": "#FDF4F7",
        "card-warning": "#FEEEEA",

        // Status backgrounds
        "status-active-bg": "#EDF4FF",
        "status-expired-bg": "#FEEEEA",
        "status-rejected-bg": "#FDF4F7",
        "status-warning-bg": "#FEF7EC",
        "status-neutral-bg": "#F9FAFA",

        // Status text
        "status-active": "#366FCC",
        "status-expired": "#E04C24",
        "status-rejected": "#FF3535",
        "status-warning": "#B7720B",
        "status-neutral": "#4F5857",

        // Borders
        "border-active": "#9EC3FF",
        "border-expired": "#F98C6F",
        "border-rejected": "#FFA9A9",
        "border-warning": "#FBE0B7",
        "border-neutral": "#ADB1B1",

        // Misc
        success: "#37C390",
        avatar: "#C6DBFF",
        "avatar-text": "#174288",
      },
      borderRadius: {
        card: "6px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "inter-display": ["Inter Display", "Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
