import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { FirestoreService } from '../../src/share/infrastructure/firestore/firestore.service';
import { CourseRepository } from '../../src/course/domain/course.repository';
import { EnrollmentRepository } from '../../src/enrollment/domain/enrollment.repository';
import { StudentRepository } from '../../src/student/domain/student.repository';

export interface TestingInterface {
  courseRepository: CourseRepository;
  enrollmentRepository: EnrollmentRepository;
  studentRepository: StudentRepository;
  firestoreService: FirestoreService;
}

export class TestingE2eModule {
  private _app: INestApplication;
  private _moduleFixture: TestingModule;

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
  }

  get app(): INestApplication {
    return this._app;
  }

  get moduleFixture(): TestingModule {
    return this._moduleFixture;
  }

  static async create(): Promise<TestingInterface> {
    const module = new TestingE2eModule();
    await module.init();
    return {
      firestoreService: module.moduleFixture.get<FirestoreService>(FirestoreService),
      courseRepository: module.moduleFixture.get<CourseRepository>(CourseRepository),
      enrollmentRepository: module.moduleFixture.get<EnrollmentRepository>(EnrollmentRepository),
      studentRepository: module.moduleFixture.get<StudentRepository>(StudentRepository),
    };
  }
}
