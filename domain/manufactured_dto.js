const manufacturedDao = require('./manufactured_dao.js');

class ManufacturedDto {
    constructor() {
        //this is intentional
    }
}

ManufacturedDto.prototype.getChannelDataset = manufacturedDao.getChannelDataset;

module.exports = ManufacturedDto;