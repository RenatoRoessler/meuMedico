import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfAgendaComponent } from './conf-agenda/conf-agenda.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxMaskModule } from 'ngx-mask';
import { AgendaService } from './agenda.service';
import { NumberDirective } from './numbers-only.directive';

const routes: Routes = [
  {
    path: 'confAgenda',
    component: ConfAgendaComponent
  }]


@NgModule({
  declarations: [ConfAgendaComponent, NumberDirective],
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
    AgendaService]
})
export class AgendaModule { }
