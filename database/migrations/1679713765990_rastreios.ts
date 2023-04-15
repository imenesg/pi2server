import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rastreios extends BaseSchema {
  protected tableName = 'rastreios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().notNullable().references('id').inTable('usuarios')
      table.string('codigo_rastreio')
      table.string('rastreio_apelido')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
