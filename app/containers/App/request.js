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
export function login(url, data) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      email: data.user,
      password: data.pass,
    }),
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           The response data
 */
export function refreshToken(url, token) {
  const options = {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token.oldToken}`,
    }),
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url    The URL we want to request
 * @param  {object} token  The options we want to pass to "fetch"
 * @return {object}        The response data
 */
export function invalidateToken(url, token) {
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

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url    The URL we want to request
 * @param  {object} token
 * @param  {object} user
 * @return {object}        The response data
 */
export function updateUserProfile(url, obj) {
  const options = {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${obj.token}`,
    }),
    body: JSON.stringify({
      user: obj.user,
    }),
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url    The URL we want to request
 * @param  {object} token
 * @param  {object} password
 * @return {object}        The response data
 */
export function updateUserPassword(url, obj) {
  const options = {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${obj.token}`,
    }),
    body: JSON.stringify({
      currentPassword: obj.password.currentPassword,
      newPassword: obj.password.newPassword,
    }),
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
