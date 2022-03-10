import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Filter from "./components/Filter";
import ExpenseList from "./components/ExpenseList";
import { idGenerator } from "./helpers";
import NewIconExpense from "./img/nuevo-gasto.svg";
function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animatedModal, setAnimatedModal] = useState(false);

  const [expenses, setExpenses] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [editExpense, setEditExpense] = useState({});

  const [filter, setFilter] = useState("");
  const [expensesFiltered, setExpensesFiltered] = useState([]);

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimatedModal(true);
      }, 500);
    }
  }, [editExpense]);

  useEffect(() => {
    localStorage.setItem("presupuesto", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if (filter) {
      const filterExpenses = expenses.filter(
        (expense) => expense.category === filter
      );
      setExpensesFiltered(filterExpenses);
    }
  }, [filter]);

  useEffect(() => {
    const lSBudget = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (lSBudget > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNewExpense = () => {
    setModal(true);
    setEditExpense({});
    setTimeout(() => {
      setAnimatedModal(true);
    }, 500);
  };

  const saveExpenses = (expense) => {
    if (expense.id) {
      const updatedExpenses = expenses.map((expenseState) =>
        expenseState.id === expense.id ? expense : expenseState
      );
      setExpenses(updatedExpenses);
      setEditExpense({});
    } else {
      expense.id = idGenerator();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setAnimatedModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const delExpenses = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <ExpenseList
              expenses={expenses}
              setEditExpense={setEditExpense}
              delExpenses={delExpenses}
              filter={filter}
              expensesFiltered={expensesFiltered}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={NewIconExpense}
              alt="New Icon Spend"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animatedModal={animatedModal}
          setAnimatedModal={setAnimatedModal}
          saveExpenses={saveExpenses}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />
      )}
    </div>
  );
}

export default App;
