import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ExameModel } from './exameModel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  private planoCollection: AngularFirestoreCollection<ExameModel> = this.afs.collection('Exames')

  constructor(private afs : AngularFirestore) { }

   getExames(): Observable<ExameModel[]> {
    return this.planoCollection.valueChanges();
  }

  addExame(p: ExameModel) {
    p.id_Exame = this.afs.createId();
    return this.planoCollection.doc(p.id_Exame).set(p);
  }

  deleteExame(p: ExameModel){
    return this.planoCollection.doc(p.id_Exame).delete();
  }

  updateExame(p: ExameModel) {
    return this.planoCollection.doc(p.id_Exame).set(p);
  }

  searchExameByDescricao(descricao: string): Observable<ExameModel[]> {
    return this.afs.collection<ExameModel>('exame', ref => ref.orderBy('descricao').startAt(descricao).endAt(descricao+"\uf8ff")).valueChanges()
  } 
}
