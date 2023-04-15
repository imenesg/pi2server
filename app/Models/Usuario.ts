import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Rastreio from './Rastreio'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @hasMany(() => Rastreio)
  public rastreio: HasMany<typeof Rastreio>
}
