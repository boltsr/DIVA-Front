import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    width: 40,
    height: 40,
    margin: theme.spacing.unit * 2,
    border: '2px solid #888',
    borderRadius: '50%',
  },
});

/* eslint-disable react/prefer-stateless-function */
class UserIcon extends React.PureComponent {
  render() {
    const { classes, image } = this.props;
    return <img src={image} alt="UserIcon" className={classes.icon} />;
  }
}

UserIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserIcon);
