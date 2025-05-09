import { carregarFilmesEmAlta, carregarFilmesTopRated, filmesEmDuasListas, getAnosEFilmesPorAno } from "@/services/filmesServices";
import styles from "./page.module.css"
import SecondaryHeader from "@/components/secondary-header/secondary-header";
import Card from "@/components/card/card";

export default async function FilmesPorAnoPage() {

  const filmes = await carregarFilmesTopRated();
  const filmesEmAlta = await carregarFilmesEmAlta();
  const listaEmAlta = filmesEmDuasListas(filmes, filmesEmAlta);
  const filmesPorAno = getAnosEFilmesPorAno(filmes);

  return (
    <div>
      <SecondaryHeader>FILMES POR ANO</SecondaryHeader>
      {filmesPorAno.map((ano) =>
        <div key={ano.ano}>
          <div className={styles.titleBox}>
            <p>ANO {ano.ano} <br />
              QUANTIDADE DE FILMES: {ano.listaFilmes.length}
            </p>
          </div>
          <div className={styles.box}>
            {ano.listaFilmes.map((filme, index) =>
              <Card
                key={index}
                id={filme.id}
                numero={index + 1}
                poster={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                titulo={filme.title}
                nota={filme.vote_average}
                emAlta={listaEmAlta.includes(filme.id) ? true : false}
                detalheEmModal={false}
              />
            )}
          </div>

        </div>
      )}
    </div>
  );
}