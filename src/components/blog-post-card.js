import React from "react";

import PropTypes from "prop-types";

import projectStyles from ".style.module.css";
import styles from "./blog-post-card.module.css";

const BlogPostCard = (props) => {
  return (
    <div
      className={` ${styles["blog-post-card"]} ${styles[props.rootClassName]} `}
    >
      <img
        alt={props.image_alt}
        src={props.image_src}
        className={styles["image"]}
      />
      <div className={styles["container"]}>
        <span className={styles["text"]}>{props.new_prop}</span>
        <span className={styles["text1"]}>{props.description}</span>
        <a
          href={props.link_to}
          target="_blank"
          rel="noreferrer noopener"
          className={projectStyles["button"]}
        >
          Read more
        </a>
      </div>
    </div>
  );
};

BlogPostCard.defaultProps = {
  image_alt: "image",
  rootClassName: "",
  new_prop: "Chic sofa designs for 2022",
  image_src:
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHZlbmljZXxlbnwwfHx8fDE2MjYyNzIyOTA&ixlib=rb-1.2.1&w=1500",
  description: "Consectetur adipiscing elit duis tristique sollicitudin nibh",
  link_to: "",
};

BlogPostCard.propTypes = {
  image_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  new_prop: PropTypes.string,
  image_src: PropTypes.string,
  description: PropTypes.string,
  link_to: PropTypes.string,
};

export default BlogPostCard;
