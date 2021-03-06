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

// return all brands
router.get("/all", (_, res) => {
  const query = `SELECT ID, DisplayName, LogoURL FROM Brands`;
  db.query(query, 
    (_, data) => res.render("brands/index", { brands: data }));
});

// return info about brand
// TODO: SELECT * is used
router.get("/:ID", (req, res) => {
  const query = `SELECT * FROM Brands WHERE ID = ${req.params.ID}`;
  db.query(query, 
    (_, data) => res.render("brands/brand", { data: data[0] }));
});

// return products related to specific brand
router.get("/:brandId/products", (req, res) => {
  const query = `SELECT Products.ProductId, Products.Name, Products.Description,
  Categories.CategoryName AS Category, Brands.DisplayName AS Brand
  FROM Products
  INNER JOIN Brands ON Products.Brand = Brands.BrandId
  INNER JOIN Categories ON Products.Category = Categories.CategoryId
  WHERE Brand = ${req.params.brandId}`;
  db.query(query, 
    (_, data) => res.render("products/index", { 
      products: data, 
      switcherOption: "brand" 
    })
  );
});

// return all the sub/categories of products associated with brand
router.get("/:brandId/categories", (req, res) => {
  const query = `SELECT DISTINCT(Categories.CategoryName), Categories.CategoryId
  FROM Products
  INNER JOIN Categories ON Products.Category = Categories.CategoryId
  OR Products.SubCategory1 = Categories.CategoryId
  OR Products.SubCategory2 = Categories.CategoryId
  OR Products.SubCategory3 = Categories.CategoryId
  WHERE Brand = ${req.params.brandId}`;
  db.query(query, (_, data) => 
    res.send(data));
});

export default router;
