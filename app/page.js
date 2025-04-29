import Image from "next/image";
import logo from "@/assets/logo.png"
import styles from "./page.module.css"
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image src={logo} className={styles.logo} alt="Top Filmes, encontre aqui os melhores filmes existentes!" />
      <Link href="/filmes">
        <button className={styles.button}>
          Quero descobrir os melhores filmes!
        </button>
      </Link>
    </main>
  );
}
