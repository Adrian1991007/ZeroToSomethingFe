const AuthorizationException = (errorCode, description) => {
  this.errorCode = errorCode;
  this.description = description;
};

AuthorizationException.prototype = Object.create(Error.prototype);
AuthorizationException.prototype.constructor = AuthorizationException;

export default AuthorizationException;
