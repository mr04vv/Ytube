import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';

const ProgressCircle = ({ size, relative }: { size: string, relative?: boolean }) => {
  const classes = useStyles();

  return <CircularProgress className={relative ? classes.relative : classes.circle} size={size} />;
};

export default ProgressCircle;
