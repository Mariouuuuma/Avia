const express = require("express");
const { Resend } = require("resend");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4007;
app.use(cors());

app.use(bodyParser.json());

const oAuth2Client = new google.auth.OAuth2(
  "113478939595-3t11cmmlf949lembnv09aganeu7ejslr.apps.googleusercontent.com",
  "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",
  "http://localhost:4000/Mail"
);

app.get("/authorize", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
  });
  console.log(`Redirecting to: ${authUrl}`);
  res.redirect(authUrl);
});

app.post("/mail", async (req, res) => {
  try {
    const { code, to } = req.body;

    if (!code || !to) {
      return res.status(400).send("Code is required in the request body");
    }

    const resend = new Resend("re_ZkQEUEXf_CxHSbc2ijTK8K6T7Z5CUUNVG");

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: to,
      subject: "Reclamation Code",
      html: `<h1>This is your code.</h1><strong>${code}</strong>`,
    });

    if (error) {
      console.log(error);
      return res.status(500).send(`Error sending email: ${error.message}`);
    }

    console.log(data);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
