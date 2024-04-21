import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';
import Logo from '../../../Assets/Images/logoAvia.png';
import supabase from '../../../Utils/api';
import { AuthContext } from '../../../Contexts/AuthContext';
 

// Interface pour les valeurs du formulaire
interface FormValues {
  emailPhoneWelc: string;
  passwordWelc: string;
  rememberMeWelc: boolean;
 
}

const validationSchema = Yup.object().shape({

  emailPhoneWelc: Yup.string().required('Phone number or Email is required'),
  passwordWelc: Yup.string().required('Password is required'),
});

const WelcomeOperator: React.FC = () => {
  const {currentuser,setCurrentuser}=useContext(AuthContext)
  const history = useHistory(); 
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {   
 
const { data, error } = await supabase.auth.signInWithPassword({
  email: values.emailPhoneWelc,
  password: values.passwordWelc,
})
setCurrentuser(data.user)
 
console.log(error)
console.log(values.emailPhoneWelc)
console.log(values.passwordWelc)
if(!error){
    history.push("/Messenging");
}



  };
 

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', marginTop: '2rem', marginBottom: '10rem' }}>
      <div className="containerWelc">
        <img src={Logo} className="LogoWelc mx-auto" alt="Logo" />
        <Formik
          initialValues={{ emailPhoneWelc: '', passwordWelc: '', rememberMeWelc: false  }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}

        >
          {({ isSubmitting }) => (
            <Form className="WelcForm">
              <h2>Welcome to Operator View</h2>
              <h3>An account is required. Please ask an existing member for an invitation or log in to continue.</h3>
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
                <Field type="password" id="passwordWelc" name="passwordWelc" required />
                <ErrorMessage name="passwordWelc" component="div" />
              </div>
              <div className="CheckboxWelc">
                <label htmlFor="rememberMeWelc" style={{ marginRight: '5px' }}>Remember me</label>
                <Field type="checkbox" id="rememberMeWelc" name="rememberMeWelc" />
              </div>
              <div className="ButtonWelc">
                <div className="Welcgroup">
                  <button type="submit" disabled={isSubmitting}>Login</button>
                </div>
              </div>
              <p><Link to="/ForgotPassword">Forgot your password?</Link></p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WelcomeOperator;




