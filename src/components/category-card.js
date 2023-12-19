import React from "react";

import PropTypes from "prop-types";

import styles from "./category-card.module.css";

const CategoryCard = (props) => {
  return (
    <div className={styles["category-card"]}>
      <img
        alt={props.image_alt}
        src={props.category_img}
        className={styles["image"]}
      />
      <span className={styles["text"]}>{props.name}</span>
    </div>
  );
};

CategoryCard.defaultProps = {
  category_img:
    "https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEyfHxjaGFpcnxlbnwwfHx8fDE2NTI4MTgxODk&ixlib=rb-1.2.1&w=1500",
  image_alt: "image",
  name: "Desks",
};

CategoryCard.propTypes = {
  category_img: PropTypes.string,
  image_alt: PropTypes.string,
  name: PropTypes.string,
};

export default CategoryCard;
