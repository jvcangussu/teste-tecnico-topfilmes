import Image from "next/image";
import styles from "./main-header.module.css";
import logo from "@/assets/logo.png";
import Link from "next/link";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} href="/">
        <Image src={logo} alt="Logo Top Filmes" />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink href="/filmes">MELHORES FILMES</NavLink>
          </li>
          <li>
            <NavLink href="/generos">GÊNEROS</NavLink>
          </li>
        </ul>
      </nav>
      <Link className={styles.button} href="/filmes/meus-filmes">
        <p>
          MEUS<br />
          FILMES
        </p>
      </Link>
    </header>
  );
}