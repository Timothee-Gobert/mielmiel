import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";
export default async function envoyerMail(req: NextApiRequest, res: NextApiResponse) {
  async function sendEmail(name: any, email: any, subject: any, message: any) {
    const data = JSON.stringify({
      Messages: [
        {
          From: { Email: "timothee.gobert92@gmail.com", Name: "Miels Gobert" },
          To: [{ Email: email, Name: name }],
          Subject: subject,
          TextPart: message,
        },
      ],
    });

    const config = {
      method: "post",
      url: "https://api.mailjet.com/v3.1/send",
      data: data,
      headers: { "Content-Type": "application/json" },
      auth: { username: "9a999ff4f1b3fc2cf51fd81bf6705225", password: "3840273de0e57ee0fb74dcbd9bcc963c" },
    };

    return axios(config)
      .then(function (response) {
        res.status(200).json({ message: "ok" });
      })
      .catch(function (error) {
        console.log(error);
        //TODO erreur côté serveur: possibilité de l'exploiter
        res.status(500).json({ message: "ko" });
      });
  }

  const { destinataire, email, subject, message } = JSON.parse(req.body);
  sendEmail(destinataire, email, subject, message);
}
