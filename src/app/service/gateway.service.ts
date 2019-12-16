import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gateway } from '../model/gateway';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Gateway[]>('http://localhost:4200/api/api/gateway/list/');
  }
  
  listarFromArea(areaNome: string){
    return this.http.get<Gateway[]>('http://localhost:4200/api/api/gateway/listfromarea?areaNome='+areaNome);
  }

  detalhar(identificador: string){
    return this.http.get<Gateway>('http://localhost:4200/api/api/gateway/find?identificador='+identificador);

  }

  cadastrar(gateway: Gateway){
    return this.http.post<Gateway>('http://localhost:4200/api/api/gateway/insert/', gateway);
  }

  editar(gateway: Gateway){
    return this.http.post<Gateway>('http://localhost:4200/api/api/gateway/update/', gateway);
  }

  remover(identificador: string){
    return this.http.get('http://localhost:4200/api/api/gateway/remove?identificador='+identificador);

  }
}
