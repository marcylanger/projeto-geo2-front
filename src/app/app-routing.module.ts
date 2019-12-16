import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaProdutivaListComponent } from './view/area-produtiva-list/area-produtiva-list.component';
import { AreaProdutivaFormComponent } from './view/area-produtiva-form/area-produtiva-form.component';
import { GatewayListComponent } from './view/gateway-list/gateway-list.component';
import { GatewayFormComponent } from './view/gateway-form/gateway-form.component';
import { EndDeviceListComponent } from './view/end-device-list/end-device-list.component';
import { EndDeviceFormComponent } from './view/end-device-form/end-device-form.component';
import { AreaProdutivaDetailComponent } from './view/area-produtiva-detail/area-produtiva-detail.component';


const routes: Routes = [

  {
    component: AreaProdutivaListComponent,
    path: 'areasprodutivas'
  },
  {
    component: AreaProdutivaFormComponent,
    path: 'areasprodutivas/cadastrar'
  },
  {
    component: AreaProdutivaDetailComponent,
    path: 'areasprodutivas/detalhes/:nome'
  },
  {
    component: GatewayListComponent,
    path: 'gateways'
  },
  {
    component: GatewayFormComponent,
    path: 'gateways/cadastrar'
  },
  {
    component: EndDeviceListComponent,
    path: 'enddevices'
  },
  {
    component: EndDeviceFormComponent,
    path: 'enddevices/cadastrar'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
