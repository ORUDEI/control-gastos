import React from "react";
import NewBudget from "./NewBudget";
import ControlBudget from "./ControlBudget";

const Header = ({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  expenses,
  setExpenses,
}) => {
  return (
    <header>
      <h1>Gastos de Supermercado</h1>
      {isValidBudget ? (
        <ControlBudget
          budget={budget}
          setExpenses={setExpenses}
          expenses={expenses}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
};

export default Header;
