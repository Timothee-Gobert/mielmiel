import mysql, { ConnectionOptions } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function sql(req: NextApiRequest, res: NextApiResponse) {
  const access: ConnectionOptions = {
    user: "root",
    password: "isnt",
    database: "miels_gobert",
  };

  const conn = mysql.createConnection(access);
  try {
    const results = await conn.promise().query(req.body as string);
    res.status(200).json({ message: results[0] });
  } catch (err: any) {
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      res.status(500).json({ message: "L'authentification à la base de données à échouée" });
    } else if (err.code === "ER_BAD_DB_ERROR") {
      res.status(500).json({
        message: "La base de données n'est pas accessible ou bien n'existe pas",
      });
    }
  }
}
