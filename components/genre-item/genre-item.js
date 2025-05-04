import Link from "next/link";
import styles from "./genre-item.module.css"
import { FaChevronRight } from "react-icons/fa";
import slugify from "slugify";
import { getNotaMediaFilmes } from "@/services/filmesServices";

export default function GenreItem({ index, nome, filmesGenero }) {

  const slugGenero = slugify(nome, { lower: true })

  return (
    <li className={index % 2 === 0 ? styles.containereven : styles.containerodd}>
      <span className={styles.info}><p>Gênero: {nome}</p></span>
      <span className={styles.info}><p>Quantidade de filmes: {filmesGenero.length}</p></span>
      <span className={styles.info}><p>Nota média: {getNotaMediaFilmes(filmesGenero)}</p></span>
      <Link href={`/generos/${slugGenero}`}>
        <button className={styles.button}>
          <FaChevronRight className={styles.icon} />
        </button>
      </Link>
    </li>
  )
}