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
import * as url from 'url';
// import db from "../db";
// 
// // connect to database
// db.connect(err => {
//   if (err) throw err;
// });
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const router = express.Router();

const productPhotosRoot = __dirname + "../../public/photos/products";
const brandPhotosRoot = __dirname + "../../public/photos/brands";
const categoryPhotosRoot = __dirname + "../../public/photos/categories";

// TODO: / returns page containing all the products
// TODO: /:productId returns page containing all the photos of the product

router.get("/products/:productId/:imageId", (req, res) => {
  res.sendFile(`${req.params.productId}/${req.params.imageId}.jpg`, { root: productPhotosRoot });
});

router.get("/brands/:brandId/:imageId", (req, res) => {
  res.sendFile(`${req.params.brandId}/${req.params.imageId}.jpg`, { root: brandPhotosRoot });
});

router.get("/brands/:categoryId/:imageId", (req, res) => {
  res.sendFile(`${req.params.categoryId}/${req.params.imageId}.jpg`, { root: categoryPhotosRoot });
});

export default router;
