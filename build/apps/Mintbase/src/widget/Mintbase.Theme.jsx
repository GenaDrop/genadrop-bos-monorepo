const cssFont1 = fetch(
  "https://db.onlinewebfonts.com/c/c6c5adbec699cf554168a629860235fd?family=AUTHENTIC+Sans+130"
).body;
const cssFont2 = fetch(
  "https://db.onlinewebfonts.com/c/e0542aecb0b20747567797e7f1121626?family=AUTHENTIC+Sans+90"
).body;
const colors = {
  brand: [
    {
      label: "mb-blackblue",
      hex: "#070C2B",
    },
    {
      label: "mb-red",
      hex: "#FF2424",
    },
    {
      label: "mb-red-35",
      hex: "#3A1C2A",
    },
    {
      label: "mb-red-15",
      hex: "#FFDEDE",
    },
    {
      label: "mb-blackblue",
      hex: "#070C2B",
    },
  ],
  neutral: [
    {
      label: "gray-900",
      hex: "#101223",
    },
    {
      label: "gray-850",
      hex: "#1E2030",
    },
    {
      label: "gray-800",
      hex: "#282A3A",
    },
    {
      label: "gray-700",
      hex: "#404252",
    },
    {
      label: "gray-600",
      hex: "#5B5D6B",
    },
    {
      label: "gray-500",
      hex: "#777986",
    },
    {
      label: "gray-400",
      hex: "#9496A1",
    },
    {
      label: "gray-300",
      hex: "#B3B5BD",
    },
    {
      label: "gray-200",
      hex: "#D2D4DA",
    },
    {
      label: "gray-150",
      hex: "#E8EAF0",
    },
    {
      label: "gray-100",
      hex: "#F3F4F8",
    },
    {
      label: "gray-50",
      hex: "#F9F9F9",
    },
  ],
  actions: [
    {
      label: "blue-300",
      hex: "#4F58A3",
    },
    {
      label: "blue-300-35",
      hex: "#C2C5DD",
    },
    {
      label: "blue-300-15",
      hex: "#EBEDFB",
    },
    {
      label: "blue-100",
      hex: "#C5D0FF",
    },
    {
      label: "blue-100-35",
      hex: "#3F4254",
    },
    {
      label: "blue-100-15",
      hex: "#2B2E42",
    },
  ],
  additional: [
    {
      label: "purple-300",
      hex: "#8C4FE5",
    },
    {
      label: "purple-100",
      hex: "#E087FF",
    },
    {
      label: "orange-300",
      hex: "#FF6C3B",
    },
    {
      label: "orange-100",
      hex: "#FF9470",
    },
  ],
  state: [
    {
      label: "success-300",
      hex: "#0A7D6C",
    },
    {
      label: "success-100",
      hex: "#9FED8F",
    },
    {
      label: "warning-300",
      hex: "#F2D413",
    },
    {
      label: "warning-100",
      hex: "#FFE855",
    },
    {
      label: "error-300",
      hex: "#C74C4C",
    },
    {
      label: "error-100",
      hex: "#ED5A5A",
    },
  ],
};
const cssColors = `${cssFont1} 
                   ${cssFont2} 
                  `;
