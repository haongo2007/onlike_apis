'use strict'

class CustomMiddleware {
  	// for HTTP
	async handle (ctx, next) {
		
	}

	// for WebSocket
	async wsHandle (ctx, next) {

	}
}

module.exports = CustomMiddleware