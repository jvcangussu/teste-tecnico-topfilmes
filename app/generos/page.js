import GenreItem from "@/components/genre-item/genre-item";
import styles from "./page.module.css"
import { carregarFilmesTopRated, carregarGeneros, getFilmesGenero } from "@/services/filmesServices";
import MainHeader from "@/components/main-header/main-header";

export default async function GenerosPage() {

  const listaFilmes = await carregarFilmesTopRated();
  const listaGeneros = await carregarGeneros();

  return (
    <>
      <MainHeader />
      <ul className={styles.list}>
        {
          listaGeneros.map((genero, index) => (
            <GenreItem key={index} index={index} nome={genero.name} filmesGenero={getFilmesGenero(listaFilmes, genero.id)} />
          ))
        }
      </ul>

    </>
  );
}