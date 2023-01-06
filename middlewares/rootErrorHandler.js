const INTENTAL_SERVER_ERROR_CODE = 500;

module.exports.rootErrorHandler = (err, req, res, next) => {
  const { status = INTENTAL_SERVER_ERROR_CODE, message } = err;
  res.status(status).send({ message: status === INTENTAL_SERVER_ERROR_CODE ? 'На сервере произошла ошибка' : message });
  next();
};
