import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlanoTable } from '../planoTable.model';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { PlanoService } from '../plano.service';
import { MatSnackBar, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PlanoModule } from '../plano.module';
import { ExameService } from '../../exames/exame.service';
import { ExameModel } from '../../exames/exameModel.model';
import { takeUntil } from 'rxjs/operators';
import { ExamesModule } from '../../exames/exames.module';
import { examesPlano } from '../examesPlano.Model';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-conf-plano',
  templateUrl: './conf-plano.component.html',
  styleUrls: ['./conf-plano.component.scss']
})
export class ConfPlanoComponent implements OnInit {

  @ViewChild('paginacaoPlanoExame', { static: true }) paginatorPlanoExame: MatPaginator;

  onPrimeiraTela: boolean = true;
  onEdit: boolean = false;
  onExamesDoPlano: boolean = true;

  nomePlano: string;

  plano$: Observable<PlanoTable[]>;
  plano: PlanoTable[];
  exames: ExameModel[] = [];
  planoSelecionado: PlanoModule;
  displayedColumns = ['descricao', 'atendePlano', 'editar', 'excluir', 'vincularExames'];
  displayedColumnsExames = ['atendeExame', 'descricao', 'valorPadrao'];
  descricao: FormControl = new FormControl('');
  private unsubscribe$: Subject<any> = new Subject();

  PlanoForm = this.fb.group({
    id_plano: [undefined],
    descricao: ['', [Validators.required, Validators.minLength(3)]],
    atendePlano: [false, [Validators.required]],
    ativo: [true, [Validators.required]]
  })

  dataSourcePlanosExames = new MatTableDataSource<ExameModel>();



  constructor(
    private fb: FormBuilder,
    private planoService: PlanoService,
    private exameService: ExameService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.plano$ = this.planoService.getPlanos();

  }

  getExames() {
    this.exameService.getExames().
      pipe(takeUntil(this.unsubscribe$))
      .subscribe((f) => {
        this.exames = f;
        this.dataSourcePlanosExames = new MatTableDataSource(this.exames);
        this.dataSourcePlanosExames.paginator =  this.paginatorPlanoExame;
      });
  }

  ngAfterViewInit() {
    this.getExames();
  }

  applyFilter(filterValue: string) {
    this.dataSourcePlanosExames.filter = filterValue.trim().toLowerCase();
  }

  edit(p: PlanoTable) {
    this.PlanoForm.setValue(p);
    this.alteraOnEdit();
  }

  alteraOnEdit() {
    this.onEdit = !this.onEdit;
    this.onPrimeiraTela = !this.onPrimeiraTela;
  }

  formReset() {
    this.PlanoForm.reset({
      id_plano: undefined,
      descricao: '',
      atende_plano: false,
      ativo: true
    })
  }

  onSubmit() {
    let p: PlanoTable = this.PlanoForm.value;
    p.descricao = p.descricao.toUpperCase();
    if (!p.id_plano) {
      this.addPlano(p);
    } else {
      this.updatePlano(p);
    }

  }

  addPlano(p: PlanoTable) {
    this.planoService.addPlano(p)
      .then(() => {
        this.snackBar.open('Plano adicionado com sucesso', 'OK', { duration: 3000 })
        this.formReset();
        this.onEdit = false;
      })
      .catch(() => {
        this.snackBar.open('Erro ao cadastrar Plano, tente novamente mais tarde', 'OK', { duration: 3000 })
      })
  }

  updatePlano(p: PlanoTable) {
    this.planoService.updatePlano(p)
      .then(() => {
        this.snackBar.open('Plano atualizado com sucesso', 'OK', { duration: 3000 });
        this.formReset();
        this.onEdit = false;
      })
      .catch(() => {
        this.snackBar.open('Erro ao atualizar Plano', 'OK', { duration: 3000 })
      })
  }

  novoPlano() {
    this.formReset();
    this.alteraOnEdit();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  cancel() {
    this.alteraOnEdit();
  }

  del(p: PlanoTable) {
    this.planoService.deletePlano(p)
      .then(() => {
        this.snackBar.open('Plano Excluido com Sucesso', 'OK', { duration: 3000 })
      })
      .catch(() => {
        this.snackBar.open('Erro ao Excluir Plano', 'OK', { duration: 3000 })
      })
  }

  alteraExamesDoPlano(p: PlanoModule) {
    this.onPrimeiraTela = false;
    this.onExamesDoPlano = !this.onExamesDoPlano;
    this.onEdit = false;

  }

  salvarExamesPlano(a) {
    console.log('exames', a);
  }

  teste(e: examesPlano, a) {
    console.log('examer', a);
  }

}



