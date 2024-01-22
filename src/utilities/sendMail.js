import api from "@/api/booking";

export default async function sendEmail({
  email,
  name,
  bookingId,
  work,
  service,
  province,
  district,
  dateBooking,
  fileBase64,
}) {
  const htmlEmail = {
    to: email,
    subject: `การนัดหมายขอเข้ารับบริการ${work} สำเร็จ`,
    body: `<html>
            <body>
                <p>เรียนคุณ ${name}</p>
                <p>ระบบนัดหมายขอเข้ารับบริการขอจัดส่งใบสรุปข้อมูลการนัดหมายเข้ารับบริการ${work}</p>
                <p>ให้แก่ท่านตามไฟล์แนบ</p>
                <br /><br />
                <p>หมายเลขนัดหมายขอเข้ารับบริการของคุณคือ<strong>${bookingId}</strong></p>
                <p>เข้ารับบริการวันที่<strong> ${dateBooking}</strong></p>
                <h4>บริการงานโรงเเรม : ${service}</h4>
                <h4>${
                  province !== "กรุงเทพมหานคร" ? "จังหวัด" : ""
                }${province} ${district}</h4>
                <br /><br />
                <p>จึงเรียนมาเพื่อโปรดทราบ</p>
                <p>สำนักการสอบสวนเเละนิติการ</p>
            </body>
        </html>`,
    attachments: [
      {
        filename: `การนัดหมายขอเข้ารับบริการ${work}.pdf`,
        base64: fileBase64,
      },
    ],
  };

  await sendMail(htmlEmail);
}

async function sendMail(htmlEmail) {
  const response = await api.sendMail(htmlEmail);
  const sendEmailData = response.data;
}
