const config = require('../config/config')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Content', {
    key: {
      type: DataTypes.STRING(100),
      unique: true
    },
    cn_value: DataTypes.TEXT,
    en_value: DataTypes.TEXT
  },
  {
    getterMethods: {
      value () {
        const language = config.language
        return this.getDataValue(language + '_value')
      }
    }
  }
  )
}
