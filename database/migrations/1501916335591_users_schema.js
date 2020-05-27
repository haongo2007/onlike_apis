'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Env = use('Env')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
        table.increments()
        table.string('name').notNullable()
        table.string('username', 80).notNullable().unique()
        table.string('email', 254).notNullable().unique()
        table.string('password', 60).notNullable()
        table.string('location').nullable()
        table.string('website_url').nullable()
        table.string('avatar',254).defaultTo(Env.get('APP_URL')+'/file/0/default.jpg')
        table.integer('status').defaultTo(0)
        table.text('socket_id').nullable()
        table.text('bio').nullable()
        table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
