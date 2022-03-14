/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ auth, response }) => {
  await auth.use('web').check()

  if (auth.use('web').isLoggedIn) {
    response.redirect('/dashboard')
  } else {
    response.redirect('/login')
  }
})
Route.get('/login', ({ view }) => {
  return view.render('pages/authentication/login')
})
Route.get('/logout', 'AppsController.logout')

Route.group(() => {
  Route.get('/', 'AppsController.index')
  Route.get('/documents', 'AppsController.show')
}).prefix('dashboard')
