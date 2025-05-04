import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

export default function Card({ id, numero, poster, titulo, nota, emAlta, detalheEmModal }) {

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
        <Image src={poster} alt={titulo} className={styles.poster} width={177} height={266} />
        <span className={styles.title}>
          <p>
            {titulo}
          </p>
        </span>
        <p>
          Nota: {nota}
        </p>
        <Link href={detalheEmModal ? `/filmes/?idFilme=${id}` : `/filmes/${id}`}>
          <button className={styles.button}>
            Detalhes
          </button>
        </Link>
      </div>
    </div>
  );
}