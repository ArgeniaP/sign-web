import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Employee from 'App/Models/Employee'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    // Write your database queries inside the run method
    let data = await Employee.findByOrFail('nip', '123456789')

    await User.create({
      email: 'test@mail.com',
      password: '123456',
      employeeId: data.id,
    })
  }
}
