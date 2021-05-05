import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import './styles.css'

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function HandleRegister(e){
        e.preventDefault();

        const data = {
            name, email, city, uf
        };

        try {
            const response = await api.post('users', data);

            alert(`Seu Id: ${response.data.id}`);//esse `` serve da mesma forma que '', mas envia valores dentro ${}
            history.push('/');
        } catch (err){
            alert('Erro, tente novamente')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Ifood"/>
                    <h1> Cadastro </h1>
                    <p> Faça seu cadastro, entre na plataforma e faça seus pedidos </p>
                    <Link className="back-link" to="/"> 
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho cadastro 
                    </Link> 
                </section>
                    
                <form onSubmit={HandleRegister}>
                    <input placeholder="Nome" 
                        value={name} onChange={ e => setName(e.target.value) } />

                    <input type="email" placeholder="Email" 
                        value={email} onChange={ e => setEmail(e.target.value) } />

                    <div className="input-group">
                        <input placeholder="Cidade" 
                            value={city} onChange={ e => setCity(e.target.value) } />

                        <input placeholder="UF" style={{ width: 80 }}
                            value={uf} onChange={ e => setUf(e.target.value) } />

                    </div>
                    <button className="button" type="submit" > Cadastrar </button>
                </form>
            </div>
        </div>
    );
}