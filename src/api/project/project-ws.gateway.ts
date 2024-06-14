import { AuthGuardWs } from './../auth/authWs.guard';

import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ProjectService } from './project.service';
import { UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({cors:true})
export class ProjectWsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private readonly projectService: ProjectService) { }


    @WebSocketServer()
    server: Server;

    @UseGuards(AuthGuardWs)
    @SubscribeMessage('createRoom')
    async handleEvent(client: Socket, data: any) { 
        console.log(data);
        
        let room = (await this.projectService.projectExistenceForUser(data.id))
        if (room && room.id)
            client.join(room.id.toString())
        else
            client.emit('error', 'Project not found')
        this.server.in(room.id.toString()).emit('createRoom', data)
        client.on('error', (error) => {
            client.emit('error',error)
        });

    }

    refresh(roomId: string) {
        this.server.in(roomId).emit('refresh')
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('User connected');
    }

    handleDisconnect(client: any) {
        console.log('User disconnected');
    }


    afterInit(server: any) {
        console.log('Socket is live')
    }
}
