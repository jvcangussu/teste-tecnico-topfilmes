'use client'

import Card from "@/components/card/card";
import styles from "./page.module.css"
import SecondaryHeader from "@/components/secondary-header/secondary-header";
import { filmesEmDuasListas, carregarFilmesTopRated, carregarFilmesEmAlta } from "@/services/filmesServices";
import { useState, useEffect } from "react";

export default function FilmesEmAltaPage() {
  const [filmes, setFilmes] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  let numeroFilme = 0;

  useEffect(() => {
    async function fetchData() {
      const dadosFilmes = await carregarFilmesTopRated();
      setFilmes(dadosFilmes);
      const dadosEmAlta = await carregarFilmesEmAlta();
      setEmAlta(dadosEmAlta);
    }

    fetchData();
  }, []);

  const filmesEmAlta = filmesEmDuasListas(filmes, emAlta);

  return (
    <div className={styles.container}>
      <SecondaryHeader>FILMES EM ALTA</SecondaryHeader>
      <p>{`Total de filmes em alta: ${filmesEmAlta.length}`}</p>
      <div className={styles.box}>
        {filmes.map((filme, index) => {
          if (filmesEmAlta.includes(filme.id)) {
            numeroFilme++;
            return (
              <Card
                key={index}
                id={filme.id}
                numero={numeroFilme}
                poster={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                titulo={filme.title}
                nota={filme.vote_average}
                emAlta={filmesEmAlta.includes(filme.id) ? true : false}
                detalheEmModal={false}
              />
            )
          }
        }
        )}
      </div>
    </div>
  );
}