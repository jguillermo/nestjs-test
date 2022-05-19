import { Injectable, InternalServerErrorException } from '@nestjs/common';
import admin from 'firebase-admin';
import Firestore = admin.firestore.Firestore;
import DocumentData = admin.firestore.DocumentData;
import CollectionReference = admin.firestore.CollectionReference;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import { Firebase } from '../firebase';
import { Query, WhereFilterOp, OrderByDirection } from '@google-cloud/firestore';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';

export interface ItemDto {
  id: string;
  data: any;
}

@Injectable()
export class FirestoreService {
  db: Firestore;

  constructor() {
    Firebase.initDefaultApp();
    this.db = admin.firestore();
  }

  public async persist(collection: string, id: string, data: any): Promise<void> {
    try {
      await this.getCollection(collection).doc(id).set(data);
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor ${e}`);
    }
  }

  public async delete(collection: string, id: string): Promise<void> {
    try {
      await this.getCollection(collection).doc(id).delete();
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor ${e}`);
    }
  }

  public async findOneDocumentById(collection: string, id: string): Promise<ItemDto> {
    try {
      const storeDb = this.getCollection(collection).doc(id);
      const getDoc = await storeDb.get();
      if (!getDoc.exists) {
        return null;
      }
      return {
        id: getDoc.id,
        data: getDoc.data(),
      };
    } catch (e) {
      throw new InternalServerErrorException(e, `Error en el servidor FirestoreService findOneDocumentById`);
    }
  }

  public async findAll(
    collection: string,
    filters: Array<FilterItem> = [],
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ItemDto[]> {
    try {
      const storeDb = this.getCollection(collection);
      let where = filters.reduce<Query>((acc, cur) => {
        const op = cur.opStr as WhereFilterOp;
        return acc.where(cur.field, op, cur.value);
      }, storeDb);

      if (!order.isEmpty()) {
        where = where.orderBy(order.field.value, order.direction.value as OrderByDirection);
      }

      if (!paginator.isEmpty()) {
        const startAt = (paginator.page.value - 1) * paginator.perPage.value;
        where = where.offset(startAt).limit(paginator.perPage.value);
      }

      const getDoc = await where.get();
      return this.processGetAllData(getDoc);
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor ${e}`);
    }
  }

  public getCollection(collection: string): CollectionReference<DocumentData> {
    return this.db.collection(collection);
  }

  public processGetAllData(getDoc: QuerySnapshot<DocumentData>): ItemDto[] {
    if (getDoc.empty) {
      return [];
    }
    return getDoc.docChanges().map((item) => {
      return {
        id: item.doc.id,
        data: item.doc.data(),
      };
    });
  }
}
