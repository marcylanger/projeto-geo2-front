import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/model/gateway';
import { GatewayService } from 'src/app/service/gateway.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { AreaProdutiva } from 'src/app/model/area-produtiva';
import { AreaProdutivaService } from 'src/app/service/area-produtiva.service';
import { EndDeviceService } from 'src/app/service/end-device.service';
import { EndDevice } from 'src/app/model/end-device';

@Component({
  selector: 'app-area-produtiva-detail',
  templateUrl: './area-produtiva-detail.component.html',
  styleUrls: ['./area-produtiva-detail.component.css']
})
export class AreaProdutivaDetailComponent implements OnInit {

  /**
   * Objeto funcionário
   */
  public area: AreaProdutiva;

  public gateways: Array<Gateway> = [];

  public nos: Array<EndDevice> = [];

  constructor(private gatewayService: GatewayService,
    private areaService: AreaProdutivaService,
    private noService: EndDeviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService) { }

  ngOnInit() {
    this.area = new AreaProdutiva(null, null, null, null, null, null);
    this.area.nome = this.activatedRoute.snapshot.params['nome'];
    if (this.area.nome) {
      this.loadDados();
    }

  }

  /**
   * Método para popular os campos com os dados do funcionário em visualização
   */
  loadDados() {
    this.areaService.detalhar(this.area.nome).subscribe(res => {
      this.area = new AreaProdutiva(res[0].id, res[0].nome, res[0].descricao, res[0].theGeom, res[0].x, res[0].y);
    },
      (error: any) => {
        this.messageService.toastError(error.error.message);
      });

    this.gatewayService.listarFromArea(this.area.nome).subscribe(dados => {
      console.log("Listou");
      this.gateways = dados;
    },
      (error: any) => {
        console.log("Listou");
        this.messageService.toastError(error.error.message);
      });

    this.noService.listarFromArea(this.area.nome).subscribe(dados => {
      console.log("Listou");
      this.nos = dados;
    },
      (error: any) => {
        console.log("Listou");
        this.messageService.toastError(error.error.message);
      });
  }

  /**
   * Método para voltar a pagina de list de funcionarios
   */
  onBack() {

    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });

  }


}
