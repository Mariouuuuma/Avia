import axios from "axios";

const sendEmail = async (email, subject, text) => {
  const apiKey = process.env.REACT_APP_MAILGUN_API_KEY;
  const domain = process.env.REACT_APP_MAILGUN_DOMAIN;
  const fromEmail = process.env.REACT_APP_MAILGUN_FROM_EMAIL;

  const url = `https://api.mailgun.net/v3/${domain}/messages`;

  const formData = new URLSearchParams();
  formData.append("from", `Your Name <${fromEmail}>`);
  formData.append("to", email);
  formData.append("subject", subject);
  formData.append("text", text);

  try {
    const response = await axios.post(url, formData, {
      auth: {
        username: "api",
        password: apiKey,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

export default sendEmail;
