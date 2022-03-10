import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";
import { formatDate } from "../helpers";
import homeIcon from "../img/icono_casa.svg";
import foodIcon from "../img/icono_comida.svg";
import expensesIcon from "../img/icono_gastos.svg";
import ocioIcon from "../img/icono_ocio.svg";

const iconDictionary = {
  Aseo: homeIcon,
  Bebé: homeIcon,
  Bebidas: foodIcon,
  Comida: foodIcon,
  Hogar: homeIcon,
  Mascotas: homeIcon,
  Ocio: ocioIcon,
  Snacks: foodIcon,
  Tecnología: expensesIcon,
  Vestuario: expensesIcon,
};

const Expense = ({ expense, setEditExpense, delExpenses }) => {
  const { category, name, amount, id, date } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditExpense(expense)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => delExpenses(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={iconDictionary[category]} alt="Icon Category" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
