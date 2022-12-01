import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    '& .Mui-selected': {
      color: '#fff',
      backgroundColor:"#268744",
    },
  },
});

export function CustomPagination(props) {
  const { pagination, api } = props;
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      page={pagination.page}
      count={pagination.pageCount}
      onChange={(event, value) => api.current.setPage(value)}
    />
  );
}

CustomPagination.propTypes = {
  /**
   * ApiRef that let you manipulate the grid.
   */
  api: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
  /**
   * The object containing all pagination details in [[PaginationState]].
   */
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    paginationMode: PropTypes.oneOf(['client', 'server']).isRequired,
    rowCount: PropTypes.number.isRequired,
  }).isRequired,
};