import { carregarFilmesTopRated, carregarGeneros, getFilmePorSlug } from "@/services/filmesServices";
import styles from "./page.module.css"
import DetailsBox from "@/components/details/details-box";
import SecondaryHeader from "@/components/secondary-header/secondary-header";
import { notFound } from "next/navigation";

export default async function FilmesPage({ params }) {

  const { slugFilme } = await params;
  const filme = await getFilmePorSlug(slugFilme);
  if (!filme) {
    notFound();
  }
  const idFilme = filme.id;
  const filmes = await carregarFilmesTopRated();
  const generos = await carregarGeneros();

  return (
    <>
      <SecondaryHeader>DETALHES DO FILME</SecondaryHeader>
      <div className={styles.container}>
        <DetailsBox idFilme={idFilme} filmes={filmes} generos={generos} />
      </div>
    </>
  );
}