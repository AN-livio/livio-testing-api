"use strict";

let nodemailer = require("nodemailer");

let mandrillTransport = require("nodemailer-mandrill-transport");

let transport = nodemailer.createTransport(
  mandrillTransport({
    auth: {
      apiKey: "dTeRybBOlENJDErDRI_Geg",
    },
  })
);

module.exports = (to, from, subject, html) => {
  transport.sendMail(
    {
      from,
      to,
      subject,
      html,
    },
    (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    }
  );
};
