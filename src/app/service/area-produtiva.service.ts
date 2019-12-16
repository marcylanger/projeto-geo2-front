import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AreaProdutiva } from '../model/area-produtiva';

@Injectable({
  providedIn: 'root'
})
export class AreaProdutivaService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<AreaProdutiva[]>('http://localhost:4200/api/api/areaprodutiva/list/');
  }

  detalhar(areaNome: string){
    return this.http.get<AreaProdutiva[]>('http://localhost:4200/api/api/areaprodutiva/find?nome='+areaNome);

  }

  cadastrar(area: AreaProdutiva){
    return this.http.post<AreaProdutiva>('http://localhost:4200/api/api/areaprodutiva/insert/', area);
  }

  editar(area: AreaProdutiva){
    return this.http.post<AreaProdutiva>('http://localhost:4200/api/api/areaprodutiva/update/', area);
  }

  remover(areaNome: string){
    return this.http.get('http://localhost:4200/api/api/areaprodutiva/remove?nome='+areaNome);

  }
}
