import React, { useRef, FormEvent } from "react";
import axios from "axios";

const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      const formData = new FormData(form.current);

      const data = {
        from: formData.get("user_email") as string,
        to: "mariemsmadhii023@gmail.com",
        subject: `Message from ${formData.get("user_name") as string}`,
        text: formData.get("message") as string,
      };

      try {
        const response = await axios.post(
          " https://api.resend.com", // Replace this with the actual Resend API endpoint
          data,
          {
            headers: {
              Authorization: `Bearer re_iJP4JhcW_8ducjsrRS8RZrA44qH27iLKJ`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("SUCCESS!");
        } else {
          console.log("FAILED...", response.data);
        }
      } catch (error) {
        console.error("FAILED...", error);
      }
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" required />
      <label>Email</label>
      <input type="email" name="user_email" required />
      <label>Message</label>
      <textarea name="message" required />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactUs;
