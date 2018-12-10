const wines = require('./wines.json')
const contents = require('./contents.json')
const Promise = require('bluebird')
const { sequelize, Wine, Content } = require('../models')

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      wines.map(wine => {
        Wine.create(wine)
      })
    )

    await Promise.all(
      contents.map(content => {
        Content.create(content)
      })
    )
  })
