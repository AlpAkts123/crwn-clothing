import { useState } from "react";
import FormInput from "../../form-input/form-input.component";
import "./sign-up-form.styles.scss"
import {
    createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../../utils/firebase/firebase.util";
import Button from "../../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        alert('passwords do not match');
        return;
      }
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
  
        await createUserDocFromAuth(user, { displayName });
        resetFormFields();
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Cannot create user, email already in use');
        } else {
          console.log('user creation encountered an error', error);
        }
      }
    };

  console.log(formFields);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return  (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={HandleSubmit}>
      
        <FormInput
        label="Display Name"
          type="text"
          onChange={handleChange}
          required
          name="displayName"
          value={displayName}
        />
        <FormInput
        label="Email"
        type="email"
          onChange={handleChange}
          required
          name="email"
          value={email}
        />
        <FormInput
        label="Password"
        type="password"
          onChange={handleChange}
          required
          name="password"
          value={password}
        />
        <FormInput
        label=" Confirm Password"
        type="password"
          onChange={handleChange}
          required
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button  type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
