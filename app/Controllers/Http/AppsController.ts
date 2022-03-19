import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import User from 'App/Models/User'

export default class AppsController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/dashboard')
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/authentication/register')
  }

  //Save register data to database
  public async store({ request, response }: HttpContextContract) {
    const user = await User.create({
      email: request.input('email'),
      password: request.input('password'),
    })
    const employee = await Employee.findByOrFail('nip', request.input('nip'))

    await user.related('employee').associate(employee)

    if (user.$isPersisted && user.employeeId === employee.id) {
      response.redirect('/login')
    }
  }

  //Show user data on setting
  public async show({ view }: HttpContextContract) {
    return view.render('pages/errors/not-found')
  }

  //Show user data on edit mode
  public async edit({ view }: HttpContextContract) {
    return view.render('pages/errors/not-found')
  }

  //Save edited data to database
  public async update({ view }: HttpContextContract) {
    return view.render('pages/errors/not-found')
  }

  public async login({ auth, request, response, view }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/dashboard')
    } catch {
      return view.render('pages/errors/unauthorized')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    if (auth.isLoggedOut) response.redirect('/login')
  }
}
