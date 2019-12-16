import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EndDevice } from 'src/app/model/end-device';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { DateAdapter } from '@angular/material';
import { EndDeviceService } from 'src/app/service/end-device.service';

import {Point, Polygon} from 'ol/geom';

import {Feature} from 'ol/index';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import Draw from 'ol/interaction/Draw';
import { Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style.js';

import { Gateway } from 'src/app/model/gateway';
import { GatewayService } from 'src/app/service/gateway.service';

@Component({
  selector: 'app-end-device-form',
  templateUrl: './end-device-form.component.html',
  styleUrls: ['./end-device-form.component.css']
})
export class EndDeviceFormComponent implements OnInit {

  /**
     * Funcionario Form
     */
    public noForm: FormGroup;

    /**
     * Objeto funcionario
     */
    public no: EndDevice;
  
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

    private gateways : Array<Gateway> = [];

    private pontos : Array<EndDevice> = [];

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
      private noService: EndDeviceService,
      private messageService: MessagesService,
      private _adapter: DateAdapter<any>,
      private gatewayService: GatewayService) { }
  
    /**
     * Método chamado ao iniciar a classe
     */
    ngOnInit() {
  
  
      this.no = new EndDevice(null, null, null, null, null, null);
      this.createForm();
      this.carregaMapa();
      this.listarGateways();
      this.no.id = this.activatedRoute.snapshot.params['id'];
      if (this.no.id) {
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
      this.noForm = this.fb.group(
        {
          identificador: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
          gateway: [null, { validators: [Validators.required], updateOn: 'blur' }]
        
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
      if (this.noForm.valid) {
  
        this.no.identificador = this.noForm.get("identificador").value;
        this.no.gateway = this.noForm.get("gateway").value;
        var features = this.vector.getSource().getFeatures();
  
        this.no.theGeom = features[0].getGeometry();
        // Go through this array and get coordinates of their geometry.
        var poligono = features[0].getGeometry();
        this.no.x = poligono.getCoordinates()[0];
        this.no.y = poligono.getCoordinates()[1];
        
        /*features.forEach(function (feature) {
          console.log(feature.getGeometry().getCoordinates());
        });*/
  
        console.log(this.no);
        /**
         * Verifica se é cadastro ou edição
         */
        if (this.no.id == null) {
          this.noService.cadastrar(this.no).subscribe(res => {
            this.no = res;
            this.messageService.toastSuccess('End Device cadastrado com sucesso.');
            this.onBack();
          },
            (error: any) => {
              this.messageService.toastWarnning(error.error.message);
              this.onBack();
            });
        }
        else {
          this.noService.editar(this.no).subscribe(res => {
            this.no = res;
            this.isOnUpdate = true;
            this.messageService.toastSuccess('End Device atualizado com sucesso.');
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
      this.noService.detalhar(this.no.identificador).subscribe(res => {
        this.noForm.get("identificador").setValue(res.identificador);
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
  
      

      

      var features = [];
      this.noService.listar().subscribe(dados => {
        console.log("Listou");
        this.pontos = dados;

        this.pontos.forEach(function (ponto) {
          var place = [ponto.x, ponto.y];

          var ponto = new Point(place);
          console.log(ponto.x);
          console.log(ponto.y);
          features.push(new Feature(ponto));
        });
      },
        (error: any) => {
          console.log("Listou");
          this.messageService.toastError(error.error.message);
        });


      
      var source = new VectorSource({ 
        wrapX: false,
        features: features
        });

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

    listarGateways() {
      this.gatewayService.listar().subscribe(dados => {
        this.gateways = dados;
      },
        (error: any) => {
          this.messageService.toastError(error.error.message);
        });
    }
  

}
