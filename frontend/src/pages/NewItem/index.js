import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';
import './style.css';

export default function NewIncident (){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const rest_id = localStorage.getItem('rest_id');
    const history = useHistory();

    async function handleNewIncident(e){ //e = evento
        e.preventDefault();

        const data = {
            title, description, value
        }

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: rest_id
                }
            })

            history.push('/profileRest');
        } catch (err){
            alert('Erro ao cadastrar caso');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Ifood"/>
                    <h1> Cadastrar Novo Caso </h1>
                    <p> Descreva seu caso detalhadamente </p>
                    <Link className="back-link" to="/profile"> 
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link> 
                </section>
                    
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do caso"
                        value={ title } onChange={ e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição"
                    value={ description } onChange={ e => setDescription(e.target.value)} />
                    <input placeholder="Valor em Reais"
                    value={ value } onChange={ e => setValue(e.target.value)} />

                    <button className="button" type="submit" > Cadastrar </button>
                </form>
            </div>
        </div>
    );
}