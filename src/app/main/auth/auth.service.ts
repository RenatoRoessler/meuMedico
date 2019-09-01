import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './user';
import { Observable, from, throwError, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { }
  
  register(user: User): Observable<boolean> {
    //From transforma a promice em Observable
    return from(this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => 
          //setando o usuairo na tabela user com o codigo do usuario salvo no firebase
          this.userCollection.doc(u.user.uid)
            .set({...user, id: u.user.uid})
            .then(() => true)          
        ),
        catchError((err) => throwError(err))
      )
   
  }

  login( email: string, password: string) : Observable<User> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential)=> this.userCollection.doc<User>(u.user.uid).valueChanges()),
        catchError(() => throwError('Credenciais Inválidas ou Usuário não cadastrado'))
      )
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser() : Observable<User>{
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ? 
          this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
      )
      //switchMap troca um observable por outro
  }

  getIdUser() : Observable<string>{
    return this.afAuth.authState
      .pipe(
        map(u => u.uid)
      )

      //switchMap troca um observable por outro
  }

  authenticated() : Observable<boolean>{
    return this.afAuth.authState
      .pipe(
        map(u => (u) ? true : false)
      )
  }

  async updateUserData(u: auth.UserCredential) {
    try{
      const newUser: User = {
        firstname: u.user.displayName,
        lastname: '',
        address: '',
        city: '',
        state: '',
        phone: '',
        mobilephone: '',
        email: u.user.email,
        password: '',
        id: u.user.uid
      };
      await this.userCollection.doc(u.user.uid).set(newUser);
      return newUser;
    }
    catch(e){
      throw new Error(e);
    }
  }

  async loginWithGoogleAccount() {
    try {
      const provider = new auth.GoogleAuthProvider();
      let credentials: auth.UserCredential = await this.afAuth.auth.signInWithPopup(provider);
      let user: User =  await this.updateUserData(credentials);
      return user

    }
    catch(e) {
      throw new Error(e);
    }

  }

  loginGoogle(): Observable<User> {
    return from(this.loginWithGoogleAccount());
  }

  oldloginGoogle(): Observable<User> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.auth.signInWithPopup(provider))
      .pipe(
        tap((data) => console.log(data)),
        switchMap((u: auth.UserCredential) => {
          const newUser: User = {
            firstname: u.user.displayName,
            lastname: '',
            address: '',
            city: '',
            state: '',
            phone: '',
            mobilephone: '',
            email: u.user.email,
            password: '',
            id: u.user.uid
          };
          return this.userCollection.doc(u.user.uid)
            .set(newUser).then(() => newUser);
        })
      );
  }


}
