import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndDevice } from '../model/end-device';

@Injectable({
  providedIn: 'root'
})
export class EndDeviceService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<EndDevice[]>('http://localhost:4200/api/api/enddevice/list/');
  }

  listarFromArea(areaNome: string){
    return this.http.get<EndDevice[]>('http://localhost:4200/api/api/enddevice/listfromarea?areaNome='+areaNome);
  }

  detalhar(identificador: string){
    return this.http.get<EndDevice>('http://localhost:4200/api/api/enddevice/find?identificador='+identificador);

  }

  cadastrar(no: EndDevice){
    return this.http.post<EndDevice>('http://localhost:4200/api/api/enddevice/insert/', no);
  }

  editar(no: EndDevice){
    return this.http.post<EndDevice>('http://localhost:4200/api/api/enddevice/update/', no);
  }

  remover(identificador: string){
    return this.http.get('http://localhost:4200/api/api/enddevice/remove?identificador='+identificador);

  }
}
