import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Person } from './person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private pepleCollection: AngularFirestoreCollection<Person> = this.afs.collection('person')

  constructor(private afs : AngularFirestore) { }

  getPeople(): Observable<Person[]> {
      return this.pepleCollection.valueChanges();
  }

  addPerson(p: Person) {
    this.pepleCollection.add(p);
  }
}
