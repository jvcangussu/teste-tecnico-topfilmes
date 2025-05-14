import SecondaryHeader from "@/components/secondary-header/secondary-header";
import { getGeneroPorSlug, getFilmesGenero, carregarFilmesTopRated, carregarFilmesEmAlta, filmesEmDuasListas } from "@/services/filmesServices";
import styles from "./page.module.css"
import Card from "@/components/card/card";
import { notFound } from "next/navigation";

export default async function GeneroPage({ params }) {

  const { slugGenero } = await params;
  const genero = await getGeneroPorSlug(slugGenero);
  if (!genero) {
    notFound();
  }
  const filmes = await carregarFilmesTopRated();
  const filmesGenero = await getFilmesGenero(filmes, genero.id);
  const listaEmAlta = await carregarFilmesEmAlta();
  const filmesEmAlta = await filmesEmDuasListas(filmes, listaEmAlta);

  let numeroFilme = 0;

  return (
    <div>
      <SecondaryHeader> {`FILMES ${genero.name.toUpperCase()}`} </SecondaryHeader>
      <div className={styles.box}>
        {filmesGenero.map((filme, index) => {
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
            />)
        }
        )}
      </div>
    </div>
  );
}