import React from 'react'
import '.././App.css'


function CartelInfo (props) {
    return (
        <div className="card text-white m-3 cartelInfo">
            <div className="card-body">
                <h3 className="card-title infoCard">{props.Titulo}</h3>
                <p className="card-text">{props.Subtitulo}</p>
            </div>
        </div>
        )   
    }


export default CartelInfo