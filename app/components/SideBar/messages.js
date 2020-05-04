/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.SideBar';

export default defineMessages({
  changeProfile: {
    id: `${scope}.changeProfile`,
    defaultMessage: 'Change profile',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change password',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name',
  },
  emailAddress: {
    id: `${scope}.emailAddress`,
    defaultMessage: 'Email address',
  },
  currentPassword: {
    id: `${scope}.currentPassword`,
    defaultMessage: 'Current password',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'New password',
  },
  newPasswordRepeat: {
    id: `${scope}.newPasswordRepeat`,
    defaultMessage: 'New password (repeat)',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  passwordNotMatch: {
    id: `${scope}.passwordNotMatch`,
    defaultMessage: 'The entered passwords do not match',
  },
  passwordMinSize: {
    id: `${scope}.passwordMinSize`,
    defaultMessage: 'The new password needs to have a minimal size of 8 chars',
  },
  passwordNeeded: {
    id: `${scope}.passwordNeeded`,
    defaultMessage: 'Please enter your current password',
  },
});
