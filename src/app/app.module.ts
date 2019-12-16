import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatListModule, MatCardModule, MatMenuModule, MatInputModule, MatButtonToggleModule, MatIconModule,
  MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatToolbarModule,
  MatTabsModule, MatSidenavModule, MatTooltipModule, MatRippleModule, MatRadioModule, MatGridListModule,
  MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatAutocompleteModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { CovalentCommonModule, CovalentLayoutModule, CovalentMediaModule, CovalentExpansionPanelModule,
  CovalentStepsModule, CovalentLoadingModule, CovalentSearchModule, CovalentPagingModule,
  CovalentNotificationsModule, CovalentMenuModule, CovalentDataTableModule, CovalentMessageModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AreaProdutivaListComponent } from './view/area-produtiva-list/area-produtiva-list.component';
import { MenuComponent } from './view/menu/menu/menu.component';
import { AreaProdutivaFormComponent } from './view/area-produtiva-form/area-produtiva-form.component';
import { GatewayListComponent } from './view/gateway-list/gateway-list.component';
import { GatewayFormComponent } from './view/gateway-form/gateway-form.component';
import { EndDeviceListComponent } from './view/end-device-list/end-device-list.component';
import { EndDeviceFormComponent } from './view/end-device-form/end-device-form.component';
import { AreaProdutivaDetailComponent } from './view/area-produtiva-detail/area-produtiva-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaProdutivaListComponent,
    MenuComponent,
    AreaProdutivaFormComponent,
    GatewayListComponent,
    GatewayFormComponent,
    EndDeviceListComponent,
    EndDeviceFormComponent,
    AreaProdutivaDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    /** Material Modules */
    
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
