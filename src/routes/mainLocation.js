import location from '../controllers/mainLocationControllers';
import verifyNewLocation from '../middleware/mainLocationValidation';
import { verifyMainLocationId } from '../middleware/idValidation';

/**
 *@function mainLocationRoutes
 *
 * @export
 * @param {any} app
 *
 * @returns {void}
 */
export default function mainLocationRoutes(app) {
  // create a location, get all location
  app.route('/api/v1/location')
    .get(location.getAllLocations)
    .post(verifyNewLocation, location.createLocation);

  // edit a location, get one location,delete a location
  app.route('/api/v1/location/:mainLocationId')
    .put(verifyMainLocationId, location.editLocation)
    .get(verifyMainLocationId, location.getOneLocation)
    .delete(verifyMainLocationId, location.deleteLocation);
}
