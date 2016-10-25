const _ = require('lodash');
/**
 *  Construct an URL with base URL and parameters
 *  @param {String} baseURL
 *  @param {Object} parameters
 *  @return {String} URL
 */
function constructURL(baseURL, params) {
  const parameters = _(params)
                        .mapValues(value => encodeURIComponent(value))
                        .toPairs()
                        .map(pair => pair.join('='))
                        .join('&');
  return `${baseURL}${parameters}`;
}

export {
  constructURL,
};
