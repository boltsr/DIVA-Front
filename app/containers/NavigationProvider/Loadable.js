/**
 * Asynchronously loads the component for NavigationProider
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
