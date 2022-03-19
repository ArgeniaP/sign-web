import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import User from 'App/Models/User'

export default class UsersController {
  public async create({ view }: HttpContextContract) {
    return view.render('pages/authentication/register')
  }

  public async store({ request, response }: HttpContextContract) {
    const user = await User.create({
      email: request.input('email'),
      password: request.input('password'),
    })
    const employee = await Employee.findByOrFail('nip', request.input('nip'))

    await employee.related('account').save(user)

    if (user.$isPersisted && user.employeeId === employee.id) {
      response.redirect('/login')
    }
  }
}
