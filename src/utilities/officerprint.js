import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { fonts } from "./customfont";
import { formatDate } from "@/utilities/formatDate";

import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
} from "@/utilities/convertCode.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = fonts;

export default function print(filteredData, startEndDate) {
  const tableBody = [];
  const tableHeader = [
    { text: "รหัสการจอง", alignment: "center" },
    { text: "เลขประจำตัว\nประชาชน", alignment: "center" },
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

  let contentText;

  if (startEndDate) {
    if (startEndDate.length === 2) {
      const formattedDateStart = formatDate(startEndDate[0]);
      const formattedDateEnd = formatDate(startEndDate[1]);

      contentText = `ข้อมูลสถิติรายการนัดหมาย วันที่ ${formattedDateStart} ถึง วันที่ ${formattedDateEnd}`;
    } else {
      const formattedDate = formatDate(startEndDate);

      contentText = `ข้อมูลสถิติรายการนัดหมาย วันที่ ${formattedDate}`;
    }
  } else {
    contentText = "ข้อมูลสถิติรายการนัดหมาย";
  }

  var docDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    content: [
      { text: contentText },
      {
        table: {
          widths: [95, 95, 180, 200, 45, 90],
          headerRows: 1,
          body: tableBody,
        },
      },
    ],
    defaultStyle: {
      font: "Kanit",
      lineHeight: 1.4,
      fontSize: 11,
    },
    footer: function (currentPage, pageCount) {
      return {
        text: currentPage.toString() + " / " + pageCount,
        alignment: "right",
        margin: [12, 0],
      };
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.open();
}
