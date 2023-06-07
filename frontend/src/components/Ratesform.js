import React, { useState } from 'react';

function RatesForm() {
  const [rates, setRates] = useState([]);
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
    const [rate, setRate] = useState('');

    const handleRateChange = (e) => {
    setRate(e.target.value);
    };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new rate object with weight and distance
    const newRate = {
      weight: parseFloat(weight),
      distance: parseFloat(distance),
        rate: parseFloat(rate),
    };

    // Send the new rate data to the server to save it
    // Example API request:
    fetch('http://localhost:3000/rates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRate),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the rates state with the newly added rate
        setRates([...rates, data]);
        // Clear the form inputs
        setWeight('');
        setDistance('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Rates Management</h2>
      
      {/* Render the rates list */}
      <ul>
        {rates.map((rate, index) => (
          <li key={index}>
            Weight: {rate.weight}, Distance: {rate.distance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatesForm;
