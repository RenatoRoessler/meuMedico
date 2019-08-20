import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
//import { FuseSharedModule } from '@fuse/shared.module';
//import { FuseSidebarModule } from '@fuse/components';
import { AngularFireAuth } from '@angular/fire/auth';

const routes: Routes = [
  //{ path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [ LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    //FuseSharedModule,
    //FuseSidebarModule
  ],
  providers: [ AngularFirestore, AuthService, AngularFireAuth  ]
})
export class AuthModule { }
