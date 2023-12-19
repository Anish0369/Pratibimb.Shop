import React from "react";
import PropTypes from "prop-types";
// import projectStyles from "./style.module.css";
import styles from "./section-heading.module.css";

const SectionHeading = (props) => {
  return (
    <div className={`${styles["section-heading"]} ${props.rootClassName}`}>
      <h1 className={`${styles["text"]} ${styles["heading-2"]}`}>
        {props.heading}
      </h1>
      <span className={styles["text1"]}>{props.subtitle}</span>
    </div>
  );
};

SectionHeading.defaultProps = {
  heading: "TRENDING ITEMS",
  subtitle:
    "Explore our monthly most trending products, new items and the best Mobilio offers you can buy",
  rootClassName: "",
};

SectionHeading.propTypes = {
  heading: PropTypes.string,
  subtitle: PropTypes.string,
  rootClassName: PropTypes.string,
};

export default SectionHeading;
