import { useState } from "react";
import { Container } from "../container/Container";
import styles from "./Header.module.css";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";

export const Header = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.headerContainer}>
          <Modal active={modalActive} setActive={setModalActive}>
            <p>Add task form here</p>
          </Modal>
          <div>Logo</div>
          <nav>
            <ul>
              <li>
                <Button onClickHandler={() => setModalActive(true)}>Add Task</Button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};
