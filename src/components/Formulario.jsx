import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import useMoneda from "./../hooks/useMoneda";
import useCriptomoneda from "./../hooks/useCriptomoneda";
import axios from "axios";

import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
  // State del listado de criptomonedas
  const [criptomonedas, setCriptomonedas] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];
  // Utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

  // Utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    criptomonedas
  );

  // Ejecutar llamada a la API
  useEffect(() => {
    const constultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    constultarAPI();
  }, []);

  // Cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    // Validar campos vacios
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }
    // Pasar los datos al componente principal

    setError(false);
    setMoneda(moneda);
    setCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Hay un error" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

// Formulario.propTypes = {
//   setMoneda: PropTypes.func.isRequired,
//   setCriptomoneda: PropTypes.func.isRequired,
// };

export default Formulario;
