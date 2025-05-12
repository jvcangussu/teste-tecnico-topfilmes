import Link from "next/link";
import styles from "./not-found.module.css";

export default function PaginaNotFound() {
  return (
    <div className={styles.container}>
      <h1>Erro 404!</h1>
      <h1>A página que você buscava não foi encontrada!</h1>
      <Link href="/" className={styles.link}>Clique aqui para voltar a nossa página inicial!</Link>
    </div>
  )
}