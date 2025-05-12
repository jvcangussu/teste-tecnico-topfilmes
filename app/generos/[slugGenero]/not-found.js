import Link from "next/link";
import styles from "./not-found.module.css";

export default function GeneroNotFound() {
  return (
    <div className={styles.container}>
      <h1>Erro 404!</h1>
      <h1>O gênero que você buscava não foi encontrado!</h1>
      <Link href="/generos" className={styles.link}>Clique aqui para voltar a nossa página de gêneros!</Link>
    </div>
  )
}