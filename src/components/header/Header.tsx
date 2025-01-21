import { useState } from "react";
import { Container } from "../container/Container";
import styles from "./Header.module.css";

export const Header = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.headerContainer}>
          <div>Logo</div>
          <nav>
            <ul>
              <li>
                Login
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};
