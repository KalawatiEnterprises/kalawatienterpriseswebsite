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

import mysql from "mysql";

const config = {
  host: "localhost",
  user: "zt",
  password: "",
  database: "kalawatidb",
  multipleStatements: true
}

/* const createDb = () => {
 *   const sql: string = "CREATE DATABASE kalawatidb";
 *
 *   db.query(sql, (err, res) => {
 *     if (err) throw err;
 *     console.log("Created Database successfully.");
 *     console.log(res);
 *   });
 * } */

export default mysql.createConnection(config);
