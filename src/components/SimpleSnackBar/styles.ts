import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  close: {
    padding: theme.spacing(0.5),
  },
  error: {
    backgroundColor: '#d32f2f',
  },
  success: {
    backgroundColor: '#43a047',
  },
  warning: {
    backgroundColor: '#ffa000',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
