const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/send', async (req, res, next) => {
  console.log(req.body);
  const { senderName, senderAddress, recipient, title, contentHtml } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${senderName}" <${senderAddress}>`, // sender address
    to: recipient, // list of receivers 'a, b, c'
    subject: title, // Subject line
    text: 'Hello world?', // plain text body
    html: contentHtml, // html body
  });

  console.log('Message sent: %s', info.messageId);

  res.json({
    result: 'ok',
    message: `Message sent: ${info.messageId}`,
  });
});

module.exports = router;
