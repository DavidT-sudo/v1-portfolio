// import express from 'express';
// import cors from 'cors';
// import nodemailer from 'nodemailer';

// const router = express.Router();
// /*
//     require() style imports are forbidden because this project uses ES Modules (import/export syntax) instead of CommonJS (require/module.exports).
//     Mixing import and require can cause compatibility issues, especially with TypeScript and modern tooling.
// */

// //Email Server
// const app = express();
// app.use(cors());
// express.use(express.json());
// app.use("/", router);
// app.listen(5000, () => console.log("Email server running on port 5000"));
// console.log("Email: ", process.env.EMAIL_USER);
// console.log("Pass: ", process.env.EMAIL_PASS);

// const contactEmail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         password: process.env.EMAIL_PASS,
//     }
// });

// contactEmail.verify((error: Error | null) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Ready to send emails.");
//     }
// })

// router.post("/contact", (req: express.Request, res: express.Response) => {
//     const name = req.body.firstName + " " + req.body.lastName;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const message = req.body.message;
//     const mail = {
//         from: name,
//         to: process.env.EMAIL_USER,
//         subject: "New Contact Form Submission",
//         text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
//     };

//     contactEmail.sendMail(mail, (error: Error | null, info: nodemailer.SentMessageInfo) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Error sending email");
//         } else {
//             console.log("Email sent: " + info.response);
//             res.status(200).send("Email sent successfully");
//         }
//     });
// })

