import MainHeader from "@/components/main-header/main-header";
import styles from "./page.module.css";
import Link from "next/link";

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
    </>
  );
}