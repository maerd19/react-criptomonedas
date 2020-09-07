import React, { useState } from "react";

const useMoneda = (label, stateInicial, opciones) => {
  // State del custom hook
  const [state, setState] = useState(stateInicial);

  const Seleccionar = () => (
    <>
      <label>{label}</label>
      <select onChange={(e) => setState(e.target.value)} value={state}>
        <option value="">-- Seleccione --</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </select>
    </>
  );

  // Retornar State, interfaz y fn que modifica el state
  return [state, Seleccionar, setState];
};

export default useMoneda;
