import { Component, OnInit,  ElementRef } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
import { AgendaService } from '../agenda.service';
import { confAgenda } from '../confAgenda.model';
import { MAX_VALUE } from 'long';
import { AuthService } from 'app/main/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'app/main/auth/user';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-conf-agenda',
  templateUrl: './conf-agenda.component.html',
  styleUrls: ['./conf-agenda.component.scss']
})

export class ConfAgendaComponent implements OnInit {

  user$: Observable<User>;
  uid: string;
  confAgenda$: Observable<confAgenda[]>;

  displayedColumns = ['dia','horaInicio','horaFinal','intervalo','excluir'];
  diaSemana: string[] = ['Domingo' ,'Segunda','Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
  

  confAgendaForm = this.fb.group({
    id_confAgenda: [undefined],
    id_user: [undefined],
    dia: [undefined, [Validators.required]], // 0 domingo... 6 sabado
    horaInicio: [undefined, [Validators.required]],
    horaFinal: [undefined, [Validators.required]],
    intervalo: [undefined, [Validators.required, Validators.min(1), Validators.max(180)]]
  })

  constructor(
    private fb: FormBuilder,
    private agendaService: AgendaService,
    private authService: AuthService,
    private snackBar: MatSnackBar) { 
      this.user$ = this.authService.getUser();
    }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (u) => { 
        this.uid = u.id;
        this.getConfAgenda() 
      },
      (err) => console.log('erro',err)
    )    
  }

  getConfAgenda() {
    this.confAgenda$ = this.agendaService.getConfAgenda(this.uid);
  }

  onSubmit() {
    let c: confAgenda = this.confAgendaForm.value;
    c.id_user = this.uid;    
    console.log(c);
    this.agendaService.addConfAgenda(c)
      .then(() => {
        this.snackBar.open('Configuração adicionada com Sucesso', 'OK', {duration: 3000});
        this.formReset();        
      })
      .catch(() => {
        this.snackBar.open('Erro ao cadastrar configuração','',{duration: 3000})
      })
  }
  

  cancel() {

  }

  formReset(){
    this.confAgendaForm.reset({
      id_confAgenda: undefined,
      id_user: undefined,
      dia: undefined, // 0 domingo... 6 sabado
      horaIncio: undefined,
      horaFinal: undefined,
      intervalo: undefined
    })
  }

  del(c: confAgenda) {
    this.agendaService.delConfAgenda(c)
    .then(() => {
      this.snackBar.open('Configuração Excluida com Sucesso', 'OK', {duration: 3000})
    })
    .catch(() => {
      this.snackBar.open('Erro ao Excluir a Configuração', 'OK', {duration: 3000})
    })
  }

}
