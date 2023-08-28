/* eslint-disable react/jsx-props-no-spreading */
//There is Multiples types of paginate because I dispatch inside paginate

import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

const PaginateMyHomes = ({userid, page, numberOfPages}) => {
  
  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
              <PaginationItem {...item} component={Link} to={`/my_homes?userid=${userid}&page=${item.page}`} />
      )}
    />
  );
};

export default PaginateMyHomes;
