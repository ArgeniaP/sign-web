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

Route.get('/', async ({ response }) => {
  response.redirect().toRoute('/dashboard')
})

Route.group(() => {
  // Authentication Route
  Route.group(() => {
    Route.get('/', 'UsersController.create').as('Register.View')
    Route.post('/', 'UsersController.store').as('Register.Process')
  }).prefix('register')

  Route.group(() => {
    Route.get('/', ({ view }) => {
      return view.render('pages/authentication/login')
    }).as('Login.View')
    Route.post('/', 'AppsController.login').as('Login.Process')
  }).prefix('login')
  Route.get('logout', 'AppsController.logout').as('Logout')

  // Application Route
  Route.group(() => {
    Route.get('/', 'AppsController.index')
    Route.get('/documents', 'AppsController.show')
  })
    .prefix('dashboard')
    .middleware('auth')

  // File Route
  Route.post('/files', 'FilesController.upload').as('File.Upload')
  Route.get('/files/*?save=true', 'FilesController.download').as('File.Download')
})
