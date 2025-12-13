import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(@Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      this.logger.warn('Authentication attempt without token');
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token || !authHeader.startsWith('Bearer ')) {
      this.logger.warn('Invalid token format');
      throw new UnauthorizedException('Invalid token format. Expected: Bearer <token>');
    }

    try {
      const { data: { user }, error } = await this.supabase.auth.getUser(token);

      if (error || !user) {
        this.logger.warn(`Authentication failed: ${error?.message || 'User not found'}`);
        throw new UnauthorizedException('Invalid or expired token');
      }

      // Attach user to request object for use in controllers
      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(`Auth validation error: ${error.message}`, error.stack);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
