import React from "react";
import Expense from "./Expense";

const ExpenseList = ({
  expenses,
  setEditExpense,
  delExpenses,
  filter,
  expensesFiltered,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2>{expensesFiltered.length ? "Gastos" : "No hay gastos en esta categoría"}</h2>
          {expensesFiltered.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              delExpenses={delExpenses}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? "Gastos" : "No hay gastos aún"}</h2>
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              delExpenses={delExpenses}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
