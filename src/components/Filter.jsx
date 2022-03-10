import { useState, useEffect } from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        {" "}
        <div className="campo">
          <label>Filtrar Gastos</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value=""> -- Tolas las categorías --</option>
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
      </form>
    </div>
  );
};

export default Filter;
