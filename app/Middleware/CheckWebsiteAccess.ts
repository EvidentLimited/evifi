import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckWebsiteAccess {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const allowedWebsites = ['https://www.evident.capital']
    const referer = request.header('referer')

    if (!referer || !allowedWebsites.includes(referer)) {
      return response.status(403).send('Access denied.')
    }

    await next()
  }
}
