import GenreItem from "@/components/genre-item/genre-item";
import styles from "./page.module.css"
import { carregarFilmesTopRated, carregarGeneros, getFilmesGenero, getNotaMediaFilmes } from "@/services/filmesServices";
import MainHeader from "@/components/main-header/main-header";
import BarChartComponent from "@/components/charts/bar-chart-component";

export default async function GenerosPage() {

  const listaFilmes = await carregarFilmesTopRated();
  const listaGeneros = await carregarGeneros();

  const data = listaGeneros.map(genero => (
    {
      name: genero.name,
      value: getNotaMediaFilmes(getFilmesGenero(listaFilmes, genero.id))
    }
  ))

  return (
    <>
      <MainHeader />
      <div className={styles.chartCard}>
        <BarChartComponent data={data} />
      </div>
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