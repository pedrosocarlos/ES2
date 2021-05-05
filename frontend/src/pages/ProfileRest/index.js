import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg'
import './style.css';

export default function Profile (){
    const [menu, setMenu] = useState([]);
    const restName = localStorage.getItem('restName');
    const rest_id = localStorage.getItem('rest_id');

    const history = useHistory(); 

    //toda vez queo segundo param muda, ele executa a função
    useEffect(() => {
        api.get('profileRest', {
            headers: {
                authorization: rest_id,
            }
        }).then(Response => {
            setMenu(Response.data);
        })
    }, [rest_id]);

    async function handleDeleteMenu(id){
        try{
            await api.delete(`menu/${id}`, {
                headers: {
                    Authorization: rest_id
                }
            });

            setMenu(menu.filter(menu => menu.id !== id));
        } catch (err) {
            alert('Erro ao deletar, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Ifood"/>
                <span> Bem Vindo, { restName } </span>

                <Link className="button" to="/menu/new" > Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size={ 18 } color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                { menu.map(menu => ( //mesma coisa que um return esse ()ao invez de {return}
                    <li key={menu.id} >
                        
                        <strong> Caso: </strong>
                        <p> { menu.title } </p>

                        <strong> Descrição </strong>
                        <p> { menu.description } </p>

                        <strong> Valor: </strong>
                        <p> { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                            .format(menu.value) } </p>

                        
                        <button onClick={() => handleDeleteMenu(menu.id) } type="button"> 
                            <FiTrash2 size={ 20 } color="#a8a8b3" />
                        </button>
                    </li>
                )) }
            </ul>

        </div>
    );
}