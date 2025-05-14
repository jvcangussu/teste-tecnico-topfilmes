import Link from "next/link";
import styles from "./not-found.module.css";

export default function FilmeNotFound() {
  return (
    <div className={styles.container}>
      <h1>Erro 404!</h1>
      <h1>O filme que você buscava não foi encontrado!</h1>
      <Link href="/filmes" className={styles.link}>Clique aqui para voltar a nossa página de filmes!</Link>
    </div>
  )
}