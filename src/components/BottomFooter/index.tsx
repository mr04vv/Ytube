import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import History from '@material-ui/icons/Home';
// import SearchIcon from '@material-ui/icons/Search';
import NotificationsNone from '@material-ui/icons/HelpOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useNavigation from 'hooks/Footer/useNavigation';
import useStyles from './styles';

const BottomFooter = () => {
  const classes = useStyles();
  const nav = useNavigation();

  return (
    <BottomNavigation showLabels value={nav.value} onChange={nav.handleChange} className={classes.root}>
      <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/home" icon={<History />} />
      {/* <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/" icon={<SearchIcon />} /> */}
      <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/help" icon={<NotificationsNone />} />
      <BottomNavigationAction className={classes.icon} classes={{ selected: classes.selected }} value="/accounts" icon={<AccountCircle />} />
    </BottomNavigation>
  );
};

export default BottomFooter;
