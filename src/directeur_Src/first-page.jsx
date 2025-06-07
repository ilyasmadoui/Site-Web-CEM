import React, { useState } from 'react';
import './directeur.css';
import image_director from './pic/dir4.png';
import bg from './pic/bg1.jpg';
import { Link } from "react-router-dom";

function SideBarMenu() {
  
  return (
    <div id="content">
      <div className='div1'>👥 𝙶𝚎𝚜𝚝𝚒𝚘𝚗 𝚍𝚎𝚜 𝚌𝚘𝚖𝚙𝚝𝚎𝚜</div>
      <button className='button1' onClick={() => window.location.href= '/DirecteurProfile/demandes'}>🧾 𝙡𝙞𝙨𝙩𝙚 𝙙𝙚𝙨 𝙙𝙚𝙢𝙢𝙖𝙣𝙙𝙚𝙨</button>
      <button className='button1' onClick={()=> window.location.href= '/DirecteurProfile/comptes'}>🧾 𝑳𝒊𝒔𝒕𝒆 𝒅𝒆𝒔 𝒄𝒐𝒎𝒑𝒕𝒆𝒔</button>
      <div className='div1'>👫 𝙶𝚎𝚜𝚝𝚒𝚘𝚗 𝚍𝚎𝚜 𝚎́𝚕𝚎́𝚟𝚎𝚜</div>
      <button className='button1' onClick={()=> window.location.href= '/DirecteurProfile/eleves'}>🧾 𝙡𝙞𝙨𝙩𝙚 𝙙𝙚𝙨 𝙚́𝙡𝙚́𝙫𝙚</button>
      <button className='button1' onClick={()=> window.location.href= '/DirecteurProfile/addEleve'}>👩‍💼 𝘼𝙟𝙤𝙪𝙩𝙚𝙧 𝙪𝙣 𝙚́𝙡𝙚́𝙫𝙚</button>
      <div className='div1'>autres</div>
      <button className='button1' onClick={()=> window.location.href= '/DirecteurProfile/stat'}>📊 𝘀𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗾𝘂𝗲</button>
      <button className='button1' onClick={()=> window.location.href= '/DirecteurProfile/addEleve'}>📢 𝗮𝗻𝗻𝗮𝗻𝗰𝗲𝘀</button>

    </div>
  );
}

export default SideBarMenu;
