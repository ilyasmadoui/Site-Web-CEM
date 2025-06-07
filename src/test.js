import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
