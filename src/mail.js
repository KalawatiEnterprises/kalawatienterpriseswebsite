// Kalawati Enterprises Website: The Official Website For Kalawati Enterprises
// Copyright (C) 2022  Vidhu Kant Sharma <vidhukant@protonmail.ch>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// called after email sent
const mailCallback = (err, info) => {
  if (err) console.log(err);
  else console.log('Email sent: ' + info.response);
}

// if contact form is submitted an email is sent to
// the site admin and the user (if email specified)
const handleContactMail = (details) => {
  const adminMail = {
    from: process.env.EMAIL_ADDR,
    to: process.env.EMAIL_DEF_RECEPIENT,
    subject: "yay someone filled the form",
    text: 
    ` ${details.Name}
      ${details.Phone}
      ${details.Email}
      ${details.Msg}`
  }
  transporter.sendMail(adminMail, mailCallback)

  // TODO: validate email addresses and check for spam
  // send an email to user
  if (details.Email !== "") {
    const userMail = {
      from: process.env.EMAIL_ADDR,
      to: details.Email,
      subject: "Thx mate",
      text: "appreciate you filled up the form but don't do it again it'll get flagged"
    }
    transporter.sendMail(userMail, mailCallback)
  }
}

export default handleContactMail;
