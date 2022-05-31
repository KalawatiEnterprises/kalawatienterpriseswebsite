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

// import external libraries
import express from "express";

// import internal libraries
import products from "./routes/products.js";
import brands from "./routes/brands.js";
import categories from "./routes/categories.js";
import photos from "./routes/photos.js";
import contact from "./routes/contact.js";

// get port from ENV or use fallback
const PORT = process.env.PORT || "4000";

// this is the server
const app = express();

app.use(express.urlencoded({extended: true}))

// use ./public directory
app.use(express.static('public'));

// set view engine and views directory for EJS
app.set("view engine", "ejs")
app.set('views', "src/views");

// use products router
app.use("/products", products);
app.use("/brands", brands);
app.use("/categories", categories);
app.use("/photos", photos);
app.use("/contact", contact);

// start the app
app.listen(PORT);

app.get("/", (_, res) => res.redirect("/home"));
app.get("/home", (_, res) => res.render("homepage"));
