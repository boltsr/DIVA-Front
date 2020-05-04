/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsPage';

export default defineMessages({
  userManagement: {
    id: `${scope}.userManagement`,
    defaultMessage: 'User management',
  },
  appManagement: {
    id: `${scope}.appManagement`,
    defaultMessage: 'App management',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  userList: {
    id: `${scope}.userList`,
    defaultMessage: 'Users',
  },
});
