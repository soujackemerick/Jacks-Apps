import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [neck, setNeck] = useState('');
  const [abdomen, setAbdomen] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const calculateBodyComposition = (e) => {
    e.preventDefault();
    setError('');
    setResults(null);

    const numHeight = parseFloat(height);
    const numWeight = parseFloat(weight);
    const numAge = parseFloat(age);
    const numNeck = parseFloat(neck);
    const numAbdomen = parseFloat(abdomen);

    if (isNaN(numHeight) || isNaN(numWeight) || isNaN(numAge) || isNaN(numNeck) || isNaN(numAbdomen) || numHeight <= 0 || numWeight <= 0 || numAge <= 0 || numNeck <= 0 || numAbdomen <= 0) {
      setError('Por favor, preencha todos os campos com valores positivos.');
      return;
    }
    
    if (numAbdomen <= numNeck) {
        setError('A medida do abdômen deve ser maior que a do pescoço.');
        return;
    }

    // 1. Percentual de gordura corporal (%)
    const fatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(numAbdomen - numNeck) + 0.15456 * Math.log10(numHeight)) - 450;

    // 2. BMI (Índice de Massa Corporal)
    const heightInMeters = numHeight / 100;
    const bmi = numWeight / (heightInMeters * heightInMeters);

    // 3. Massa gorda (kg)
    const fatMass = numWeight * (fatPercentage / 100);

    // 4. Massa magra (kg)
    const leanMass = numWeight - fatMass;

    setResults({
      "Percentual de Gordura": `${fatPercentage.toFixed(1)}%`,
      "BMI": parseFloat(bmi.toFixed(2)),
      "Massa Gorda (kg)": parseFloat(fatMass.toFixed(2)),
      "Massa Magra (kg)": parseFloat(leanMass.toFixed(2)),
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Calculadora de Composição Corporal</h1>
        <p>Insira seus dados para calcular os indicadores de composição corporal.</p>
      </header>
      <form onSubmit={calculateBodyComposition}>
        <div className="input-group">
          <label htmlFor="height">Altura (cm)</label>
          <input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Ex: 180" />
        </div>
        <div className="input-group">
          <label htmlFor="weight">Peso (kg)</label>
          <input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Ex: 86" />
        </div>
        <div className="input-group">
          <label htmlFor="age">Idade (anos)</label>
          <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ex: 30" />
        </div>
        <div className="input-group">
          <label htmlFor="neck">Pescoço (cm)</label>
          <input id="neck" type="number" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="Ex: 40" />
        </div>
        <div className="input-group">
          <label htmlFor="abdomen">Abdômen (cm)</label>
          <input id="abdomen" type="number" value={abdomen} onChange={(e) => setAbdomen(e.target.value)} placeholder="Ex: 90" />
        </div>
        <button type="submit">Calcular</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {results && (
        <div className="results-container" aria-live="polite">
          <h2>Seus Resultados:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
