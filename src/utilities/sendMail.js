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
    subject: `เเจ้งนัดหมายเข้ารับบริการ ${work}`,
    body: `<html>
            <body>
                <p>เรียนคุณ ${name}</p>
                <p>ระบบนัดหมายขอเข้ารับบริการขอจัดส่งเลขนัดหมายเข้ารับบริการ ${work}</p>
                <p>ให้แก่ท่านรายละเอียดตามไฟล์แนบ</p>
                <br /><br />
                <p>เลขนัดหมายเข้ารับบริการของคุณคือ<strong>${bookingId}</strong></p>
                <p>เข้ารับบริการวันที่<strong> ${dateBooking}</strong></p>
                <h4>บริการ ${work} : ${service}</h4>
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
        base64: fileBase64 + '',
      },
    ],
  };

  await sendMail(htmlEmail);
}

async function sendMail(htmlEmail) {
  console.log(htmlEmail)
  const response = await api.sendMail(htmlEmail);
  console.log(response.status)
}
