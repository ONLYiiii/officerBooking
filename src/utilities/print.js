import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { fonts } from "./customfont";
import { formatDateString } from "../utilities/formatDate";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = fonts;

export default function print(
  bookingDetails,
  provinceName,
  districtName,
  typeworkName,
  serviceName,
  isPrint
) {
  const formattedDate = formatDateString(bookingDetails.date_booking);
  var docDefinition = {
    pageSize: "A5",
    content: [
      {
        text: [
          `เลขนัดหมายขอเข้ารับบริการของคุณคือ :\n`,
          {
            text: `${bookingDetails.booking_id}\n`,
            fontSize: 20,
            color: "#1081E9",
            characterSpacing: 2,
            bold: true,
          },
          `วันที่  ${formattedDate}\n`,
          `ประเภทงาน : ${typeworkName} \n`,
          `งานบริการ : ${serviceName} \n`,
          `จังหวัด${provinceName} ${districtName}\n`,
          `${
            bookingDetails.time_booking === 1
              ? "ช่วงเช้า (เวลา 09.00 - 11.00)"
              : "ช่วงบ่าย (เวลา 13.00 - 15.00)"
          }\n`,
          {
            text: "กรุณาแจ้ง หมายเลขนัดหมายล่วงหน้า\nหรือ เลขประจำตัวประชาชนต่อเจ้าหน้าที่เมื่อเข้ารับบริการตามวันเวลาที่จอง\nเเละมาตามวันที่เเละเวลาที่นัดหมาย",
            fontSize: 9,
            color: "#F5002C",
          },
        ],
        margin: [0, 80, 0, 0],
        style: {
          fontSize: 12,
          alignment: "center",
        },
      },
    ],

    defaultStyle: {
      font: "Kanit",

      lineHeight: 1.7,
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  if (isPrint) {
    pdfDocGenerator.open();
  } else {
    let fileBase64 = null;
    pdfDocGenerator.getBase64((data) => {
      fileBase64 = data;
    });
    return fileBase64;
  }
}
