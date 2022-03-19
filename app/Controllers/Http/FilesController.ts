import { extname } from 'path'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'

export default class FilesController {
  public async upload({ request }: HttpContextContract) {
    const uploaded = request.file('file')
    await uploaded?.moveToDisk('uploads')
  }

  public async download({ request, response }: HttpContextContract) {
    const location = request.param('*').join('/')

    const { size } = await Drive.getStats(location)

    response.type(extname(location))
    response.header('content-length', size)

    return response.stream(await Drive.getStream(location))
  }
}
