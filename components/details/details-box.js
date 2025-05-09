import Image from "next/image";
import styles from "./details-box.module.css";
import { buscarFilmePorID, getNomesGeneros } from "@/services/filmesServices";

export default function DetailsBox({ idFilme, filmes, generos }) {
  const filme = buscarFilmePorID(filmes, idFilme);
  const nomesGeneros = getNomesGeneros(generos, filme.genre_ids);

  const conteudoGeneros = `Gêneros: ${nomesGeneros.join(", ")}`;

  let dataFormatada = new Date(filme.release_date);
  dataFormatada = Intl.DateTimeFormat('pt-BR').format(dataFormatada);

  return (
    <div className={styles.container}>
      <h1>{filme.title}</h1>
      <Image src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`} className={styles.backdrop} alt={`Banner do filme ${filme.title}`} width={485} height={273}></Image>
      <p>{conteudoGeneros}</p>
      <p>{filme.overview}</p>
      <p>Data de lançamento: {dataFormatada}</p>
      <p>Nota média: {filme.vote_average}</p>
      <button className={styles.button}>Adicionar à minha lista</button>
    </div>
  );
}