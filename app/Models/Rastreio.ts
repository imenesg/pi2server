import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class Rastreio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: number

  @column()
  public codigo_rastreio: string

  @column()
  public rastreio_apelido: string

  @belongsTo(() => Usuario)
  public usuario: BelongsTo<typeof Usuario>
}
