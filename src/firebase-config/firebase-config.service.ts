import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import ServiceAccount from '../../gettogether-55ba9-firebase-adminsdk-ss0mp-2285a47b0c.json';

const FirebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: ServiceAccount.client_email,
    privateKey: ServiceAccount.private_key,
    projectId: ServiceAccount.project_id,
  }),
  databaseURL: 'https://gettogether-55ba9.firebaseio.com',
});

@Injectable()
export class FirebaseConfigService {
  getFirestore() {
    return FirebaseAdmin.firestore();
  }

  getAuth() {
    return FirebaseAdmin.auth();
  }
}
