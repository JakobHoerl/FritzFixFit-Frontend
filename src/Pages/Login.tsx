import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

type LoginProps = {
  username?: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

function Validation(values: FormValues) {
  const errors: FormErrors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (!values.email.trim()) {
    errors.email = "Die E-Mail-Adresse darf nicht leer sein.";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Die E-Mail-Adresse stimmen nicht überein.";
  }

  if (!values.password.trim()) {
    errors.password = "Das Passwort darf nicht leer sein.";
  } else if (!password_pattern.test(values.password)) {
    errors.password =
      "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens eine Ziffer sowie einen Klein- und einen Großbuchstaben enthalten.";
  }

  return errors;
}

const Login: React.FC<LoginProps> = ({ setUsername }) => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      console.log("Submitting login data:", values);
      try {
        const response = await axios.post(
          "http://localhost:3000/login",
          values
        );
        console.log("Response from server:", response.data);
        if (response.data.success) {
          localStorage.setItem("username", response.data.username);
          setUsername(response.data.username);
          navigate("/");
        } else {
          setErrors({
            email: "Falsche E-mail Adresse oder Passwort",
            password: "Falsche E-mail Adresse oder Passwort",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          email: "Falsche E-mail Adresse oder Passwort",
          password: "Falsche E-mail Adresse oder Passwort",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <form action="" onSubmit={handleSubmit}>
          <input
            onChange={handleInput}
            type="text"
            placeholder="E-mail"
            name="email"
            value={values.email}
          ></input>
          {errors.email ||
            (errors.password && (
              <span className="red">Falsche E-mail Adresse oder Passwort</span>
            ))}
          <input
            onChange={handleInput}
            type="password"
            placeholder="Passwort"
            name="password"
            value={values.password}
          ></input>
          {values.email === "" || values.password === "" ? (
            <button type="submit" className="button-disabled">
              Login
            </button>
          ) : (
            <button type="submit" className="button-green">
              Login
            </button>
          )}
          <p>
            <Link to="/signup">
              <strong>Registrieren</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
