import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import Logo from "../../../Assets/Images/logoAvia.png";
import supabase from "../../../Utils/api";
import { AuthContext } from "../../../Contexts/AuthContext";
import { SideBarContext } from "../../../Contexts/SideBarContext";

// Interface pour les valeurs du formulaire
interface FormValues {
  emailPhoneWelc: string;
  passwordWelc: string;
  rememberMeWelc: boolean;
}

const validationSchema = Yup.object().shape({
  emailPhoneWelc: Yup.string().required("Phone number or Email is required"),
  passwordWelc: Yup.string().required("Password is required"),
});

const WelcomeOperator: React.FC = () => {
  const { currentuser, setCurrentuser, loggedOut, setLoggedout } =
    useContext(AuthContext);
  const { setReceiver, setSender, sender } = useContext(SideBarContext);
  const [err, setErr] = useState<boolean>(false);
  const history = useHistory();
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.emailPhoneWelc,
      password: values.passwordWelc,
    });
    setCurrentuser(data.user);

    console.log(error);
    console.log(values.emailPhoneWelc);
    if (!error) {
      history.push("/Messenging");
    }
    const { data: senderData, error: senderError } = await supabase
      .from("Agents")
      .select("firstName, lastName")
      .eq("Email", values.emailPhoneWelc);

    if (senderError) {
      // Gérer spécifiquement les erreurs de type PostgrestError
      console.error(
        "Erreur lors de la recherche de l'expéditeur :",
        senderError
      );
      setErr(true);
    } else {
      localStorage.setItem("supabase_session", JSON.stringify(senderData));
      if (senderData && senderData.length > 0) {
        setSender(senderData[0]);
        console.log("Sender:", senderData[0]);
      } else {
        // Aucun expéditeur trouvé

        console.log("Aucun expéditeur trouvé.");
      }
    }
  };
  const getSession = async () => {
    const { data: session } = await supabase.auth.getSession();
  };

  useEffect(() => {
    getSession();
  }, []);

  console.log(currentuser);
  console.log(sender);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        marginTop: "2rem",
        marginBottom: "10rem",
      }}
    >
      <div className="containerWelc">
        <img src={Logo} className="LogoWelc mx-auto" alt="Logo" />
        <Formik
          initialValues={{
            emailPhoneWelc: "",
            passwordWelc: "",
            rememberMeWelc: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="WelcForm">
              <h2>Welcome to Operator View</h2>
              <h3>
                An account is required. Please ask an existing member for an
                invitation or log in to continue.
              </h3>
              <div className="Welcgroup">
                <label htmlFor="emailPhoneWelc">Phone number or Email</label>
                <Field
                  type="text"
                  id="emailPhoneWelc"
                  name="emailPhoneWelc"
                  required
                />
                <ErrorMessage name="emailPhoneWelc" component="div" />
              </div>
              <div className="Welcgroup">
                <label htmlFor="passwordWelc">Password</label>
                <Field
                  type="password"
                  id="passwordWelc"
                  name="passwordWelc"
                  required
                />
                <ErrorMessage name="passwordWelc" component="div" />
              </div>
              <div className="CheckboxWelc">
                <label htmlFor="rememberMeWelc" style={{ marginRight: "5px" }}>
                  Remember me
                </label>
                <Field
                  type="checkbox"
                  id="rememberMeWelc"
                  name="rememberMeWelc"
                />
              </div>
              <div className="ButtonWelc">
                <div className="Welcgroup">
                  <button type="submit" disabled={isSubmitting}>
                    Login
                  </button>
                </div>
              </div>
              <p>
                <Link to="/MessengingClient">Forgot your password?</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WelcomeOperator;
function useffect() {
  throw new Error("Function not implemented.");
}
