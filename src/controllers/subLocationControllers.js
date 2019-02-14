import db from '../models/index';

/**
 * @class subLocationControllers
 *
 * @export
 *
 */
export default class mainLocationControllers {
  /**
   * @description - Creates a sub location
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof locationControllers
   *
   * @returns {object} Class instance
   */
  static createSubLocation(req, res) {
    const { name, maleResidents, femaleResidents } = req.body;

    return db.SubLocation.findOne({
      where: {
        name
      }
    }).then((foundLocation) => {
      if (foundLocation) {
        return res.status(409).json({
          errors: {
            status: '409',
            title: 'Conflict',
            detail: 'A sub location with this name already exist'
          }
        });
      }

      if (!foundLocation) {
        const createSubLocation = mainLocationId =>
          db.SubLocation.create({
            name: name.trim(),
            maleResidents: parseInt(maleResidents, 10),
            femaleResidents: parseInt(femaleResidents, 10),
            totalResidents:
              parseInt(maleResidents, 10) + parseInt(femaleResidents, 10),
            mainLocationId,
          }).then((newLocation) => {
            res.status(201)
              .json({
                data: {
                  location: newLocation
                }
              })
          })
        if (req.params.mainLocationId) {
          return createSubLocation(req.params.mainLocationId);
        }
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
   * @description - Get one sublocation
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof locationControllers
   *
   * @returns {object} Class instance
   */
  static getOneSubLocation(req, res) {
    return db.SubLocation.findOne({
      where: {
        id: req.params.subLocationId
      },
      include: [
        {
          model: db.MainLocation,
          as: 'mainLocation',
          attributes: ['name']
        }
      ]
    }).then((subLocation) => {
      if (!subLocation) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'Can\'t find a sublocation with that Id'
            }
          });
      }
      if (subLocation) {
        return res.status(200)
          .json({
            data: {
              subLocation
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
   * @description - Get all sublocations
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static getAllSubLocations(req, res) {
    return db.SubLocation.findAll({
      include: [
        {
          model: db.MainLocation,
          as: 'mainLocation',
          attributes: ['name']
        }
      ]
    }).then((subLocation) => {
      return res.status(200)
        .json({
          data: {
            subLocation
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
   * @description - Edits the details of a sublocation
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @memberof occasionsControllers
   *
   * @returns {object} Class instance
   */
  static editSubLocation(req, res) {
    const { name, maleResidents, femaleResidents } = req.body;

    db.SubLocation.findOne({
      where: {
        id: req.params.subLocationId,
      }
    }).then((foundSubLocation) => {
      if (!foundSubLocation) {
        return res.status(404).json({
          error: {
            status: '404',
            title: 'Not Found',
            detail: `Can't find sublocation with id ${req.params.subLocationId}`
          }
        });
      }
      if (foundSubLocation) {
        const subLocationDetails = {
          name: name ? name.trim() : foundSubLocation.name,
          femaleResidents: femaleResidents ? parseInt(femaleResidents, 10) : foundSubLocation.femaleResidents,
          maleResidents: maleResidents ? parseInt(maleResidents, 10) : foundSubLocation.maleResidents,
          totalResidents: Number(femaleResidents) + Number(maleResidents),
        };
        foundSubLocation.update(subLocationDetails)
          .then(updatedSubLocation => res.status(200)
            .json({
              data: {
                subLocation:
                {
                  updatedSubLocation,
                }
              }
            }));
      }
    }).catch((error) => console.log('========', error));
  }

/**
 * @description - Delete a sublocation
 * @static
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Request
 *
 * @memberof occasionsControllers
 *
 * @returns {object} Class instance
 */
  static deleteSubLocation(req, res) {
    db.SubLocation.findOne({
      where: {
        id: req.params.subLocationId
      }
    })
      .then((foundSubLocation) => {
        if (foundSubLocation) {
          db.SubLocation.destroy({
            where: {
              id: req.params.subLocationId
            },
            cascade: true
          })
            .then(() => res.status(200)
              .json({
                data: {
                  message: 'The sublocation has been successfully deleted'
                }
              }));
        }
        if (!foundSubLocation) {
          return res.status(404)
            .json({
              errors: {
                status: '404',
                title: 'Not Found',
                detail: 'Can\'t find a sublocation with that Id'
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
