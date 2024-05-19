import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
  name: string;
}
interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
}
type SignUpProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const SignUp: React.FC<SignUpProps> = ({ setUsername }) => {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const displayEmailError = () => {
    if (errorMessage) return <span className="red">{errorMessage}</span>;
    if (formErrors.email)
      return <span className="red">{formErrors.email}</span>;
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      if (response.status === 201) {
        localStorage.setItem("username", response.data.username);
        setUsername(formData.name);

        navigate("/");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Die E-Mail-Adresse existiert bereits.");
      } else {
        alert("Error creating user. Please try again.");
      }
    }
  };

  const validateForm = (values: FormValues) => {
    const errors: FormErrors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!values.name.trim()) {
      errors.name = "Der Name darf nicht leer sein";
    }

    if (!values.email.trim()) {
      errors.email = "Die E-Mail-Adresse darf nicht leer sein.";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Ungültige E-Mail-Adresse.";
    }

    if (!values.password.trim()) {
      errors.password = "Das Passwort darf nicht leer sein.";
    } else if (!password_pattern.test(values.password)) {
      errors.password =
        "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens eine Ziffer sowie einen Klein- und einen Großbuchstaben enthalten.";
    }

    return errors;
  };

  return (
    <div>
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Benutzername"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && <span className="red">{formErrors.name}</span>}
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {displayEmailError()}
          <input
            type="password"
            placeholder="Passwort"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <span className="red">{formErrors.password}</span>
          )}
          {formData.name === "" ||
          formData.email === "" ||
          formData.password === "" ? (
            <button type="submit" className="button-disabled">
              Account eröffnen
            </button>
          ) : (
            <button type="submit" className="button-green">
              Account eröffnen
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
export default SignUp;
