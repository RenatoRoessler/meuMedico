import { Component, OnInit } from '@angular/core';
import { ExameModel } from '../exameModel.model';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ExameService } from '../exame.service';
import { MatSnackBar } from '@angular/material';
import { PlanoService } from '../../plano/plano.service';
import { PlanoTable } from '../../plano/planoTable.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-conf-exame',
  templateUrl: './conf-exame.component.html',
  styleUrls: ['./conf-exame.component.css']
})
export class ConfExameComponent implements OnInit {

  onEdit: boolean = false;
  exame$: Observable<ExameModel[]>;
  exame: ExameModel[] = [] ;
  planos: PlanoTable[] = [];
  displayedColumns = ['descricao', 'valorPadrao', 'atendeExame','editar', 'excluir'];
  descricao: FormControl = new FormControl('');
  private unsubscribe$: Subject<any> = new Subject();

   exameForm = this.fb.group({
    id_Exame:[undefined],
    descricao: ['', [Validators.required, Validators.minLength(3)]],
    valorPadrao: [0,[Validators.required]],
    atendeExame : [false, [Validators.required]],
    ativo: [false, [Validators.required]]
    //id_plano: [undefined, [Validators.required]]
  })


  constructor(
    private fb: FormBuilder,
    private exameService: ExameService,
    private planoService: PlanoService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.teste();
    this.exame$ = this.exameService.getExames();
    this.planoService.getPlanos()
      .pipe( takeUntil(this.unsubscribe$) )
      .subscribe((f) =>  {
        this.planos = f;
      });
  }
  teste () {
    console.log('teste');
  }

  onSubmit() {
    let e: ExameModel = this.exameForm.value;
    e.descricao = e.descricao.toUpperCase();
    console.log(e);
    if(!e.id_Exame) {
      this.addExame(e);
    } else {
      this.updateExame(e);
    }

  }

  addExame(e: ExameModel) {
    this.exameService.addExame(e)
      .then(() => {
        this.snackBar.open('Exame cadastrado com sucesso', 'ok', {duration: 3000});
        this.formReset();
        this.onEdit = false;
      })
      .catch(() => {
        this.snackBar.open('Erro ao cadastrar Exame','OK', {duration: 3000})
      })
  }
  
  updateExame(e: ExameModel) {
    this.exameService.updateExame(e)
      .then(() => {
        this.snackBar.open('Exame atualizado com sucesso', 'OK', {duration: 3000});
        this.formReset();
        this.onEdit = false;
      }) 
      .catch(() => {
        this.snackBar.open('Erro ao atualizar Exame','OK', {duration: 3000})
      })
  }

  novoExame() {
    this.formReset();
    this.alteraOnEdit();
  }

  formReset() {
    this.exameForm.reset({
      id_Exame: undefined,
      descricao: '',
      valorPadrao: 0,
      atendeExame: false,
      ativo:false,
      id_plano: undefined
    })
  }

  alteraOnEdit() {
    this.onEdit = !this.onEdit;
  }

  ngOnDestroy(){
    this.unsubscribe$.next();    
  }

  cancel() {
    this.alteraOnEdit();      
  }

  edit(e : ExameModel) {
      this.exameForm.setValue(e);
      this.alteraOnEdit();
  }

  del(e: ExameModel) {
    this.exameService.deleteExame(e)
      .then(() => {
        this.snackBar.open('Examne Excluido com Sucesso', 'OK', {duration : 3000})
      })
      .catch(() => {
        this.snackBar.open('Erro ao Excluir o Exame', 'OK', {duration: 3000})
      })
  }

}
