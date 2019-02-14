import { isEmpty } from 'lodash';

export const verifyMainLocationId = (req, res, next) => {
  const { mainLocationId } = req.params;

  const errors = {};

  if (Number.isNaN(parseInt(mainLocationId, 10))) {
    errors.mainLocationId = 'Location Id must be a number';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};

export const verifySubLocationId = (req, res, next) => {
  const { subLocationId } = req.params;

  const errors = {};

  if (Number.isNaN(parseInt(subLocationId, 10))) {
    errors.subLocationId = 'Sublocation Id must be a number';
  }

  if (isEmpty(errors)) return next();
  return res.status(400).json({ errors });
};
