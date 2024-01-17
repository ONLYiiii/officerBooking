import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { fonts } from "./customfont";

import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
} from "@/utilities/convertCode.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = fonts;

export default function print(filteredData) {
  const tableBody = [];
  const tableHeader = [
    { text: "รหัสการจอง", alignment: "center" },
    { text: "เลขประจำตัวประชาชน", alignment: "center" },
    { text: "ประเภทงาน", alignment: "center" },
    { text: "บริการที่เข้ารับ", alignment: "center" },
    { text: "ช่วงเวลา", alignment: "center" },
    { text: "วันที่จอง", alignment: "center" },
  ];
  tableBody.push(tableHeader);

  filteredData.forEach((item) => {
    const row = [
      { text: item.BookingID, alignment: "center" },
      { text: item.citizenId, alignment: "center" },
      convertWorkCode(item.typeWork),
      convertServiceCode(item.typeService),
      { text: convertTimeBooking(item.timeBooking), alignment: "center" },
      { text: convertDate(item.dateBooking), alignment: "center" },
    ];
    tableBody.push(row);
  });

  var docDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    content: [
      {
        table: {
          widths: [90, 90, "*", "*", 40, 100],
          headerRows: 1,
          body: tableBody,
        },
      },
    ],
    defaultStyle: {
      font: "Kanit",
      lineHeight: 2.25,
      fontSize: 8,
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.open();
}
