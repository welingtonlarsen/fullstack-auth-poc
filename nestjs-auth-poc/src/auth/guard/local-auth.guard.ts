import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // Se acontecer algum erro dentro do mecanismo de geração do jwt, iremos lançar um unauthorized exception
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }
    return user;
  }
}
