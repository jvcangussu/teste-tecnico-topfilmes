import styles from "./footer.module.css";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.infoText}>
        Desenvolvido por: João Vitor Cangussu
      </span>
      <div className={styles.icons}>
        <a href="https://www.linkedin.com/in/jvcangussu/" target="_blank" className={styles.icon}>
          <FaLinkedin />
        </a>
        <a href="https://github.com/jvcangussu" target="_blank" className={styles.icon}>
          <FaGithubSquare />
        </a>
      </div>
    </footer>
  );
}