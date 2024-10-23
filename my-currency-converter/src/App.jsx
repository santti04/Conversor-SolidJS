import { createSignal } from "solid-js";
import "./App.css"; // Importamos los estilos

const App = () => {
  const [amount, setAmount] = createSignal(1);
  const [fromCurrency, setFromCurrency] = createSignal("USD");
  const [toCurrency, setToCurrency] = createSignal("EUR");
  const [result, setResult] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(null);

  const convertCurrency = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/fa50e337dcd0ef0d20b49639/pair/${fromCurrency()}/${toCurrency()}/${amount()}`
      );
      const data = await response.json();
      if (data.result === "success") {
        setResult(data.conversion_result);
      } else {
        setError("Error en la conversión");
      }
    } catch (e) {
      setError("No se pudo conectar con la API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container">
      <h1>Conversor de Divisas</h1>
      <div class="input-group">
        <label>Cantidad: </label>
        <input
          type="number"
          value={amount()}
          onInput={(e) => setAmount(e.target.value)}
        />
      </div>
      <div class="input-group">
        <label>De: </label>
        <select value={fromCurrency()} onInput={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ARS">ARS</option>
        </select>
      </div>
      <div class="input-group">
        <label>A: </label>
        <select value={toCurrency()} onInput={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="ARS">ARS</option>
        </select>
      </div>
      <button onClick={convertCurrency}>Convertir</button>
      {loading() && <p>Convirtiendo...</p>}
      {result() && <p>Resultado: {amount()} {fromCurrency()} = {result()} {toCurrency()}</p>}
      {error() && <p style={{ color: "red" }}>{error()}</p>}
    </div>
  );
};

export default App;
