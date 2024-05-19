import styles from "./CalorieCalculatorFinal.module.css";
import { Link } from "react-router-dom";

interface State {
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  gender: string;
  renders: number;
}
type CalorieCalculatorFinalProps = {
  state: State;
};

export default function CalorieCalculatorFinal({
  state,
}: CalorieCalculatorFinalProps) {
  const calculateCalories = (
    weight: number,
    height: number,
    age: number,
    activityLevel: string,
    gender: string
  ) => {
    let result = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    if (gender === "female") result -= 161;
    switch (activityLevel) {
      case "Hauptsätzlich Sitzend (0 Tage/Woche)":
        return result;
      case "Leichter Sport (1-2 Tage/Woche)":
        return result + 127;
      case "Mittlere Sport (3-5 Tage/Woche)":
        return result + 800;
      case "Intensiver Sport (6-7 Tage/Woche)":
        return result + 1300;
      default:
        return undefined;
    }
  };
  console.log(
    calculateCalories(
      state.weight,
      state.height,
      state.age,
      state.activityLevel,
      state.gender
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>
          Sie haben einen täglichen Kalorienverbrauch von ngefähr{" "}
          <strong className={styles.greenColor}>
            {calculateCalories(
              state.weight,
              state.height,
              state.age,
              state.activityLevel,
              state.gender
            )}
          </strong>{" "}
          kcal.
        </h2>
        <br></br>
        <Link to="/products">
          <button className="button-green">Zu unseren Produkten</button>
        </Link>
      </div>
    </div>
  );
}
