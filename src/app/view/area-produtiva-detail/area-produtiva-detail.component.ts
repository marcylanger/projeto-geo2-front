import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/model/gateway';
import { GatewayService } from 'src/app/service/gateway.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { AreaProdutiva } from 'src/app/model/area-produtiva';
import { AreaProdutivaService } from 'src/app/service/area-produtiva.service';
import { EndDeviceService } from 'src/app/service/end-device.service';
import { EndDevice } from 'src/app/model/end-device';

import {Point, Polygon, LinearRing} from 'ol/geom';

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

  private vector;
  
    private raster;

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

    this.raster = new TileLayer({
      source: new BingMaps({
        key: 'Ame9J_T8Eo4bLY9Uwg4Vo-MZC4pQuWSnWFOBi9mYEfrwC3XNxqLNpYSlyMxb2F3q',
        imagerySet: 'AerialWithLabels'
      })
    });

    var features = [];
    this.areaService.detalhar(this.area.nome).subscribe(res => {
      this.area = new AreaProdutiva(res[0].id, res[0].nome, res[0].descricao, res[0].theGeom, res[0].x, res[0].y);
      
      var i: number = 0;
      var sitePoints = [];
      var pontos = [];
      //var epsg4326 = new Projection("EPSG:4326");
      for (i = 0; i < this.area.x.length; i++) {
        pontos = [this.area.x[i], this.area.y[i]];
        sitePoints.push(pontos);
      }
      //sitePoints.push(sitePoints[0]);
      console.log(sitePoints);
      /*var geometry = new Polygon([
        [ [10.689697265625, -25.0927734375], [34.595947265625, -20.1708984375], [38.814697265625, -35.6396484375],
          [13.502197265625, -39.1552734375], [10.689697265625, -25.0927734375] ]
    ]);*/
    //var linearRing = new LinearRing(sitePoints);
    var geometry = new Polygon([sitePoints]);
      features.push(new Feature(geometry));

      this.gatewayService.listarFromArea(this.area.nome).subscribe(dados => {
        console.log("Listou");
        this.gateways = dados;
        
        this.gateways.forEach(function (ponto) {
          var place = [ponto.x, ponto.y];
  
          var ponto = new Point(place);
          console.log(ponto);
          console.log(ponto.x);
          console.log(ponto.y);
          features.push(new Feature(ponto));
  
  
        });
  
        this.noService.listarFromArea(this.area.nome).subscribe(dados => {
          console.log("Listou");
          this.nos = dados;
          this.nos.forEach(function (ponto) {
            var place = [ponto.x, ponto.y];
    
            var ponto = new Point(place);
            console.log(ponto.x);
            console.log(ponto.y);
            features.push(new Feature(ponto));
          });
          console.log(features)
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
        },
          (error: any) => {
            console.log("Listou");
            this.messageService.toastError(error.error.message);
          });
  
      },
        (error: any) => {
          console.log("Listou");
          this.messageService.toastError(error.error.message);
        });
    },
      (error: any) => {
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
