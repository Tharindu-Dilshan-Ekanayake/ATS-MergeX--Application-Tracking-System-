import React from 'react';

const Card = ({ title, value }) => {
    return (
        <div style={{backgroundImage: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 100%)',borderRadius: '30px',display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'#191919', width:'170px', height:'170px'}}>
            <div>
                <p style={{color:'#ffffff', fontSize:'0.9rem', textAlign:'center'}}>{title}</p>
                <h1 style={{color:'#EA7122', fontSize: '5rem',textAlign: 'center'}}>{value}</h1>
            </div>
        </div>
    );
};

export default Card;