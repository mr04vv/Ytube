import * as React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/Error';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { Snackbar } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import useStyles from './styles';

interface PropsInterface {
  isShow: boolean;
  onClose: () => void;
  message: string;
  type: 'error' | 'success' | 'warning';
}

function SimpleSnackBar({
  isShow, onClose, message, type,
}: PropsInterface) {
  const classes = useStyles();
  const icons = {
    error: <Error className={classes.icon} />,
    success: <CheckCircle className={classes.icon} />,
    warning: <WarningIcon className={classes.icon} />,
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isShow}
        onClose={onClose}
      >
        <SnackbarContent
          className={classes[type]}
          message={(
            <span id="client-snackbar" className={classes.message}>
              {icons[type]}
              {message}
            </span>
          )}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
              <Close />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
}

export default SimpleSnackBar;
