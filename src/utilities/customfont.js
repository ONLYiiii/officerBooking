//? Fonts Import
//* Sarabun
import sarabunRegular from "@/assets/fonts/Sarabun-Regular.ttf";
import sarabunBold from "@/assets/fonts/Sarabun-Bold.ttf";
import sarabunItalic from "@/assets/fonts/Sarabun-Italic.ttf";
import sarabunBoldItalic from "@/assets/fonts/Sarabun-BoldItalic.ttf";

export const fonts = {
  Sarabun: {
    normal: `${window.location.origin}/${sarabunRegular}`,
    bold: `${window.location.origin}/${sarabunBold}`,
    italics: `${window.location.origin}/${sarabunItalic}`,
    bolditalics: `${window.location.origin}/${sarabunBoldItalic}`,
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Bold.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-BoldItalic.ttf",
  },
};
