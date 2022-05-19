import { FirestoreService } from '../../../src/share/infrastructure/firestore/firestore.service';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { TestingE2eModule } from '../testing-e2e-module';

const collection = 'testcoll';

describe('FirestoreService (infrastructure)', () => {
  let firestoreService: FirestoreService;

  async function persist(id = 10) {
    const resourceId = `8e4abb47-bca2-409a-a20d-b4e02adf50${id}`;
    const filterParam = `020b635e-ca5c-43f3-9bab-55c7039dc0${id}`;
    const dataPersist = {
      id: resourceId,
      storage: id,
      color: 'blue',
      param: filterParam,
    };
    await firestoreService.persist(collection, resourceId, dataPersist);
    return {
      resourceId,
      dataPersist,
      filterParam,
    };
  }

  beforeEach(async () => {
    ({ firestoreService } = await TestingE2eModule.create());
    const result = await firestoreService.findAll(collection, [], PaginatorTypeImp.empty(), OrderTypeImp.empty());
    for await (const item of result) {
      await firestoreService.delete(collection, item.id);
    }
  });

  it('should be defined', () => {
    expect(firestoreService).toBeDefined();
  });

  describe('persist', () => {
    describe('when data is correct', () => {
      it('should persist data in a collection testcoll', async () => {
        await persist();
        expect(true).toBeDefined();
      });
    });
    describe('otherwise', () => {
      it('should exception when not send collectionName', async () => {
        await expect(firestoreService.persist(null, 'ea91a821-e962-40a7-93ed-b289b6a5f7d0', {})).rejects.toThrow(
          'Error en el servidor',
        );
      });
    });
  });

  describe('findOneDocumentById', () => {
    describe('when data with ID exist', () => {
      it('should return the data', async () => {
        const { resourceId, dataPersist } = await persist(10);
        const result = await firestoreService.findOneDocumentById(collection, resourceId);
        expect(result).toBeDefined();
        expect(result.data).toEqual(dataPersist);
        expect(result.id).toEqual(resourceId);
      });
    });
    describe('otherwise', () => {
      it('should return null', async () => {
        await persist(10);
        const resourceIdNotExit = '5e8048df-a9b6-4edd-8937-bad2108be71a';
        const result = await firestoreService.findOneDocumentById(collection, resourceIdNotExit);
        expect(result).toEqual(null);
      });
      it('should exception when not send collectionName', async () => {
        const { resourceId } = await persist(10);
        await expect(firestoreService.findOneDocumentById(null, resourceId)).rejects.toThrow(
          'Value for argument "collectionPath" is not a valid resource path. Path must be a non-empty string.',
        );
      });
    });
  });

  describe('findAll', () => {
    describe('when data with filter exist', () => {
      describe('when data exist filters', () => {
        it('should return the one data, one filter', async () => {
          const { resourceId, dataPersist, filterParam } = await persist(20);
          const result = await firestoreService.findAll(
            collection,
            [
              {
                field: 'param',
                opStr: FilterOpStr.EQUAL_TO,
                value: filterParam,
              },
            ],
            PaginatorTypeImp.empty(),
            OrderTypeImp.empty(),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(1);
          expect(result[0].data).toEqual(dataPersist);
          expect(result[0].id).toEqual(resourceId);
        });
        it('should return the one data, multiple data ', async () => {
          const { resourceId, dataPersist, filterParam } = await persist(21);
          const result = await firestoreService.findAll(
            collection,
            [
              {
                field: 'param',
                opStr: FilterOpStr.EQUAL_TO,
                value: filterParam,
              },
              {
                field: 'color',
                opStr: FilterOpStr.EQUAL_TO,
                value: 'blue',
              },
            ],
            PaginatorTypeImp.empty(),
            OrderTypeImp.empty(),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(1);
          expect(result[0].data).toEqual(dataPersist);
          expect(result[0].id).toEqual(resourceId);
        });
      });
      describe('when data exist paginator', () => {
        it('should return the one data, page 1 perPage 1', async () => {
          await persist(31);
          await persist(32);
          await persist(33);

          const result = await firestoreService.findAll(
            collection,
            [],
            PaginatorTypeImp.create(1, 1),
            OrderTypeImp.empty(),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(1);
        });
        it('should return the two data, page 1 perPage 2', async () => {
          const { resourceId } = await persist(41);
          const { resourceId: resourceId2 } = await persist(42);
          await persist(43);
          const result = await firestoreService.findAll(
            collection,
            [],
            PaginatorTypeImp.create(1, 2),
            OrderTypeImp.empty(),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(2);
          expect(result[0].id).toEqual(resourceId);
          expect(result[1].id).toEqual(resourceId2);
        });
        it('should return the one data, page 2 perPage 2', async () => {
          await persist(41);
          await persist(42);
          const { resourceId } = await persist(43);
          const result = await firestoreService.findAll(
            collection,
            [],
            PaginatorTypeImp.create(2, 2),
            OrderTypeImp.empty(),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(1);
          expect(result[0].id).toEqual(resourceId);
        });
      });
      describe('when data exist order', () => {
        it('should return the two data, order id desc', async () => {
          await persist(31);
          await persist(32);
          await persist(33);

          const result = await firestoreService.findAll(
            collection,
            [],
            PaginatorTypeImp.empty(),
            OrderTypeImp.create('id', 'desc'),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(3);
          expect(result[0].data.storage).toEqual(33);
          expect(result[1].data.storage).toEqual(32);
          expect(result[2].data.storage).toEqual(31);
        });
        it('should return the two data, order id asc', async () => {
          await persist(31);
          await persist(32);
          await persist(33);

          const result = await firestoreService.findAll(
            collection,
            [],
            PaginatorTypeImp.empty(),
            OrderTypeImp.create('id', 'asc'),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(3);
          expect(result[0].data.storage).toEqual(31);
          expect(result[1].data.storage).toEqual(32);
          expect(result[2].data.storage).toEqual(33);
        });
      });

      describe('when data exist order and page', () => {
        it('should return the one item, page', async () => {
          await persist(31);
          await persist(32);
          await persist(33);

          const result = await firestoreService.findAll(
            collection,
            [],
            PaginatorTypeImp.create(2, 2),
            OrderTypeImp.create('id', 'asc'),
          );
          expect(result).toBeDefined();
          expect(result.length).toEqual(1);
          expect(result[0].data.storage).toEqual(33);
        });
      });
    });
    describe('otherwise', () => {
      it('should return [] when filter Param Not Exit', async () => {
        await persist(31);
        const filterParamNotExit = '2a013317-0d26-4e12-8e39-b5289e8a9d68';
        const result = await firestoreService.findAll(
          collection,
          [
            {
              field: 'param',
              opStr: FilterOpStr.EQUAL_TO,
              value: filterParamNotExit,
            },
          ],
          PaginatorTypeImp.empty(),
          OrderTypeImp.empty(),
        );
        expect(result).toEqual([]);
      });
      it('should return the one data, multiple data ', async () => {
        const { filterParam } = await persist(41);
        const result = await firestoreService.findAll(
          collection,
          [
            {
              field: 'param',
              opStr: FilterOpStr.EQUAL_TO,
              value: filterParam,
            },
            {
              field: 'color',
              opStr: FilterOpStr.EQUAL_TO,
              value: 'red',
            },
          ],
          PaginatorTypeImp.empty(),
          OrderTypeImp.empty(),
        );
        expect(result).toEqual([]);
      });
      it('should exception when not send collectionName', async () => {
        const { filterParam } = await persist(41);
        await expect(
          firestoreService.findAll(
            null,
            [
              {
                field: 'param',
                opStr: FilterOpStr.EQUAL_TO,
                value: filterParam,
              },
            ],
            PaginatorTypeImp.empty(),
            OrderTypeImp.empty(),
          ),
        ).rejects.toThrow('Error en el servidor');
      });
    });
  });
});
