import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire/firebase.app.module';
import { environment } from 'environments/environment';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NotFoundComponent } from './main/apps/not-found/not-found.component';
import { AuthModule } from './main/auth/auth.module';


const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/main/people'},
    { path: 'main', loadChildren: './main/main.module#MainModule'}, //loadChildren carrega module
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path        : 'auth',
        loadChildren: './main/auth/auth.module#AuthModule'
    },
    {  path      : '**',   component: NotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    providers: [AngularFirestore],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        //MatButtonModule,
        //MatIconModule,
        MaterialModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        ReactiveFormsModule,

        // App modules
        LayoutModule,
        SampleModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AuthModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
