'use client'

import { carregarFilmesEmAlta, carregarFilmesTopRated, carregarGeneros, filmesEmDuasListas } from "@/services/filmesServices";
import { useState, useEffect } from "react";
import Card from "./card";
import styles from "./card-box.module.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from "../details/modal";
import { useSearchParams } from "next/navigation";
import DetailsBox from "../details/details-box";
import { useRouter } from "next/navigation";

export default function CardBox() {
  let searchParams = useSearchParams();
  let router = useRouter();

  const [filmes, setFilmes] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const dadosFilmes = await carregarFilmesTopRated();
      setFilmes(dadosFilmes);
      const dadosEmAlta = await carregarFilmesEmAlta();
      setEmAlta(dadosEmAlta);
      const dadosGeneros = await carregarGeneros();
      setGeneros(dadosGeneros);
    }

    fetchData();
  }, []);

  const filmesEmAlta = filmesEmDuasListas(filmes, emAlta);

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
      {searchParams.get("idFilme") && (
        <Modal onClose={() => {
          router.push("/filmes");
        }}>
          <DetailsBox idFilme={searchParams.get("idFilme")} filmes={filmes} generos={generos} />
        </Modal>
      )}
      <div className={styles.box}>
        {filmesPagina.map((filme, index) =>
          <Card
            key={index}
            id={filme.id}
            numero={(pagina - 1) * 5 + index + 1}
            poster={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
            titulo={filme.title}
            nota={filme.vote_average}
            emAlta={filmesEmAlta.includes(filme.id) ? true : false}
            detalheEmModal={true}
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