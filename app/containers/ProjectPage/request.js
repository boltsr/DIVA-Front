/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  try {
    return response.json();
  } catch (e) {
    throw e;
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let error = '';
  try {
    error = await response.json();
  } catch (e) {
    throw new Error('Request failed');
  }
  throw new Error(error.msg);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           The response data
 */
export function getActions(url, token) {
  const options = {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token.token}`,
    }),
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
