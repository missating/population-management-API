import db from '../models/index';

/**
 * @class mainLocationControllers
 *
 * @export
 *
 */
export default class mainLocationControllers {
  /**
   * @description - Creates a location
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof locationControllers
   *
   * @returns {object} Class instance
   */
  static createLocation(req, res) {
    const {
      name
    } = req.body;

    return db.MainLocation.findOne({
      where: {
        name
      }
    }).then((foundLocation) => {
      if (foundLocation) {
        return res.status(409).json({
          errors: {
            status: '409',
            title: 'Conflict',
            detail: 'A location with this name already exist'
          }
        });
      }

      if (!foundLocation) {
        db.MainLocation.create({
          name
        }).then(newLocation => {
          res.status(201)
            .json({
              data: {
                location: newLocation
              }
            })
        })
      }
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }

  /**
   * @description - Edits the details of a location
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static editLocation(req, res) {
    const {
      locationName
    } = req.body;

    db.MainLocation.findOne({
      where: {
        id: req.params.mainLocationId,
      }
    }).then((foundLocation) => {
      if (!foundLocation) {
        return res.status(404).json({
          error: {
            status: '404',
            title: 'Not Found',
            detail: `Can't find location with id ${req.params.mainLocationId}`
          }
        });
      }
      if (foundLocation) {
        const locationDetails = {
          locationName: locationName ? locationName.trim() : foundLocation.name,
        };
        foundLocation.update(locationDetails)
          .then(updatedLocation => res.status(200)
            .json({
              data: {
                location:
                {
                  name: updatedLocation.name,
                }
              }
            }));
      }
    }).catch(() => res.status(500)
      .json({
        errors: [
          {
            status: '500',
            detail: 'internal server error'
          }
        ]
      }));
  }

  /**
   * @description - Get one location
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static getOneLocation(req, res) {
    return db.MainLocation.findOne({
      where: {
        id: req.params.mainLocationId
      },
      include: [
        {
          model: db.SubLocation,
          as: 'subLocations',
          attributes: ['name', 'maleResidents', 'femaleResidents', 'totalResidents']
        }
      ]
    }).then((location) => {
      if (!location) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'Can\'t find a location with that Id'
            }
          });
      }
      if (location) {
        return res.status(200)
          .json({
            data: {
              location
            }
          });
      }
    }).catch(() => res.status(500).json({
      errors: {
        status: '500',
        detail: 'Internal server error'
      }
    }));
  };

  /**
   * @description - Get all locations
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static getAllLocations(req, res) {
    return db.MainLocation.findAll({
      include: [
        {
          model: db.SubLocation,
          as: 'subLocations',
          attributes: ['name', 'maleResidents', 'femaleResidents', 'totalResidents']
        }
      ]
    }).then((location) => {
      return res.status(200)
        .json({
          data: {
            location
          }
        });
    }).catch(() => res.status(500).json({
      errors: {
        status: '500',
        detail: 'Internal server error'
      }
    }));
  }

/**
 * @description - Delete a location
 * @static
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Request
 *
 * @memberof occasionsControllers
 *
 * @returns {object} Class instance
 */
  static deleteLocation(req, res) {
    db.MainLocation.findOne({
      where: {
        id: req.params.mainLocationId
      }
    })
      .then((foundLocation) => {
        if (foundLocation) {
          db.MainLocation.destroy({
            where: {
              id: req.params.mainLocationId
            },
            cascade: true
          })
            .then(() => res.status(200)
              .json({
                data: {
                  message: 'The Location has been successfully deleted'
                }
              }));
        }
        if (!foundLocation) {
          return res.status(404)
            .json({
              errors: {
                status: '404',
                title: 'Not Found',
                detail: 'Can\'t find a location with that Id'
              }
            });
        }
      })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }
}
