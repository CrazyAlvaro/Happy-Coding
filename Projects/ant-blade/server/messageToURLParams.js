/*
 * add flash message and its type to the url params
 */
export default function messageToURLParams(req, res, next) {
  const info = req.flash('info');
  const error = req.flash('error');
  const success = req.flash('success');

  let type;
  let message;

  if (info.length > 0) {
    type = 'info';
    message = info;
  }

  if (success.length > 0) {
    type = 'success';
    message = success;
  }

  if (error.length > 0) {
    type = 'error';
    message = error;
  }

  if (!!type) {
    const encodedType = encodeURIComponent(type);
    const encodedMessage = encodeURIComponent(message);
    const url = `${req.originalUrl}?type=${encodedType}&message=${encodedMessage}`;
    res.redirect(url);
  } else {
    next();
  }
}
