import { Module } from '@nestjs/common';
import { FirestoreService } from './infrastructure/firestore/firestore.service';

@Module({
  providers: [FirestoreService],
  exports: [FirestoreService],
})
export class ShareModule {}
