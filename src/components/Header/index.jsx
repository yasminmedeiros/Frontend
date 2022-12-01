/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () =>  {
    return (
        <header className="header">
            <div className="header-top">
                <div className="wrapper header-wrapper left">
                    <div className="header-end top">
                        {/* <a href="#">Educasenso</a> */}
                        {/* <a href="#">Saber</a> */}
                        {/* <a href="#">Ajuda</a> */}
                        {/* <a href="#">Novidades</a> */}
                        <a href="#" className="button">Sair</a>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="wrapper header-wrapper">
                    <div className="header-middle">
                        <a href="#" className="brand"><img src="./assets/img/logo-saber.png" alt="logo saber"></img></a>
                    </div>
                    <div className="header-start">
                        <nav className="nav">
                            <button className="nav-toggle" aria-expanded="false" type="button">
                                menu
                            </button>
                            <ul className="nav-wrapper">
                                <li className="nav-item"><Link to='/'>Escolas</Link></li>
                                <li className="nav-item"><Link to='/students'>Alunos</Link></li>
                                <li className="nav-item"><Link to='/professional'>Profissionais</Link></li>
                                {/* <li className="nav-item"><a href="#">Relatórios</a></li> */}
                                {/* <li className="nav-item"><a href="#">Aquisição de Materiais</a></li> */}
                            </ul>
                        </nav>
                    </div>

                    {/* <div className="header-end bottom">
                        <div className="search">
                            <button className="search-toggle" aria-label="Open search">
                                Pesquisar
                            </button>
                            <form className="search__form" action="">
                                <label className="sr-only" htmlFor="search">Pesquisar</label>
                                <input type="search" name="" id="search" placeholder="O que você procura?" />
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
        </header>
    );
}

export default Header;