import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';

interface Props {
  size: string;
  relative?: boolean;
}

const ProgressCircle: React.FC<Props> = ({ size, relative }) => {
  const classes = useStyles();

  return <CircularProgress className={relative ? classes.relative : classes.circle} size={size} />;
};

export default ProgressCircle;
