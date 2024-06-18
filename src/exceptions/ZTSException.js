function ZTSException(errorCode, description, stack) {
  this.name = 'ZTSException';
  this.description = description;
  this.errorCode = errorCode;
  this.stack = stack;
}

ZTSException.prototype = Object.create(Error.prototype);
ZTSException.prototype.constructor = ZTSException;

export default ZTSException;
