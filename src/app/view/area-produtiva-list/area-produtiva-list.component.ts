import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { MessagesService } from 'src/app/service/messages.service';
import { TdDialogService } from '@covalent/core/dialogs';
import { AreaProdutiva } from 'src/app/model/area-produtiva';
import { AreaProdutivaService } from 'src/app/service/area-produtiva.service';

@Component({
  selector: 'app-area-produtiva-list',
  templateUrl: './area-produtiva-list.component.html',
  styleUrls: ['./area-produtiva-list.component.css']
})
export class AreaProdutivaListComponent implements OnInit {


  /**
   * Lista de áreas a ser exibida
   */
  areas: Array<AreaProdutiva>;

  /**
   * Construtor da classe
   * @param router 
   * @param activatedRoute 
   * @param funcionarioService 
   */
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private areaService: AreaProdutivaService,
    private messageService: MessagesService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef) {
  }

  /**
   * Método que é executado ao carregar a classe
   */
  ngOnInit() {
    this.listar();
  }

  /**
   * Método que redireciona para cadastrar funcionário
   */
  navigateToNovo() {
    console.log("navigateToNovo");
    this.router.navigate(['cadastrar'], { relativeTo: this.activatedRoute });

  }

  /**
   * Método que redireciona para alterar ou visualizar area
   */
  navigateTo(rota: string, id: number) {

    if (rota == 'detalhar') {
      this.router.navigate(['detalhes/' + id], { relativeTo: this.activatedRoute });
    }
    else if ('alterar') {
      this.router.navigate(['alterar/' + id], { relativeTo: this.activatedRoute });

    }

  }

  navigateDetalhar(nome: string) {


    this.router.navigate(['detalhes/' + nome], { relativeTo: this.activatedRoute });


  }

  /**
   * Método para listar as áreas
   */
  listar() {
    this.areaService.listar().subscribe(dados => {
      console.log("Listou");
      this.areas = dados;
    },
      (error: any) => {
        console.log("Listou");
        this.messageService.toastError(error.error.message);
      });
  }

  /**
   * Método para remover uma área
   */
  remover(id: string) {
    this.openRemoverConfirm(id);
  }

  openRemoverConfirm(id: string): void {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja excluir essa área?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Excluir Área Produtiva', //OPTIONAL, hides if not provided
      cancelButton: 'Não', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Sim', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.areaService.remover(id).subscribe(dados => {
          this.messageService.toastSuccess('Área excluída com sucesso.');
          this.listar();
        },
          (error: any) => {
            console.log(error.error.message);
            this.messageService.toastError(error.error.message);

          });
      } else {
        // DO SOMETHING ELSE
      }
    });
  }


}
