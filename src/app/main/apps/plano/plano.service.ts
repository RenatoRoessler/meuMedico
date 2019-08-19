import { Injectable } from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'
import { PlanoTable } from './planoTable.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanoService {
  private planoCollection: AngularFirestoreCollection<PlanoTable> = this.afs.collection('plano')


  constructor(private afs : AngularFirestore) { }


  getPlanos(): Observable<PlanoTable[]> {
    return this.planoCollection.valueChanges();
  }

  addPlano(p: PlanoTable) {
    p.id_plano = this.afs.createId();
    return this.planoCollection.doc(p.id_plano).set(p);
  }

  deletePlano(p: PlanoTable){
    return this.planoCollection.doc(p.id_plano).delete();
  }

  updatePlano(p: PlanoTable) {
    return this.planoCollection.doc(p.id_plano).set(p);
  }

  searchByDescricao(descricao: string): Observable<PlanoTable[]> {
    return this.afs.collection<PlanoTable>('plano', ref => ref.orderBy('descricao').startAt(descricao).endAt(descricao+"\uf8ff")).valueChanges()
  }
}
