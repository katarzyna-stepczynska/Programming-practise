import React from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

import styles from "./Pagination.module.css";

const Paginate = () => {
  return (
    <Pagination
      className={styles.ul}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