Object.keys(colors).map((key) =>
  colors[key].map((color) => (cssColors += `--${color.label}:${color.hex};`))
);
const typographyClasses = {
  "display-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 35px;
        line-height: 38px;
        @media (min-width: 480px) {
                font-size: 48px; 
                line-height: 50px;
        }
    `,
  "display-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 29px;
        line-height: 38px;
        @media (min-width: 480px) {
                font-size: 35px;        
                line-height: 50px;
        }
    `,
  "heading-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 29px;
        line-height: 34px;
        @media (min-width: 480px) {
                font-size: 35px;  line-height: 38px;
        }
    `,
  "heading-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 29px;
        line-height: 34px;
        @media (min-width: 480px) {
                font-size: 35px;
                line-height: 38px;        
        }
    `,
  "h1-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif; 
        font-size: 24px; 
        @media (min-width: 480px) {
                font-size: 29px; 
                line-height: 32px;
        }
    `,
  "h1-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 24px; line-height: 28px;
        @media (min-width: 480px) {
            .sm\:text-29 {
                font-size: 29px; line-height: 32px;
            }
        }
    `,
  "h2-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 20px;
        line-height: 22px;
        @media (min-width: 480px) {
                font-size: 24px;
                line-height: 24px;
        }
    `,
  "h2-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 20px;
        line-height: 22px;
        @media (min-width: 480px) {
            line-height: 24px;
        font-size: 24px;}
    `,
  "h3-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 17px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 20px;
                line-height: 22px;
        }
    `,
  "h3-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 17px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 20px;
                line-height: 22px;
        }
    `,
  "p-sub-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 16px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 18px;
                line-height: 22px;
        }
    `,
  "p-sub-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 16px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 18px;
                line-height: 22px;
        }
    `,
  "p-big-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 14px;
        line-height: 16px;
        @media (min-width: 480px) {
                font-size: 16px;
                line-height: 16px;
        }
    `,
  "p-big-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
            font-size: 14px;
        line-height: 16px;
        @media (min-width: 480px) {
                font-size: 16px;
                line-height: 16px;
        }
    `,
  "p-med-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 12px;
        line-height: 14px;
        @media (min-width: 480px) {
                font-size: 14px;
                line-height: 16px;
        }
    `,
  "p-med-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 12px;
        line-height: 14px;
        @media (min-width: 480px) {
                font-size: 14px;
                line-height: 16px;
        }
    `,
  "p-small-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 10px;
        line-height: 12px;
        @media (min-width: 480px) {
                font-size: 12px;
                line-height: 14px;
        }
    `,
  "p-small-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 10px;
        line-height: 12px;
        @media (min-width: 480px) {
                font-size: 12px;
                line-height: 14px;
        }
    `,
  "cap-big-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 9px;
        line-height: 12px;
        @media (min-width: 480px) {
          font-size: 10px;
          line-height: 12px;
        }
      `,
  "cap-big-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 9px;
        line-height: 12px;
        @media (min-width: 480px) {
          font-size: 10px;
          line-height: 12px;
        }
      `,
  "cap-med-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 8px;
        line-height: 10px;
        @media (min-width: 480px) {
          font-size: 9px;
          line-height: 11px;
        }
      `,
  "cap-med-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 8px;
        line-height: 10px;
        @media (min-width: 480px) {
          font-size: 9px;
          line-height: 11px;
        }
      `,
  "cap-small-130": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 8px;
        line-height: 10px;
      `,
  "cap-small-90": `
        font-family: "AUTHENTIC Sans 90", sans-serif;
        font-size: 8px;
        line-height: 10px;
      `,
  "action-cap": `
        font-family: "AUTHENTIC Sans 130", sans-serif;
        font-size: 10px;
        line-height: 12px;
        text-transform: uppercase;
      `,
};
const getFontType = (size) => {
  switch (size) {
    case "big":
      return typographyClasses["p-big-90"];
    case "medium":
      return typographyClasses["p-med-90"];
    case "small":
      return typographyClasses["p-small-90"];
    default:
      return typographyClasses["p-med-90"];
  }
};
const getCharsCounterSize = (inputSize) => {
  switch (inputSize) {
    case "small":
      return typographyClasses["cap-small-130"];
    case "big":
      return typographyClasses["cap-big-130"];
    default:
      return typographyClasses["cap-med-130"];
  }
};
const getInputLabelFontType = (inputSize) => {
  switch (inputSize) {
    case "big":
      return typographyClasses["p-med-90"];
    case "medium":
      return typographyClasses["p-small-90"];
    case "small":
      return typographyClasses["cap-big-90"];
  }
};
return {
  cssColors,
  colors,
  typographyClasses,
  getFontType,
  getCharsCounterSize,
  getInputLabelFontType,
};
