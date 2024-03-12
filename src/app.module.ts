import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    JwtModule.register({
      global: true,
    }),
    CategoryModule,
    PostModule,
    UserModule,
    AuthModule,
    RegionModule,
    CharacteristicsModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
