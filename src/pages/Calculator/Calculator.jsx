import React, { useState } from 'react';
import './Calculator.css'; 

const Calculator = () => {
  const [margin, setMargin] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [riskPercentage, setRiskPercentage] = useState('');
  const [stops, setStops] = useState(null);
  const [loss, setLoss] = useState(null);
  const [idealLeverage, setIdealLeverage] = useState(null);
  const [orderSize, setOrderSize] = useState(null);

  const calculate = () => {
    const marginValue = parseFloat(margin);
    const entryValue = parseFloat(entryPrice);
    const stopLossValue = parseFloat(stopLoss);
    const riskValue = parseFloat(riskPercentage) / 100;

    if (isNaN(marginValue) || isNaN(entryValue) || isNaN(stopLossValue) || isNaN(riskValue)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const stopsValue = stopLossValue - entryValue;
    setStops(stopsValue);


    const lossValue = marginValue * riskValue;
    setLoss(lossValue);


    const leverageValue = (lossValue * entryValue) / (marginValue * stopsValue);
    setIdealLeverage(leverageValue);

    const orderSizeValue = marginValue * leverageValue;
    setOrderSize(orderSizeValue);
  };

  return (
    <div className="calculator">
      <h1>Leverage Calculator</h1>
      <div>
        <label>Margin : </label>
        <input 
          type="number" 
          value={margin} 
          onChange={(e) => setMargin(e.target.value)} 
        />
      </div>
      <div>
        <label>Entry Price: </label>
        <input 
          type="number" 
          value={entryPrice} 
          onChange={(e) => setEntryPrice(e.target.value)} 
        />
      </div>
      <div>
        <label>Stop Loss: </label>
        <input 
          type="number" 
          value={stopLoss} 
          onChange={(e) => setStopLoss(e.target.value)} 
        />
      </div>
      <div>
        <label>Risk %: </label>
        <input 
          type="number" 
          value={riskPercentage} 
          onChange={(e) => setRiskPercentage(e.target.value)} 
        />
      </div>
      <button onClick={calculate}>Calculate</button>

      {stops !== null && <div>Stops: {stops.toFixed(2)}</div>}
      {loss !== null && <div>Loss: {loss.toFixed(2)}</div>}
      {idealLeverage !== null && <div>Ideal Leverage: {idealLeverage.toFixed(2)}x</div>}
      {orderSize !== null && <div>Order Size: ${orderSize.toFixed(2)}</div>}
    </div>
  );
};

export default Calculator;