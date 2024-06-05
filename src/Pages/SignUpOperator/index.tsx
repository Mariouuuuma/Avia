import Logo from "../../Assets/Images/logoAvia.png";

import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.css"; // Assurez-vous d'importer votre fichier CSS
import supabase from "../../Utils/api";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const LoginNewOperator: React.FC = () => {
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    setSubmitting(false);
    try {
      // Inscrire l'utilisateur avec l'authentification Supabase
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (authError) {
        console.error("Erreur lors de l'inscription :", authError.message);
      } else {
        const { data: insertData, error: insertError } = await supabase
          .from("Agents")
          .insert({
            firstName: values.firstName,
            lastName: values.lastName,
            Email: values.email,
            PhoneNumber: values.phoneNumber,
          });
        {
          /*-------------------Insert identifier for agents in Guests--------------------------------*/
        }
        const { data: Data, error: Error } = await supabase
          .from("Users")
          .insert({
            Identifier: `${values.firstName}${values.lastName}`,
          });

        if (Error) {
          console.error("Erreur lors de l'ajout de l'agent :", Error.message);
        } else {
          console.log("Agent ajouté avec succès :", Data);
        }
      }
    } catch (error) {
      console.error("Une erreur inattendue s'est produite :", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-20">
      <div className="containerNewOp">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            rememberMe: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="flex justify-center">
                <img src={Logo} className="Logo" alt="Logo" />
              </div>
              <h2>Welcome to Operator View</h2>
              <h3>
                An account is required. Please ask an existing member for an
                invitation or log in to continue.
              </h3>
              <div className="formRow">
                <div className="formNewOp-group">
                  <label htmlFor="firstNameNewOp">First Name</label>
                  <Field
                    type="text"
                    id="firstNameNewOp"
                    name="firstName"
                    required
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="formNewOp-group">
                  <label htmlFor="lastNameNewOp">Last Name</label>
                  <Field
                    type="text"
                    id="lastNameNewOp"
                    name="lastName"
                    required
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formNewOp-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" required />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="formNewOp-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formNewOp-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="formNewOp-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="formRow"></div>
              <div className="ButtonDisp">
                <div>
                  {" "}
                  <button
                    className="SignUp"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <p>
                <Link to="/ForgotPassword">Forgot your password?</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginNewOperator;
