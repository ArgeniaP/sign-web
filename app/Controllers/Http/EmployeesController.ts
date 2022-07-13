import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'

export default class EmployeesController {
  public async create({ view }: HttpContextContract) {
    return view.render('pages/authentication/register')
  }

  public async store({ request, response }: HttpContextContract) {
    const employee = await Employee.create({
      nip: request.input('nip'),
      nama: request.input('nama'),
      tanggalLahir: request.input('tanggalLahir'),
      alamat: request.input('alamat'),
    })

    if (employee.$isPersisted) {
      response.redirect('UsersController.create')
    }
  }
}
