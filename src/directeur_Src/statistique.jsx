import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Statistique() {
  const [roleData, setRoleData] = useState([]);
  const [niveauData, setNiveauData] = useState([]);
  const [moyenneData, setMoyenneData] = useState([]);
  const [SexeData, setSexeData] = useState([]);

  // Fonction pour récupérer les données des rôles
  const fetchRoleData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/nombreComptes');
      console.log(response.data);
      const formattedRoleData = response.data.map(item => {
        switch (item.role) {
          case 3:
            return { name: 'Parents', value: item.count };
          case 2:
            return { name: 'Enseignants', value: item.count };
          case 1:
            return { name: 'Administrateurs', value: item.count };
          default:
            return null;
        }
      }).filter(item => item !== null); // Filtrer les valeurs nulles
      setRoleData(formattedRoleData);
    } catch (error) {
      console.error('Error fetching role data:', error);
    }
  };

  // Fonction pour récupérer les données des niveaux
  const fetchNiveauData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/nombreEleves');
      console.log(response.data);
      const formattedNiveauData = response.data.map(item => {
        switch (item.niveau) {
          case "1AM":
            return { name: '1AM', value: item.count };
          case "2AM":
            return { name: '2AM', value: item.count };
          case "3AM":
            return { name: '3AM', value: item.count };
          case "4AM":
            return { name: '4AM', value: item.count };
          default:
            return null;
        }
      }).filter(item => item !== null);
      setNiveauData(formattedNiveauData);
    } catch (error) {
      console.error('Error fetching niveau data:', error);
    }
  };

  const fetchMoyenneData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/moyennes');
      console.log(response.data);
  
      // Initialize counts
      let ajourneCount = 0;
      let admisCount = 0;
  
      // Aggregate data
      response.data.forEach(item => {
        if (item.moyenne < 10) {
          ajourneCount += item.count;
        } else {
          admisCount += item.count;
        }
      });
  
      const formattedMoyenneData = [
        { name: 'ajourné', value: ajourneCount },
        { name: 'admis', value: admisCount }
      ];
  
      setMoyenneData(formattedMoyenneData);
    } catch (error) {
      console.error('Error fetching moyenne data:', error);
    }
  };
    
  


  const fetchSexeData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sexeEleves');
      console.log(response.data);
      const formattedSexeData = response.data.map(item => {
        switch (item.sexe) {
          case "male":
            return { name: 'male', value: item.count };
          case "femele":
            return { name: 'femelle', value: item.count };
          default:
            return null;
        }
      }).filter(item => item !== null);
      setSexeData(formattedSexeData);
    } catch (error) {
      console.error('Error fetching niveau data:', error);
    }
  };

  useEffect(() => {
    fetchRoleData();
    fetchNiveauData();
    fetchSexeData();
    fetchMoyenneData();
  }, []);


  return (
    <div>
      <h1 className='h11'>Statistique</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2%' }}>
        <div style={{ flex: '1 0 50%', height: 400 }}>
          <ResponsiveContainer>
            <label>⭕𝐂𝐞𝐫𝐜𝐥𝐞 𝐫𝐞𝐥𝐚𝐭𝐢𝐟 𝐫𝐞𝐩𝐫𝐞́𝐬𝐞𝐧𝐭𝐞 𝐥𝐞𝐬 𝐞𝐥𝐞𝐦𝐞𝐧𝐭𝐬 𝐝𝐮 𝐩𝐥𝐚𝐭𝐞𝐟𝐨𝐫𝐦𝐞 </label>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={roleData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: '1 0 50%', height: 400 }}>
          <ResponsiveContainer>
            <label>⭕𝗖𝗲𝗿𝗰𝗹𝗲 𝗿𝗲𝗹𝗮𝘁𝗶𝗳 𝗿𝗲𝗽𝗿𝗲́𝘀𝗲𝗻𝘁𝗲 𝙉𝙚𝙢𝙗𝙧𝙚𝙨 𝙙'𝙚́𝙡𝙚́𝙫𝙚𝙨 𝙖𝙙𝙢𝙞𝙨 𝙚𝙩 𝙖𝙟𝙤𝙪𝙧𝙣𝙚́</label>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={niveauData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: '1 0 50%', height: 400 }}>
          <ResponsiveContainer>
            <label>⭕𝗖𝗲𝗿𝗰𝗹𝗲 𝗿𝗲𝗹𝗮𝘁𝗶𝗳 𝗿𝗲𝗽𝗿𝗲́𝘀𝗲𝗻𝘁𝗲 𝗹𝗲 𝗻𝗼𝗺𝗯𝗿𝗲𝘀 𝗱'𝗲𝗹𝗲𝘃𝗲𝘀 𝙖𝙙𝙢𝙞𝙨 𝙚𝙩 𝙖𝙟𝙤𝙪𝙧𝙣𝙚́ </label>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={moyenneData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#ffc658"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: '1 0 50%', height: 400 }}>
          <ResponsiveContainer>
            <label>⭕𝗖𝗲𝗿𝗰𝗹𝗲 𝗿𝗲𝗹𝗮𝘁𝗶𝗳 𝗿𝗲𝗽𝗿𝗲́𝘀𝗲𝗻𝘁𝗲 𝗹𝗲 𝗻𝗼𝗺𝗯𝗿𝗲𝘀 𝗱𝗲𝘀 𝗳𝗲𝗺𝗶𝗻𝗶𝗻 𝗲𝘁 𝗺𝗮𝘀𝗰𝘂𝗹𝗶𝗻</label>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={SexeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#d0ed57"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Statistique;
