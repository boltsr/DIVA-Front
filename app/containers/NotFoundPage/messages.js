/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: '404',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Oh noo! Pacman ate your page',
  },
});
