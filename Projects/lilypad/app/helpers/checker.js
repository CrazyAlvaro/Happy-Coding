class Validator {
  constructor(message, isValid) {
    this.message = message;
    this.isValid = isValid;
  }

  isValid(target) {
    return this.isValid(target);
  }

  getMessage() {
    return this.message;
  }
}

function generateChecker(validators) {
  return target => validators.reduce((errors, validator) => {
    if (validator.isValid(target)) {
      return errors;
    }
    return [...errors, validator.getMessage()];
  }, []);
}

module.exports = {
  Validator,
  generateChecker,
};
