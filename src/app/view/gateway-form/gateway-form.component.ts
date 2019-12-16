import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreaProdutiva } from 'src/app/model/area-produtiva';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaProdutivaService } from 'src/app/service/area-produtiva.service';
import { MessagesService } from 'src/app/service/messages.service';
import { DateAdapter } from '@angular/material';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import Draw from 'ol/interaction/Draw';
import { Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style.js';
import { Polygon } from 'src/app/model/polygon';
import { Gateway } from 'src/app/model/gateway';
import { GatewayService } from 'src/app/service/gateway.service';

@Component({
  selector: 'app-gateway-form',
  templateUrl: './gateway-form.component.html',
  styleUrls: ['./gateway-form.component.css']
})
export class GatewayFormComponent implements OnInit {

  /**
     * Funcionario Form
     */
    public gatewayForm: FormGroup;

    /**
     * Objeto funcionario
     */
    public gateway: Gateway;
  
    /**
    * Controla se é atualização
    */
    private isOnUpdate: boolean = false;
  
  
    //public draw : Draw; // global so we can remove it later
  
    //private map;
  
    private vector;
  
    private raster;
  
    private x : number[] = [];
  
    private y : number[] = [];
    /**
     * Construtor da classe
     * @param fb 
     * @param activatedRoute 
     * @param router 
     * @param departamentoService 
     */
    constructor(private fb: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private gatewayService: GatewayService,
      private messageService: MessagesService,
      private _adapter: DateAdapter<any>) { }
  
    /**
     * Método chamado ao iniciar a classe
     */
    ngOnInit() {
  
  
      this.gateway = new Gateway(null, null, null, null, null, null);
      this.createForm();
      this.carregaMapa();
      this.gateway.id = this.activatedRoute.snapshot.params['id'];
      if (this.gateway.id) {
        this.loadToEdit();
      }
  
    }
  
    /**
     * Método para criar o formulário
     */
    public createForm() {
      /**
       * Instancia uma classe FormGroup
       */
      this.gatewayForm = this.fb.group(
        {
          identificador: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
          raio: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }]
        
        }
  
  
      );
  
      /**
       * Seta o locale da data para usar padrão brasileiro
       */
      this._adapter.setLocale('pt');
  
    }
  
  
    /**
     * Método para salvar o funcionario
     */
    onSave() {
      if (this.gatewayForm.valid) {
  
        this.gateway.identificador = this.gatewayForm.get("identificador").value;
        this.gateway.raioAlcance = this.gatewayForm.get("raio").value;
        var features = this.vector.getSource().getFeatures();
  
        this.gateway.theGeom = features[0].getGeometry();
        // Go through this array and get coordinates of their geometry.
        var poligono = features[0].getGeometry();
        this.gateway.x = poligono.getCoordinates()[0];
        this.gateway.y = poligono.getCoordinates()[1];
        
        /*features.forEach(function (feature) {
          console.log(feature.getGeometry().getCoordinates());
        });*/
  
        console.log(this.gateway);
        /**
         * Verifica se é cadastro ou edição
         */
        if (this.gateway.id == null) {
          this.gatewayService.cadastrar(this.gateway).subscribe(res => {
            this.gateway = res;
            this.messageService.toastSuccess('Gateway cadastrada com sucesso.');
            this.onBack();
          },
            (error: any) => {
              this.messageService.toastError(error.error.message);
            });
        }
        else {
          this.gatewayService.editar(this.gateway).subscribe(res => {
            this.gateway = res;
            this.isOnUpdate = true;
            this.messageService.toastSuccess('Gateway atualizada com sucesso.');
            this.onBack();
          },
            (error: any) => {
              this.messageService.toastError(error.error.message);
            });
        }
  
      } else {
        this.messageService.toastWarnning('Preencha todos os campos obrigatórios antes de salvar.');
  
      }
    }
  
  
  
    /**
     * Método para popular o formulário com os dados do funcionário em edição
     */
    loadToEdit() {
      this.gatewayService.detalhar(this.gateway.identificador).subscribe(res => {
        this.gatewayForm.get("identificador").setValue(res.identificador);
        this.isOnUpdate = true;
      },
        (error: any) => {
          this.messageService.toastError(error.error.message);
        });
  
    }
  
    /**
     * Método para voltar a pagina de list de funcionarios
     */
    onBack() {
      if (!this.isOnUpdate) {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      }
  
    }
  
  
  
    carregaMapa() {
      this.raster = new TileLayer({
        source: new BingMaps({
          key: 'Ame9J_T8Eo4bLY9Uwg4Vo-MZC4pQuWSnWFOBi9mYEfrwC3XNxqLNpYSlyMxb2F3q',
          imagerySet: 'AerialWithLabels'
        })
      });
  
      var source = new VectorSource({ wrapX: false });
  
      this.vector = new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: '#ffcc33'
            })
          })
        })
      });
  
  
  
  
  
  
      var map = new Map({
        layers: [this.raster, this.vector],
        target: 'map',
        view: new View({
          projection: "EPSG:4326",
          center: [-54.1015603474702, -25.2604871173066],
          zoom: 13
        })
      });
  
  
  
      function addInteraction() {
        var draw = new Draw({
          source: source,
          type: 'Point'
        });
        map.addInteraction(draw);
  
      }
  
  
  
  
      addInteraction();
  
  
      /*const button = document.getElementById('capturarCoordenadas');
      button.addEventListener('click', function (e) {
        var features = vector.getSource().getFeatures();
  
        // Go through this array and get coordinates of their geometry.
        features.forEach(function (feature) {
          alert(feature.getGeometry().getCoordinates());
        });
      });*/
    }
  

}
