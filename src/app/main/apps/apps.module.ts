import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { AuthGuardService } from 'app/auth/auth-guard.service';


const routes = [
  {
    path        : 'planos',
    loadChildren: './plano/plano.module#PlanoModule',  canActivate: [ AuthGuardService]
  },
  {
    path        : 'exames',
    loadChildren: './exames/exames.module#ExamesModule', canActivate: [ AuthGuardService]
  },
  {
    path        : 'agenda',
    loadChildren: './agenda/agenda.module#AgendaModule', canActivate: [ AuthGuardService]
  }
]

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
  ]
})
export class AppsModule { }
