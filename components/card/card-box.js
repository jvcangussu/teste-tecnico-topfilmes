'use client'

import { carregarFilmesEmAlta, carregarFilmesTopRated, filmesEmDuasListas } from "@/services/filmesServices";
import { useState, useEffect } from "react";
import Card from "./card";
import styles from "./card-box.module.css"
import posterTeste from "@/assets/poster-teste.png"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CardBox() {
  const [filmes, setFilmes] = useState([]);
  const [emAlta, setEmAlta] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const dadosFilmes = await carregarFilmesTopRated();
      setFilmes(dadosFilmes);
      const dadosEmAlta = await carregarFilmesEmAlta();
      setEmAlta(dadosEmAlta);
    }

    fetchData();
  }, []);

  const [pagina, setPagina] = useState(1);
  const [filmesPagina, setFilmesPagina] = useState([])

  function handleClickLeft() {
    if (pagina > 1) {
      setPagina(pagina - 1)
    }
  }

  function handleClickRight() {
    if (pagina < 50) {
      setPagina(pagina + 1)
    }
  }

  useEffect(() => {
    const idxPrimeiroFilme = 5 * (pagina - 1);
    const idxUltimoFilme = idxPrimeiroFilme + 4;
    setFilmesPagina(filmes.slice(idxPrimeiroFilme, idxUltimoFilme + 1));
  }, [pagina, filmes]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {filmesPagina.map((filme, index) =>
          <Card
            key={index}
            numero={(pagina - 1) * 5 + index + 1}
            poster={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
            titulo={filme.title}
            nota={filme.vote_average}
            emAlta={filmesEmDuasListas(filmes, emAlta).includes(filme.id) ? true : false}
          />
        )}
      </div>
      <div className={styles.controls}>
        <button onClick={handleClickLeft} className={styles.control}>
          <FaChevronLeft className={styles.icon} />
        </button>
        <p>
          Página: <br />
          {pagina}/50
        </p>
        <button onClick={handleClickRight} className={styles.control}>
          <FaChevronRight className={styles.icon} />
        </button>
      </div>
    </div >
  );
}