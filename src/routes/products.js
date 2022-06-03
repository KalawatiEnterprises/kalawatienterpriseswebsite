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

// TODO: properly handle database errors

import express from "express";
import db from "../db.js";

const router = express.Router();

const getAllProducts = (callback) => {
  const qry  = `SELECT Products.ID, Products.Name, Products.Description, Brands.DisplayName AS Brand,
  GROUP_CONCAT(Categories.Name) AS Categories 
  From Products 
  INNER JOIN Product_Categories ON Products.ID = Product_Categories.ProductID
  INNER JOIN Categories ON Product_Categories.CategoryID = Categories.ID
  INNER JOIN Brands ON Products.BrandID = Brands.ID
  GROUP BY Products.ID`;

  db.query(qry, (err, data) => err ? callback(err) : callback(data));
}

router.get("/all", (_, res) => {
  getAllProducts((data) =>
    res.render("products/index", {products: data, switcherOption: "all"}));
})

export default router;
