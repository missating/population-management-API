import { isEmpty } from 'lodash';
import validator from 'validator';

const verifyNewSubLocation = (req, res, next) => {
  const {
    name, maleResidents, femaleResidents
  } = req.body;

  const errors = {};

  if (!name) {
    errors.name = 'Please provide a name for the sublocation';
  } else if (name && validator.isEmpty(name.trim())) {
    errors.name = 'Sublocation name cannot be empty';
  } else if (!maleResidents) {
    errors.maleResidents = 'Please provide the number of male residents';
  } else if (maleResidents && Number.isNaN(parseInt(maleResidents, 10))) {
    errors.maleResidents = 'Male Residents must be a number';
  } else if (!femaleResidents) {
    errors.femaleResidents = 'Please provide the number of female residents';
  } else if (femaleResidents && Number.isNaN(parseInt(femaleResidents, 10))) {
    errors.femaleResidents = 'Female Residents must be a number';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};

export default verifyNewSubLocation;
