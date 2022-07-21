import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import User from 'App/Models/User'

export default class UsersController {
  public async create({ view }: HttpContextContract) {
    return view.render('pages/authentication/register')
  }

  public async store({ request, response }: HttpContextContract) {
    const employee = await Employee.create({
      nama: request.input('nama'),
      nip: request.input('nip'),
      tanggalLahir: request.input('tanggalLahir'),
      alamat: request.input('alamat'),
    })

    const user = await User.create({
      email: request.input('email'),
      password: request.input('password'),
    })

    await employee.related('account').save(user)
    await user.save()

    if (user.$isPersisted && employee.$isPersisted) {
      response.redirect('/login')
    }
  }
}
