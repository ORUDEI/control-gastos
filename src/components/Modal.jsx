import { useState, useEffect } from "react";
import { Message } from "./Message";
import CloseBtn from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animatedModal,
  setAnimatedModal,
  saveExpenses,
  editExpense,
  setEditExpense,
}) => {
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setName(editExpense.name);
      setAmount(editExpense.amount);
      setCategory(editExpense.category);
      setId(editExpense.id);
      setDate(editExpense.date);
    }
  }, []);

  const hideModal = () => {
    setAnimatedModal(false);
    setEditExpense({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, amount, category].includes("")) {
      setMessage("Todos los campos son obligatorios");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    saveExpenses({ name, amount, category, id, date });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CloseBtn} alt="Close Modal" onClick={hideModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animatedModal ? "animar" : "cerrar"}`}
      >
        <legend>{editExpense.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {message && <Message type="error">{message}</Message>}
        <div className="campo">
          <label htmlFor="name">Nombre Gasto</label>
          <input
            id="name"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="amount">Cantidad</label>
          <input
            id="amount"
            type="text"
            placeholder="Añade la cantidad del gasto"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
        </div>
        <div className="campo">
          <label htmlFor="category">categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value=""> -- Tolas las categorías  --</option>
            <option value="Aseo"> -- Aseo --</option>
            <option value="Bebé"> -- Bebé --</option>
            <option value="Bebidas"> -- Bebidas --</option>
            <option value="Comida"> -- Comida --</option>
            <option value="Hogar"> -- Hogar --</option>
            <option value="Mascotas"> -- Mascotas --</option>
            <option value="Ocio"> -- Ocio --</option>
            <option value="Snacks"> -- Snacks --</option>
            <option value="Tecnología"> -- Tecnología --</option>
            <option value="Vestuario"> -- Vestuario --</option>
          </select>
        </div>
        <input
          type="submit"
          value={editExpense.name ? "Guardar Cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
