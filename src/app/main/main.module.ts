import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { MainRoutingModule } from './main-routing.module';
import { LoginMedicoComponent } from './login-medico/login-medico.component';
import { PeopleComponent } from './people/people.component';
import { MaterialModule } from 'app/material.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { ReactiveFormsModule } from '@angular/forms';
import { MainService } from './main.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const routes: Routes = [
  { path: '', redirectTo: 'people'},
  { path: 'people', component: PeopleComponent}
];


@NgModule({
  declarations: [LoginMedicoComponent, PeopleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MaterialModule
  ],
  providers: [ AngularFirestore, MainService  ]
})
export class MainModule { }
