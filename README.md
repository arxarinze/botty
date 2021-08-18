##Bot Service

The Bot Service is solely a websocket/stream service that every other infastructure on the network its user connects to and sends messages which is to be delivered to all other connected users on any of those networks

The Bot Service was created as means of handling dispute, feedbacks, chats, short background tasks, and live results

Its Consist Of The Following Parts:

1. Handlers -
   i) onConnectionHandler - this handles the connection made to the bot by any authorised infastructure and maintains the connection open
   ii) onErrorHandler - this handles any error gotten while the connection was open
   iii) onCloseHandler - this handles when the connection is closed by the client or the server
   iv) onMessageHandler - this dispatches messages to the appropriate inception

2. Authorization Scheme -

   - The Authorization/Authentication flow of the bot goes as follows:
     i) A user logs into the app, also the app creates a websocket ticket which returns a key - /auth/get-key
     ii) This key is then used to connect to the socket - wss://......:3233/auth/:key
     iii) On connection a message is return to the client that it was successful

   These functions are handled by the Authorization Class

3. End To End Encryption - This was left out as it might be very difficult for the other developers to implement (will be achieved later)

   - End To End Encryption makes sure that our users information is sent over the channel in a safe encrypted way
   - Asymmetric Encryption is employed for the end to end encryption with users keys being generated for the bot and set back on first login only
   - The keys are genrated in our servers for web users but on mobile users stays in their phone. Only the public key is sent to us
   - The public key is used in encrypting the messages and the private key is used in decrypting

4. Inception Objects -
   - In other to maintain the genericity these objects will avoid tainting the code by hardcoding responses to messages
   - The first inception object would check for when a user has been banned and inform them is they are connected and if not leaves a notification for them

##Example Usage

Client:
request:
curl -H 'Authorization: Bearer <token>' -X POST https://../auth/get-key

response:
{
"status": 200,
"key": "46aedf6c425b60b7a757c949ba59984ad8242a4ffa9beebf5ac93e74471da91a"
}

Use this key to initiate the WebSocket Connection:

request:
let ws = new WebSocket('ws://localhost:29000/auth/<key>');

it returns an object in the message data which:

{ status: 200, message: "OK" }

when socket is open, then send this:
ws.send(JSON.stringify({action:"load",inception:"market-order",object:{body:{type:"Sell", currency:"TAT"}}}))

you should listen for a message

that has orders as a key to get the orders
