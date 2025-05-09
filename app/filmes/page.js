import MainHeader from "@/components/main-header/main-header";
import styles from "./page.module.css";
import Link from "next/link";
import CardBox from "@/components/card/card-box";
import { Suspense } from "react";
import { carregarFilmesEmAlta, carregarFilmesTopRated, carregarGeneros } from "@/services/filmesServices";

async function Filmes() {
  const filmes = await carregarFilmesTopRated();
  const filmesEmAlta = await carregarFilmesEmAlta();
  const generos = await carregarGeneros();
  return <CardBox filmes={filmes} emAlta={filmesEmAlta} generos={generos} />;
}


export default function FilmesPage() {

  return (
    <>
      <MainHeader />
      <div className={styles.linksContainer}>
        <Link href="/filmes/em-alta" className={styles.link}>
          <p>Apenas filmes em alta</p>
        </Link>
        <Link href="/filmes/filmes-por-ano" className={styles.link}>
          <p>Filmes por ano de lançamento</p>
        </Link>
      </div>
      <Suspense fallback={<p className={styles.loading}>Carregando filmes...</p>}>
        <Filmes />
      </Suspense>
    </>
  );
}