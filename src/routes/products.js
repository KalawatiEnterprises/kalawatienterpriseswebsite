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

// send all products with category and brand id replaced with actual names
router.get("/all", (_, res) => {
  const query = `SELECT ProductId, Products.Name, Description, 
  Categories.CategoryName AS Category, Brands.DisplayName AS Brand
  FROM Products
  INNER JOIN Brands ON Products.Brand = Brands.BrandId
  INNER JOIN Categories ON Products.Category = Categories.CategoryId`;
  db.query(query, (_, data) =>
    res.render("products/index", { products: data, switcherOption: "all" }));
});

export default router;
