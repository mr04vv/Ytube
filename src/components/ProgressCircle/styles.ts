import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => createStyles({
  circle: {
    margin: '0 auto',
    display: 'block',
    position: 'absolute',
  },
  relative: {
    margin: '0 auto',
    display: 'block',
  },
}));

export default useStyles;
