import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    top: '100px',
    height: '200px',
    position: 'fixed',
    left: '40px',
    zIndex: 1000,
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    '@media (max-width: 1260px)': {
      display: 'none',
    },
  },
  icon: {
    '&$selected': {
      color: '#ffe62b',
    },
    // This is required for the '&$selected' selector to work
  },
  selected: {},
});

export default useStyles;
