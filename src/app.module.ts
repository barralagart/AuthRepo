import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        synchronize: true,
        type: "mysql",
        host: "localhost",
        port: 3306,
        database: "auth",
        username: "root",
        password: "root",
        entities: [User],
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
