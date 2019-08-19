import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfPlanoComponent } from './conf-plano/conf-plano.component';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database/database.module';
import { PlanoService } from './plano.service';
import { ExamesDoPlanoComponent } from './exames-do-plano/exames-do-plano.component';
import { ExameService } from '../exames/exame.service';
import { CurrencyMaskModule  } from 'ng2-currency-mask';

 
const routes: Routes = [
  {
      path     : '**',
      component: ConfPlanoComponent
  }
]

@NgModule({
  declarations: [
    ConfPlanoComponent,
    ExamesDoPlanoComponent
  ],
  providers: [AngularFirestore, 
      PlanoService, 
      ExameService    
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
    CurrencyMaskModule
  ]
})
export class PlanoModule { }
