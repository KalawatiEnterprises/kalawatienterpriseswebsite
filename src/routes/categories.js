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
import db from "../db.js";

const router = express.Router();

// send all categories
router.get("/all", (_, res) => {
  const query = `SELECT CategoryName, CategoryId FROM Categories`;
  db.query(query, (_, data) =>
    res.render("categories/index", { categories: data, switcherOption: "categories" }));
});

export default router;