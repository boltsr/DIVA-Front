/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProjectsPage';

export default defineMessages({
  projects: {
    id: `${scope}.projects`,
    defaultMessage: 'Projects',
  },
  activeProjects: {
    id: `${scope}.activeProjects`,
    defaultMessage: 'Active projects',
  },
  allCustomers: {
    id: `${scope}.allCustomers`,
    defaultMessage: 'All customers',
  },
});
