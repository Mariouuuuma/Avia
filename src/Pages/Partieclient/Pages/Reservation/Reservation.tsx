import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Reservation.css";
import supabase from "../../../../Utils/api";

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

const Reservation: React.FC = () => {
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    setSubmitting(false);
    try {
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

        if (insertError) {
          console.error(
            "Erreur lors de l'ajout de l'agent :",
            insertError.message
          );
          // Gérer les erreurs liées à l'ajout de l'agent dans la base de données
        } else {
          console.log("Agent ajouté avec succès :", insertData);
          // L'agent a été ajouté avec succès à la base de données
        }
      }
    } catch (error) {
      console.error("Une erreur inattendue s'est produite :", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-20 reservation-container">
      <div className="form-container">
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
              <h1>Flight Details</h1>
              <h3>
                These details are required. Please enter passenger details to
                proceed to flight details.
              </h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field type="text" id="firstName" name="firstName" required />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field type="text" id="lastName" name="lastName" required />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" required />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
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
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Address1</label>
                  <Field type="text" id="password" name="password" required />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Address2</label>
                  <Field
                    type="text"
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
              <div className="button-container">
                <div>
                  <button
                    className="submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ marginTop: "2rem" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Reservation;
