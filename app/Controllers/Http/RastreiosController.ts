import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rastreio from '../../Models/Rastreio'
import Usuario from 'App/Models/Usuario'
const { rastrearEncomendas } = require('correios-brasil')

export default class RastreiosController {
  public async index({}: HttpContextContract) {
    const rastreio = await Rastreio.all()
    return rastreio
  }
  public async store({ request }: HttpContextContract) {
    try {
      const fireBaseUid = request.only(['firebase_uid'])
      const usuario = await Usuario.findBy('uid', fireBaseUid.firebase_uid)
      const data = request.only(['codigo_rastreio', 'rastreio_apelido'])
      const rastreio = await Rastreio.create({ usuario_id: usuario?.id, ...data })
      return rastreio
    } catch (err) {
      console.log(err)
    }
  }
  public async show({ params, request }: HttpContextContract) {
    const usuario = await Usuario.findBy('uid', params.id)
    if(!request.qs().codigo){
    const rastreio = await Rastreio.query().where('usuario_id', usuario!.id)
    return rastreio
    }else{
      const rastreio = await Rastreio.query().where('usuario_id', usuario!.id).where('codigo_rastreio', request.qs().codigo)
      return rastreio
    }
  }
  public async update({params, request}: HttpContextContract){
    const usuario = await Usuario.findBy('uid', request.only(['firebase_uid']).firebase_uid)
    const rastreio = await Rastreio.query().where('id',params.id).where('usuario_id', usuario!.id )
    const data = request.only(['codigo_rastreio', 'rastreio_apelido'])
    await rastreio[0].merge(data).save()
    return rastreio 
  }
  public async destroy({ params, request }: HttpContextContract) {
    const usuario = await Usuario.findBy('uid', request.qs().uid)
    const rastreio = await Rastreio.query().where('id', params.id).where('usuario_id', usuario!.id )
    await rastreio[0].delete()
  }
  public async buscaRastreio({ params }: HttpContextContract) {
    try {
      let codRastreio = [params.codigo]
      const resultadoRastreio = await rastrearEncomendas(codRastreio)
      return resultadoRastreio[0].eventos.reverse()
    } catch (error) {
      console.log(error)
      return;
    }
  }
}
