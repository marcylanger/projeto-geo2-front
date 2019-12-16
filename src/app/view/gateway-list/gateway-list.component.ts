import { Gateway } from 'src/app/model/gateway';
import { GatewayService } from 'src/app/service/gateway.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { MessagesService } from 'src/app/service/messages.service';
import { TdDialogService } from '@covalent/core/dialogs';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.css']
})
export class GatewayListComponent implements OnInit {

  /**
    * Lista de áreas a ser exibida
    */
  gateways: Array<Gateway>;

  /**
   * Construtor da classe
   * @param router 
   * @param activatedRoute 
   * @param funcionarioService 
   */
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private gatewayService: GatewayService,
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

  /**
   * Método para listar as áreas
   */
  listar() {
    this.gatewayService.listar().subscribe(dados => {
      console.log("Listou");
      this.gateways = dados;
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
      message: 'Tem certeza que deseja excluir esse Gateway?',
      disableClose: true, // defaults to false
      viewContainerRef: this._viewContainerRef, //OPTIONAL
      title: 'Excluir Gateway', //OPTIONAL, hides if not provided
      cancelButton: 'Não', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Sim', //OPTIONAL, defaults to 'ACCEPT'
      width: '500px', //OPTIONAL, defaults to 400px
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.gatewayService.remover(id).subscribe(dados => {
          this.messageService.toastSuccess('Gateway excluído com sucesso.');
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
