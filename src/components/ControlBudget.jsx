import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlBudget = ({
  budget,
  setBudget,
  expenses,
  setExpenses,
  setIsValidBudget,
}) => {
  const [percent, setPercent] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spend, setSpend] = useState(0);

  useEffect(() => {
    const totalExpense = expenses.reduce(
      (total, expense) => expense.amount + total,
      0
    );

    const totalAvailable = budget - totalExpense;

    const newPercent = (((budget - totalAvailable) / budget) * 100).toFixed(2);

    setAvailable(totalAvailable);
    setSpend(totalExpense);
    setTimeout(() => {
      setPercent(newPercent);
    }, 1000);
  }, [expenses]);

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const res = confirm("¿Deseas reiniciar presupuesto y gastos?");
    if (res) {
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false);
    } else {
    }
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percent > 100 ? "#DC2626" : "#3b82F6",
            trailColor: "#F5F5F5",
            textColor: percent > 100 ? "#DC2626" : "#3b82F6",
          })}
          text={`${percent}% Gastado`}
          value={percent}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatAmount(budget)}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatAmount(available)}
        </p>
        <p>
          <span>Gastado: </span> {formatAmount(spend)}
        </p>
      </div>
    </div>
  );
};

export default ControlBudget;
