'use client'

import { useState } from "react";
import Card from "./card";
import styles from "./card-box.module.css"
import posterTeste from "@/assets/poster-teste.png"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CardBox() {
  const [pagina, setPagina] = useState(1);

  function handleClickLeft() {
    if (pagina > 1) {
      setPagina(pagina - 1)
    }
  }

  function handleClickRight() {
    if (pagina < 50) {
      setPagina(pagina + 1)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Card numero={1} poster={posterTeste} titulo={"A vida é bela"} nota={9.25} emAlta={true} />
        <Card numero={2} poster={posterTeste} titulo={"A vida é bela"} nota={9.25} emAlta={false} />
        <Card numero={3} poster={posterTeste} titulo={"A vida é bela"} nota={9.25} emAlta={true} />
        <Card numero={4} poster={posterTeste} titulo={"A vida é bela"} nota={9.25} emAlta={false} />
        <Card numero={5} poster={posterTeste} titulo={"A vida é bela"} nota={9.25} emAlta={true} />
      </div>
      <div className={styles.controls}>
        <button onClick={handleClickLeft} className={styles.control}>
          <FaChevronLeft className={styles.icon} />
        </button>
        <p>
          Página: <br />
          {pagina}/50
        </p>
        <button onClick={handleClickRight} className={styles.control}>
          <FaChevronRight className={styles.icon} />
        </button>
      </div>
    </div >
  );
}