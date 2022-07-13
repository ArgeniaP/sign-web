import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Employee from 'App/Models/Employee'

export default class extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    // Write your database queries inside the run method
    await Employee.create({
      nama: 'Ilham Taufik Hidayat',
      alamat: 'Kota Bandung',
      nip: '123456789',
      tanggalLahir: '1998-03-13',
    })
  }
}
