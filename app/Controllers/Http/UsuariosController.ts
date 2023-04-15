import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from '../../Models/Usuario'

export default class UsuariosController {
  public async index({}: HttpContextContract) {
    const usuarios = await Usuario.all()
    return usuarios
  }

  public async store({ request }: HttpContextContract) {
    try {
      const data = request.only(['uid'])
      if(!await Usuario.findBy('uid', data.uid )){
        const usuario = Usuario.create(data)
        console.log('passou aqui ', usuario );
        return usuario
      }
    } catch (err) {
      console.log(err)
    }
  }

  public async show({ params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)

    return usuario
  }
  public async destroy({ params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)

    await usuario.delete()
  }
}
