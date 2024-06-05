import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LogoImage from "../../Assets/Images/logoAvia.png";
import "./index.css";
import supabase from "../../Utils/api";

interface FormValues {
  emailForg: string;
}

function ForgotPass() {
  const initialValues: FormValues = {
    emailForg: "",
  };

  const validationSchema: Yup.Schema<FormValues> = Yup.object({
    emailForg: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const onSubmit = async (values: FormValues) => {
    // Soumettre les valeurs du formulaire
    console.log(values);

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      values.emailForg,
      {
        redirectTo: "http://localhost:3000/Reset",
      }
    );
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ padding: "1rem" }}
    >
      <div className="containerForgotPass mx-auto">
        <img src={LogoImage} className="Logo mx-auto" alt="Logo" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="ForgotpassForm">
            <h1>Forgot Password</h1>
            <h3>
              Enter your email for the verification process, we will send the
              link to your email.
            </h3>
            <div className="Forgotpassgroup">
              <label htmlFor="emailForg">E-mail*</label>
              <Field type="text" id="emailForg" name="emailForg" />
              <ErrorMessage
                name="emailForg"
                component="div"
                className="error"
              />
            </div>
            <div className="Forgotpassgroup">
              <button type="submit">Send</button>
            </div>
            <div className="LastElems">
              <p>Have already an account?</p>
              <p style={{ marginBottom: "5px" }}>Login</p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPass;
