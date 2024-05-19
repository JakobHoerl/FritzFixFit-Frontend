import { useNavigate } from "react-router-dom";

import styles from "./CalorieCalculatorStep1.module.css";

interface State {
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  gender: string;
  renders: number;
}
interface Action {
  type: "submit";
  payload: State;
}

type CaloieCalculatorStep1Props = {
  dispatch: React.Dispatch<Action>;
  state: State;
};
export default function CalorieCalculatorStep1({
  dispatch,
  state,
}: CaloieCalculatorStep1Props) {
  const history = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const data: State = {
      weight: parseFloat(formData.get("weight") as string),
      height: parseFloat(formData.get("height") as string),
      age: parseFloat(formData.get("age") as string),
      activityLevel: formData.get("activityLevel") as string,
      gender: formData.get("gender") as string,
      renders: state.renders + 1,
    };
    const isInputValid = !(
      !data.weight ||
      !data.height ||
      !data.age ||
      !data.activityLevel ||
      !data.gender
    );

    dispatch({ type: "submit", payload: data });

    if (isInputValid) {
      history("/calculator/final");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculatorStepOne}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>
            Bitte geben sie die folgenden Daten ein um ihren täglichen
            Kalorienbedarf zu berechnen.
          </h2>
          <div className={styles.gender}>
            <h3>Geschlecht</h3>
            <div className="input">
              <input type="radio" id="male" name="gender" value="male" />
              <label
                className={
                  !state.gender && state.renders !== 0 ? styles.redText : ""
                }
                htmlFor="male"
              >
                Mann
              </label>
              <input type="radio" id="female" name="gender" value="female" />

              <label
                className={
                  !state.gender && state.renders !== 0 ? styles.redText : ""
                }
                htmlFor="female"
              >
                Frau
              </label>
            </div>
          </div>
          {!state.age && state.renders > 0 ? (
            <span className="red">Bitte geben Sie eine Zahl ein.</span>
          ) : (
            ""
          )}
          <h4>Alter</h4>
          <input type="number" placeholder="23" min="1" name="age" />
          {!state.weight && state.renders > 0 ? (
            <span className="red">Bitte geben Sie eine Zahl ein.</span>
          ) : (
            ""
          )}

          <h4>Gewicht in kg</h4>
          <input type="number" placeholder="82" min="1" name="weight" />
          {!state.height && state.renders > 0 ? (
            <span className="red">Bitte geben Sie eine Zahl ein.</span>
          ) : (
            ""
          )}

          <h4>Größe in cm</h4>
          <input type="number" placeholder="177" min="1" name="height" />

          <h4>Aktivitätslevel</h4>
          <select name="activityLevel">
            <option>Hauptsätzlich Sitzend (0 Tage/Woche)</option>
            <option>Leichter Sport (1-2 Tage/Woche)</option>
            <option>Mittlere Sport (3-5 Tage/Woche)</option>
            <option>Intensiver Sport (6-7 Tage/Woche)</option>
          </select>
          <button className="button-green" type="submit">
            Jetzt Berechnen
          </button>
        </form>
      </div>
    </div>
  );
}
