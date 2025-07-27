import { Spin } from "antd";
import styles from "./styles.module.scss";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <Spin size="large" />
    </div>
  );
};

export default Preloader;
