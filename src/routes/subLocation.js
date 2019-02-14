import subLocation from '../controllers/subLocationControllers';

/**
 *@function subLocationRoutes
 *
 * @export
 * @param {any} app
 *
 * @returns {void}
 */
export default function subLocationRoutes(app) {
  // create a sub location
  app.post('/api/v1/sublocation/:mainLocationId', subLocation.createSubLocation);

  // get one sub location, edit a sub location and delete a sub location
  app.route('/api/v1/sublocation/:subLocationId') 
      .get(subLocation.getOneSubLocation)
      .put(subLocation.editSubLocation)
      .delete(subLocation.deleteSubLocation)

  // get all sub locations
  app.get('/api/v1/sublocation', subLocation.getAllSubLocations);
}
