/* eslint-disable react/jsx-props-no-spreading */
//There is Multiples types of paginate because I dispatch inside paginate

/* import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom' */
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
//import { getPostBySearch } from '../features/post/postSlice';

const PaginateHomeSearched = ({searchQuery, page, numberOfPages }) => {
 // const dispatch = useDispatch()
  //const location = useLocation()
  //const { numberOfPages } = useSelector((state) => state.posts)
  //const path = location.pathname

  /* let post;

  if(Array.isArray(posts)) {
    post = posts
  } else {
    const destructuredPosts = posts.posts
    post = destructuredPosts
  }  */

  /* useEffect(() => {
    if (page) {
      dispatch(getPostBySearch ({searchQuery, page}))
    }
  }, [dispatch, page]); */

  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
              <PaginationItem {...item} component={Link} to={`/home_searched?searchQuery=${searchQuery}&page=${item.page}`} />
      )}
    />
  );
};

export default PaginateHomeSearched;
