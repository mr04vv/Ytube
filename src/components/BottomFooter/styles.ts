import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 1000,
    textAlign: 'center',
    '@media (min-width: 1261px)': {
      display: 'none',
    },
  },
  icon: {
    minWidth: '50px',
    '&$selected': {
      color: '#e85c9c',
    },
    // This is required for the '&$selected' selector to work
  },
  selected: {},
});

export default useStyles;
