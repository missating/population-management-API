import { isEmpty } from 'lodash';
import validator from 'validator';


const verifyNewLocation = (req, res, next) => {
  const {
    name
  } = req.body;

  const errors = {};

  if (!name) {
    errors.name = 'Please provide a name for the location';
  } else if (name && validator.isEmpty(name.trim())) {
    errors.name = 'Location name cannot be empty';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};

export default verifyNewLocation;
