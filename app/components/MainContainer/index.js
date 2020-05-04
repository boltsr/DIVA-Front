import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.sideBarWidth,
    padding: theme.spacing.unit * 3,
  },
});

class MainContainer extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.props.children}</div>;
  }
}

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default withStyles(styles)(MainContainer);
