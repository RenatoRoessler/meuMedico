import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { confAgenda } from './confAgenda.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private confAgendaCollection : AngularFirestoreCollection<confAgenda> = this.afs.collection('confAgenda');

  constructor(private afs: AngularFirestore) { }

  addConfAgenda(c: confAgenda) {
    c.id_confAgenda = this.afs.createId();
    return this.confAgendaCollection.doc(c.id_confAgenda).set(c);
  }

  getConfAgenda(uid: string): Observable<confAgenda[]> {
    return this.afs.collection<confAgenda>('confAgenda', ref => ref.where('id_user', '==', uid)).valueChanges();
  }

  delConfAgenda(c: confAgenda) {
    return this.confAgendaCollection.doc(c.id_confAgenda).delete();
  }

}
