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

@Component({
  selector: 'app-area-produtiva-form',
  templateUrl: './area-produtiva-form.component.html',
  styleUrls: ['./area-produtiva-form.component.css']
})
export class AreaProdutivaFormComponent implements OnInit {

  /**
     * Funcionario Form
     */
  public areaForm: FormGroup;

  /**
   * Objeto funcionario
   */
  public area: AreaProdutiva;

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
    private areaService: AreaProdutivaService,
    private messageService: MessagesService,
    private _adapter: DateAdapter<any>) { }

  /**
   * Método chamado ao iniciar a classe
   */
  ngOnInit() {


    this.area = new AreaProdutiva(null, null, null, null, [], []);
    this.createForm();
    this.carregaMapa();
    this.area.id = this.activatedRoute.snapshot.params['id'];
    if (this.area.id) {
  
    }

  }

  /**
   * Método para criar o formulário
   */
  public createForm() {
    /**
     * Instancia uma classe FormGroup
     */
    this.areaForm = this.fb.group(
      {
        nome: [null, { validators: [Validators.required, Validators.maxLength(144)], updateOn: 'blur' }],
        descricao: [null]
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
    if (this.areaForm.valid) {

      this.area.nome = this.areaForm.get("nome").value;
      this.area.descricao = this.areaForm.get("descricao").value;
      
      var features = this.vector.getSource().getFeatures();

      this.area.theGeom = features[0].getGeometry();
      // Go through this array and get coordinates of their geometry.
      var poligono = features[0].getGeometry();

      var i: number = 0;
      for (i = 0; i < poligono.getCoordinates()[0].length; i++) {
        this.area.x.push(poligono.getCoordinates()[0][i][0]);
        this.area.y.push(poligono.getCoordinates()[0][i][1]);
      }
      /*features.forEach(function (feature) {
        console.log(feature.getGeometry().getCoordinates());
      });*/

      console.log(this.area);
      /**
       * Verifica se é cadastro ou edição
       */
      if (this.area.id == null) {
        this.areaService.cadastrar(this.area).subscribe(res => {
          this.area = res;
          this.messageService.toastSuccess('Área cadastrada com sucesso.');
          this.onBack();
        },
          (error: any) => {
            this.messageService.toastError(error.error.message);
          });
      }
      else {
        this.areaService.editar(this.area).subscribe(res => {
          this.area = res;
          this.isOnUpdate = true;
          this.messageService.toastSuccess('Área atualizada com sucesso.');
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
        type: 'Polygon'
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
