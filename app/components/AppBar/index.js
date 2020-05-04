import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

// listen to global "isLoading" to trigger LinearProgress
import { makeSelectIsLoading } from '../../containers/App/selectors';

// the styles
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.sideBarWidth,
  },
  grow: {
    flexGrow: 1,
  },
  toolBar: {
    minHeight: 64,
  },
  children: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

class DivaAppBar extends React.PureComponent {
  render() {
    const { classes, title, isLoading, children } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          {/* LinearProgress when isLoading from global redux store is true */}
          {isLoading ? <LinearProgress /> : <div />}
          {!children ? (
            <Toolbar className={classes.toolBar}>
              <Typography
                variant="subtitle1"
                color="inherit"
                className={classes.grow}
              >
                {title}
              </Typography>
            </Toolbar>
          ) : (
            <div className={classes.children}>{children}</div>
          )}
        </AppBar>
      </div>
    );
  }
}

DivaAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

// read `isLoading` from the global redux store
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(DivaAppBar);
