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

// connect to database
db.connect(err => {
  if (err) throw err;
});

const router = express.Router();

router.get("/", (_, res) => {
  const query = `SELECT 
    Products.ProductId, Products.Name, Products.Description, 
    Categories.CategoryName AS Category, Brands.DisplayName AS Brand
    FROM Products 
    INNER JOIN Brands ON Products.Brand = Brands.BrandId
    INNER JOIN Categories ON Products.Category = Categories.CategoryId`;
  db.query(query, (_, data) => 
    res.render("products/index", { products: data })
  );
});

router.get("/brands", async (req, res) => {
  const query = `SELECT BrandId, DisplayName, Name, LogoURL FROM Brands`;
  const showDetailsOf = req.query.show_details;
  const getCategories = typeof(showDetailsOf) != 'undefined'
  // get product categories associated with brand
  const queryCategories = `SELECT DISTINCT(Categories.CategoryName), Categories.CategoryId FROM Products 
  INNER JOIN Categories ON Products.Category = Categories.CategoryId 
  WHERE Brand = ${showDetailsOf}`;
  const queryBrand = `SELECT * FROM Brands WHERE BrandID = ${showDetailsOf}`;

  db.query(`${query};${getCategories ? queryCategories + ";" + queryBrand : ""}`, (_, data) => 
    // res.send({ 
    //   brands: getCategories ? data[0] : data, 
    //   showDetailsOf: showDetailsOf,
    //   brandCategories: getCategories ? data[1] : [],
    //   brandDetails: getCategories ? data[2][0] : null
    // })
    res.render("products/brands", 
      { 
        brands: getCategories ? data[0] : data, 
        showDetailsOf: showDetailsOf,
        brandCategories: getCategories ? data[1] : [],
        brandDetails: getCategories ? data[2][0] : null
      }
    )
  );
});

router.get("/brands/:brandId", (req, res) => {
  const categories = req.query.categories;
  // wether categories params is requested
  const getCategories = typeof categories != "undefined" && categories !== ""; 
  const categoriesNum = getCategories ? categories.split(",").length : 0;

  const query = `SELECT 
    Products.Name, Products.Description, Categories.CategoryName AS Category, Brands.DisplayName AS Brand
    FROM Products
    INNER JOIN Brands ON Products.Brand = Brands.BrandId
    INNER JOIN Categories ON Products.Category = Categories.CategoryId 
    WHERE Products.Brand = ${req.params.brandId}`;

  const queryWithCategories = `SELECT 
    Products.Name, Products.Description, Categories.CategoryName AS Category, Brands.DisplayName AS Brand
    FROM Products
    INNER JOIN Brands ON Products.Brand = Brands.BrandId
    INNER JOIN Categories ON Products.Category = Categories.CategoryId 
    WHERE Products.Brand = ${req.params.brandId} 
    AND (Category in (${categories}) 
    ${ categoriesNum > 1 ? `AND SubCategory1 in (${categories})` : "" }
    ${ categoriesNum > 2 ? `AND SubCategory2 in (${categories})` : "" }
    ${ categoriesNum > 3 ? `AND SubCategory3 in (${categories})` : "" }
    ); SELECT DISTINCT(Categories.CategoryName), Categories.CategoryId FROM Products 
    INNER JOIN Categories ON Products.Category = Categories.CategoryId 
    WHERE Brand = ${req.params.brandId}`;

  db.query(getCategories ? queryWithCategories : query, (_, data) =>
    res.render("products/brand", {
      products: getCategories ? data[0] : data, 
      brandCategories: getCategories ? data[1] : [],
      requestedCategories: getCategories ? categories.split(",") : []
    })
  );
});

router.get("/categories", (_, res) => {
  const query = `SELECT * FROM Categories`;
  db.query(query, (_, data) =>
    res.render("products/categories", { categories: data })
  );
});

router.get("/categories/:catId", (req, res) => {
  const query = `SELECT 
    Products.Name, Products.Description, Categories.CategoryName AS Category, Brands.DisplayName AS Brand
    FROM Products
    INNER JOIN Brands ON Products.Brand = Brands.BrandId
    INNER JOIN Categories ON Products.Category = Categories.CategoryId 
    WHERE Category = ${req.params.catId}`;
  db.query(query, (_, data) =>
    res.render("products/category", { products: data })
  );
});

export default router;
