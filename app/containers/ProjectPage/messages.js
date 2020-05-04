/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProjectPage';

export default defineMessages({
  client: {
    id: `${scope}.client`,
    defaultMessage: 'Client',
  },
  contactPerson: {
    id: `${scope}.contactPerson`,
    defaultMessage: 'Contact person',
  },
  projectLeader: {
    id: `${scope}.projectLeader`,
    defaultMessage: 'Project leader',
  },
  smNo: {
    id: `${scope}.smNo`,
    defaultMessage: 'SM no.',
  },
  internalNo: {
    id: `${scope}.internalNo`,
    defaultMessage: 'Internal no.',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'City',
  },
  begin: {
    id: `${scope}.begin`,
    defaultMessage: 'Begin',
  },
  end: {
    id: `${scope}.end`,
    defaultMessage: 'End',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
});
