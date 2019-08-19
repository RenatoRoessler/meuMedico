import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfExameComponent } from './conf-exame/conf-exame.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ExameService } from './exame.service';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { PlanoService } from '../plano/plano.service';

//export const options: Partial<IConfig> | (() => Partial<IConfig>);

const routes: Routes = [
  {
      path     : '**',
      component: ConfExameComponent
  }
]


@NgModule({
  declarations: [
    ConfExameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxMaskModule.forRoot()
  ],
  providers: [AngularFirestore,
              ExameService,
              PlanoService]
})
export class ExamesModule { }
