const config = require('../config/config')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Wine', {
    en_title: DataTypes.STRING,
    cn_title: DataTypes.STRING,
    en_winery: DataTypes.STRING,
    cn_winery: DataTypes.STRING,
    en_variety: DataTypes.STRING,
    cn_variety: DataTypes.STRING,
    years: DataTypes.STRING,
    avatar: DataTypes.STRING,
    en_description: DataTypes.TEXT,
    cn_description: DataTypes.TEXT
  },
  {
    getterMethods: {
      title () {
        const language = config.language
        return this.getDataValue(language + '_title')
      },
      description () {
        const language = config.language
        return this.getDataValue(language + '_description')
      },
      winery () {
        const language = config.language
        return this.getDataValue(language + '_winery')
      },
      variety () {
        const language = config.language
        return this.getDataValue(language + '_variety')
      }
    }
  }
  )
}
