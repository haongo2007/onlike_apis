'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
/* signin signup route */

Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')

/* update profile route */

Route.group(() => {
    Route.get('/me', 'UserController.me')
    Route.put('/update_profile', 'UserController.updateProfile')
    Route.put('/change_password', 'UserController.changePassword')
    Route.post('/update_avatar', 'UserController.updateAvatar')
})
    .prefix('account')
    .middleware(['auth:jwt'])

/* view info profile someone */
Route.get(':username', 'UserController.showProfile')

/* view someone follow */
Route.group(() => {
    /* all */
    Route.get('/all', 'UserController.usersAll');

    Route.get('/users_to_follow', 'UserController.usersToFollow');

    /* time line */
    Route.get('/timeline', 'UserController.timeline')

    /* following user */
    Route.post('/follow', 'UserController.follow')

    // unfollow user
    Route.delete('/unfollow/:id', 'UserController.unFollow')
})
    .prefix('users')
    .middleware(['auth:jwt'])

/* post tweet */
Route.post('/tweet', 'TweetController.tweet').middleware(['auth:jwt'])

/* single tweet */
Route.get('/tweets/:id', 'TweetController.show')

/* delete favorite */
Route.delete('/tweets/destroy/:id', 'TweetController.destroy').middleware(['auth:jwt'])

/* repplying tweet */
Route.post('/tweets/reply/:id', 'TweetController.reply').middleware(['auth:jwt']);

/* favorite tweet */
Route.group(() => {
    Route.post('/create', 'FavoriteController.favorite')

    /* unfavorite */
    Route.delete('/destroy/:id', 'FavoriteController.unFavorite');
})
    .prefix('favorites')
    .middleware(['auth:jwt'])


Route.get('/file/:uid/:file', 'UserController.readFile')
