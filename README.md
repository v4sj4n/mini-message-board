#mini-message-board

A simple project in which I have made a simple mini message board, the next step will be connecting it to a database so messages stick

I have used uuid for message ids, handlebar as a view engine and 2 routes:
1. / which using a get request the user gets the main page with all the messages
2. /add-message in which when a user submits a message a post request is sent to the server and the server pushes the new message to the messages array

[Live code](https://mini-message-board.v4sj4n.repl.co/)