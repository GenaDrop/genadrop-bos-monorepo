const css = `
// Brand
--mb-blackblue: #070C2B;
--mb-red: #FF2424;
--mb-red-35: #3A1C2A;
--mb-red-15: #FFDEDE;
--mb-blackblue: #070C2B;
--mb-blackblue: #070C2B;
--mb-blackblue: #070C2B;
--mb-blackblue: #070C2B;
// Neutral
--gray-900: #101223;
--gray-850: #1E2030;
--gray-800: #282A3A;
--gray-700: #404252;
--gray-600: #5B5D6B;
--gray-500: #777986;
--gray-400: #9496A1;
--gray-300: #B3B5BD;
--gray-200: #D2D4DA;
--gray-150: #E8EAF0;
--gray-100: #F3F4F8;
--gray-50: #F9F9F9;
// Actions
--blue-300: #4F58A3;
--blue-300-35: #C2C5DD;
--blue-300-15: #EBEDFB;
--blue-100: #C5D0FF;
--blue-100-35: #3F4254;
--blue-100-15: #2B2E42;
// Additional
--purple-300: #8C4FE5;
--purple-100: #E087FF;
--orange-300: #FF6C3B;
--orange-100: #FF9470;
// State
--success-300: #0A7D6C;
--success-100: #9FED8F;
--warning-300: #F2D413;
--warning-100: #FFE855;
--error-300: #C74C4C;
--error-100: #ED5A5A;
`;

const typographyClasses = {
  "display-130": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 35px;
        line-height: 38px;
        @media (min-width: 480px) {
                font-size: 48px; 
                line-height: 50px;
        }
    }`,

  "display-90": ` {
        font-family: AuthenticSans-90, sans-serif;
        font-size: 29px;
        line-height: 38px;
        @media (min-width: 480px) {
                font-size: 35px;        
                line-height: 50px;
        }
    }`,

  "heading-130": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 29px;
        line-height: 34px;
        @media (min-width: 480px) {
                font-size: 35px;  line-height: 38px;
        }
    }`,
  "heading-90": `{
        font-family: AuthenticSans-90, sans-serif;
        font-size: 29px;
        line-height: 34px;
        @media (min-width: 480px) {
                font-size: 35px;
                line-height: 38px;        
        }
    }`,
  "h1-130": `{
        font-family: AuthenticSans-130, sans-serif; 
        font-size: 24px; 
        @media (min-width: 480px) {
                font-size: 29px; 
                line-height: 32px;
        }
    }`,
  "h1-90": `{
        font-family: AuthenticSans-90, sans-serif;
        font-size: 24px; line-height: 28px;
        @media (min-width: 480px) {
            .sm\:text-29 {
                font-size: 29px; line-height: 32px;
            }
        }
    }`,
  "h2-130": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 20px;
        line-height: 22px;
        @media (min-width: 480px) {
                font-size: 24px;
                line-height: 24px;
        }
    }`,
  "h2-90": ` {
        font-family: AuthenticSans-90, sans-serif;
        font-size: 20px;
        line-height: 22px;
        @media (min-width: 480px) {
            line-height: 24px;
        font-size: 24px;}
    }`,
  "h3-130": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 17px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 20px;
                line-height: 22px;
        }
    }`,
  "h3-90": `{
        font-family: AuthenticSans-90, sans-serif;
        font-size: 17px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 20px;
                line-height: 22px;
        }
    }`,
  "p-sub-130": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 16px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 18px;
                line-height: 22px;
        }
    }`,
  "p-sub-90": `{
        font-family: AuthenticSans-90, sans-serif;
        font-size: 16px;
        line-height: 18px;
        @media (min-width: 480px) {
                font-size: 18px;
                line-height: 22px;
        }
    }`,
  "p-big-130": ` {
        font-family: AuthenticSans-130, sans-serif;
        font-size: 14px;
        line-height: 16px;
        @media (min-width: 480px) {
                font-size: 16px;
                line-height: 16px;
        }
    }`,
  "p-big-90": ` {
        font-family: AuthenticSans-90, sans-serif;
            font-size: 14px;
        line-height: 16px;
        @media (min-width: 480px) {
                font-size: 16px;
                line-height: 16px;
        }
    }`,
  "p-med-130": ` {
        font-family: AuthenticSans-130, sans-serif;
        font-size: 12px;
        line-height: 14px;
        @media (min-width: 480px) {
                font-size: 14px;
                line-height: 16px;
        }
    }`,
  "p-med-90": ` {
        font-family: AuthenticSans-90, sans-serif;
        font-size: 12px;
        line-height: 14px;
        @media (min-width: 480px) {
                font-size: 14px;
                line-height: 16px;
        }
    }`,
  "p-small-130": ` {
        font-family: AuthenticSans-130, sans-serif;
        font-size: 10px;
        line-height: 12px;
        @media (min-width: 480px) {
                font-size: 12px;
                line-height: 14px;
        }
    }`,
  "p-small-90": ` {
        font-family: AuthenticSans-90, sans-serif;
        font-size: 10px;
        line-height: 12px;
        @media (min-width: 480px) {
                font-size: 12px;
                line-height: 14px;
        }
    }`,
  "cap-big-130": ` {
        font-family: AuthenticSans-90, sans-serif;
        font-size: 9px;
        line-height: 12px;
        @media (min-width: 480px) {
          font-size: 10px;
          line-height: 12px;
        }
      }`,
  "cap-big-90": ` {
        font-family: AuthenticSans-130, sans-serif;
        font-size: 9px;
        line-height: 12px;
        @media (min-width: 480px) {
          font-size: 10px;
          line-height: 12px;
        }
      }`,
  "cap-med-130": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 8px;
        line-height: 10px;
        @media (min-width: 480px) {
          font-size: 9px;
          line-height: 11px;
        }
      }`,
  "cap-med-90": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 8px;
        line-height: 10px;
        @media (min-width: 480px) {
          font-size: 9px;
          line-height: 11px;
        }
      }`,
  "cap-small-130": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 8px;
        line-height: 10px;
      }`,
  "cap-small-90": `{
        font-family: AuthenticSans-90, sans-serif;
        font-size: 8px;
        line-height: 10px;
      }`,
  "action-cap": `{
        font-family: AuthenticSans-130, sans-serif;
        font-size: 10px;
        line-height: 12px;
        text-transform: uppercase;
      }`,
};

return { css, typographyClasses };
// props.setTheme && props.setTheme(css);
// props.setFontType && props.setFontType(typography);

// return "";
