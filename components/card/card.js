import Image from "next/image";
import styles from "./card.module.css";

export default function Card({ numero, poster, titulo, nota, emAlta }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.tag}
        style={{
          visibility: emAlta ? 'visible' : 'hidden'
        }}
      >
        EM ALTA
      </div>
      <div
        className={styles.card}
        style={{
          borderRadius: emAlta ? '0px 0px 16px 16px' : '16px'
        }}
      >
        <p>
          <b>#{numero}</b>
        </p>
        <Image src={poster} alt={titulo} className={styles.poster} />
        <p>
          {titulo}
        </p>
        <p>
          Nota: {nota}
        </p>
        <button className={styles.button}>
          Detalhes
        </button>
      </div>
    </div>
  );
}