import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';

export class NestTestModule {
  private _app: INestApplication;
  private _moduleFixture: TestingModule;
  private static _port = 3334;

  protected async init(): Promise<void> {
    this._moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this._app = this._moduleFixture.createNestApplication();
    this._app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await this._app.init();
    await this._app.listen(NestTestModule._port);
  }

  get app(): INestApplication {
    return this._app;
  }

  get moduleFixture(): TestingModule {
    return this._moduleFixture;
  }

  static get url(): string {
    return `http://localhost:${NestTestModule._port}/graphql`;
  }

  static async create(): Promise<INestApplication> {
    const module = new NestTestModule();
    await module.init();
    return module.app;
  }
}
