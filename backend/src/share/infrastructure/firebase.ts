import admin from 'firebase-admin';

export class Firebase {
  public static initDefaultApp(): void {
    if (!Firebase.isAppInit('[DEFAULT]')) {
      admin.initializeApp({
        projectId: 'test',
        credential: admin.credential.applicationDefault(),
      });
    }
  }

  public static isAppInit(name: string): boolean {
    if (admin.apps.length === 0) {
      return false;
    }
    let isInit = false;
    admin.apps.forEach((app) => {
      if (app.name === name) {
        isInit = true;
      }
    });
    return isInit;
  }
}
