import subLocation from '../controllers/subLocationControllers';
import verifyNewSubLocation from '../middleware/subLocationValidation';
import { verifySubLocationId } from '../middleware/idValidation';
import { verifyMainLocationId } from '../middleware/idValidation';

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
  app.post('/api/v1/sublocation/:mainLocationId', verifyNewSubLocation, verifyMainLocationId, subLocation.createSubLocation);

  // get one sub location, edit a sub location and delete a sub location
  app.route('/api/v1/sublocation/:subLocationId') 
    .get(verifySubLocationId, subLocation.getOneSubLocation)
    .put(verifySubLocationId, subLocation.editSubLocation)
    .delete(verifySubLocationId, subLocation.deleteSubLocation)

  // get all sub locations
  app.get('/api/v1/sublocation', subLocation.getAllSubLocations);
}
