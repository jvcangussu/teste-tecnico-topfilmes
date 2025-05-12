"use client"

import { useRouter } from "next/navigation";
import styles from "./secondary-header.module.css"
import { RiArrowGoBackFill } from "react-icons/ri";

export default function SecondaryHeader({ children }) {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <button onClick={() => { router.back() }} className={styles.control}><RiArrowGoBackFill className={styles.icon} /></button>
      <p>{children}</p>
    </header>
  )
}