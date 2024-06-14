import { AuthService } from './auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {WsException} from '@nestjs/websockets'

@Injectable()
export class AuthGuardWs implements CanActivate {
  constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToWs().getClient();
    // console.log(request);
    
    const token = this.extractTokenFromHeader(request);    
    if (!token) {
      // request.client.emit('error','User Unauthorize')
      throw new WsException("User Unauthorize");
    }
    try {
      const payload = await this.authService.JwtVerify(token)
      request['user'] = payload;
    } catch {
      
      request.client.onerror((e) => {
        console.log(e);
        
      })
      // request.client.emit('error','User Unauthorize')
      throw new WsException("User Unauthorize");
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}