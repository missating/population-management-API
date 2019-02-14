import location from '../controllers/mainLocationControllers';

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
    .post(location.createLocation);

  // edit a location, get one location
  app.route('/api/v1/location/:mainLocationId')
    .put(location.editLocation)
    .get(location.getOneLocation)
    .delete(location.deleteLocation);
}
