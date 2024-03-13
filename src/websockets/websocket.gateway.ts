import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
  @SubscribeMessage('mensaje')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: String,
  ) {
    // this.server.emit('mensajeserver', data); // reseptor y emisor
    client.broadcast.emit('mensajeserver', data); //Emisor
  }
}
