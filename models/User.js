module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    en_title: DataTypes.STRING,
    cn_title: DataTypes.STRING
  })
}
