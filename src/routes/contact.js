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

import express from "express";
import "dotenv/config";
import nodemailer from "nodemailer";
import handleContactMail from "../mail.js"

const router = express.Router();
router.get("/", (_, res) => res.render("contactpage"));

router.post("/", (req, res) => {
  console.log(req.body)
  handleContactMail({
    Name: req.body.name,
    Phone: req.body.phone,
    Email: req.body.email,
    Msg: req.body.message
  });
  // TODO: redirect properly
  res.send("<h1>We've sent all the details to the admin and a copy to you!</h1>");
});

export default router;
