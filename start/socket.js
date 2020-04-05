'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')
const User = use('App/Models/User')

Ws.channel('chat', async ({socket, auth})=> {
	const authUser = await auth.getUser()
	const user = await User.find(authUser.id)
	user.status = true
	user.socket_id = socket.id
	user.save()

	socket.on('new:user', data => {
		
		socket.broadcast('new:user', user)
	})

	socket.on('added:user', data => {
		socket.broadcast('added:user', true)
	})

	socket.on('new:group', data => {
		socket.broadcastToAll('new:group', data)
	})

	socket.on('type:chat', data => {
		socket.broadcast('type:chat', data)
	})

	socket.on('type:group', data => {
		socket.broadcast('type:group', data)
	})

	socket.on('new:message', data => {
		socket.emitTo('new:message', data.message, data.socketids)
	})

	socket.on('logout:user', data => {
		user.status = false
		user.socket_id = ''
		user.save()
		socket.broadcast('logout:user', user)
	})

	socket.on('close', async () => {
		user.status = false
		user.socket_id = ''
		await user.save()
		socket.broadcast('close:user', true)
	})
}).middleware(['auth'])