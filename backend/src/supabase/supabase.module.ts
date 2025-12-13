import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'SUPABASE_CLIENT',
            useFactory: (configService: ConfigService) => {
                const url = configService.get<string>('SUPABASE_URL');
                const key = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
                if (!url || !key) {
                    throw new Error('Supabase URL or Key is missing');
                }
                return createClient(url, key);
            },
            inject: [ConfigService],
        },
    ],
    exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule { }
