import React from "react";
import NoDataImage from '../../assets/no-data.png';

import './styles.css';

export const NoDataMessage = () => {
    return (
       <div className="title-nocontent">
           <h1>Nenhum dado encontrado</h1>
           <img src={NoDataImage}></img>
       </div> 
    );
}