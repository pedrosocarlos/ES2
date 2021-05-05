import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('users', { id });

            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);

            history.push('/');
        } catch(err){
            alert('kkkk errouuu');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                        value={ id } onChange={ e => setId(e.target.value) } />
                    <button className="button" type="submit"> Entrar </button>

                    <Link className="back-link" to="/registerU"> 
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro 
                    </Link> 
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}