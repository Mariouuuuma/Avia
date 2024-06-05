import React from "react";
import Logo from "../../Assets/Images/logoAvia.png";
import "./index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import supabase from "../../Utils/api";
import { Link } from "react-router-dom";

function ResetPassword() {
  const initialValues = {
    NewPassword: "",
    ConfirmPassword: "",
  };

  const validationSchema = Yup.object({
    NewPassword: Yup.string().required("New password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("NewPassword"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = async (values: {
    NewPassword: string;
    ConfirmPassword: string;
  }) => {
    console.log(values);

    const { data, error } = await supabase.auth.updateUser({
      password: values.ConfirmPassword,
    });
    console.log(data);
    console.log(error);
  };

  return (
    <div className="containerReset">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="login-form">
          <img
            src={Logo}
            style={{ maxWidth: "4rem", maxHeight: "4rem" }}
            className="Logo mx-auto"
            alt="Logo"
          />
          <h2>Reset Password</h2>
          <h3>
            Set the new password for your account so you can login and access
            all features.
          </h3>
          <div className="form-group">
            <label htmlFor="NewPassword">New Password</label>
            <Field type="password" id="NewPassword" name="NewPassword" />
            <ErrorMessage
              name="NewPassword"
              component="div"
              className="error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <Field
              type="password"
              id="ConfirmPassword"
              name="ConfirmPassword"
            />
            <ErrorMessage
              name="ConfirmPassword"
              component="div"
              className="error"
            />
          </div>
          <div className="ResetPass">
            <div className="form-group">
              <button type="submit">
                <Link to="/">Reset Password</Link>
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ResetPassword;
