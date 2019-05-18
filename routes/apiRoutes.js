const nodeMailer = require('nodemailer');

module.exports = (app) => {

  ////////////////////////////////////////////////////
  ///                                              ///
  ///   Replace the next few vars with your info   ///
  ///   NOTE: Do not push your pass to github!!!   ///
  ///                                              ///
  ////////////////////////////////////////////////////

  const sendMailTo = process.env.SEND_TO; // your email you want the email sent TO
  const emailAuth = { // this will be the email the email is sent FROM
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  };

  app.post("/api/email", ({ body }, res) => {
    // build the email message
    let mailOptions = {
      to: sendMailTo,
      // subject headline
      subject: 'Email from website', 
      // if html is disabled in email it will use this one
      text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`, 
      // if html is enabled in email it will use this one
      html: `<b>Email from website</b> 
            <p><b>Sender:</b> ${body.name}</p>
            <p><b>Email:</b> ${body.email}</p>
            <p><b>Message:</b> ${body.message}</p>` 
    };
    
    // configure the account to send the email with
    let transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: emailAuth
    });

    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // let the front end know there was a failure
        res.send({ ok: false });
        return console.log(error);
      }
      // tell the front end the send was successful
      res.send({ ok: true });
    });

  });
};
