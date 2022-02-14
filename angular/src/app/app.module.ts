import { SelectProductComponent } from './pages/HoaDon/select-product/select-product.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppBsModalModule } from './_components/shared/common/appBsModal/app-bs-modal.module';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './_components/department/department.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { routing } from './routes';
import { HomeComponent } from './_components/home/home.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoginComponent } from './_components/login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { RegisterComponent } from './_components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TmssDatepickerComponent } from './_components/shared/common/input-types/tmss-datepicker/tmss-datepicker.component';
import { NavbarComponent } from './_components/shared/common/navbar/navbar.component';
import { TmssComboboxComponent } from './_components/shared/common/input-types/tmss-combobox/tmss-combobox.component';
import { TmssTextInputComponent } from './_components/shared/common/input-types/tmss-text-input/tmss-text-input.component';
import { GridTableComponent } from './_components/shared/common/grid/grid-table/grid-table.component';
import { GridPaginationComponent } from './_components/shared/common/grid/grid-pagination/grid-pagination.component';
import { AgCellButtonRendererComponent } from './_components/ag-cell-button-renderer/ag-cell-button-renderer.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { CreateOrEditEmployeeComponent } from './pages/employee/employee/create-or-edit-employee/create-or-edit-employee.component';

import { CustomerComponent } from './pages/customer/customer.component';
import { CreateOrEditCustomerComponent } from './pages/customer/create-or-edit-customer/create-or-edit-customer.component';

import { CreateOrEditOrderComponent } from './pages/order/create-or-edit-order/create-or-edit-order.component';
import { OrderComponent } from './pages/order/order.component';

import { CreateOrEditPetsComponent } from './pages/pets/create-or-edit-pets/create-or-edit-pets.component';
import { PetsComponent } from './pages/pets/pets.component';

import { CreateOrEditSanPhamComponent } from './pages/sanPham/create-or-edit-sanpham/create-or-edit-sanPham.component';
import { SanPhamComponent } from './pages/sanPham/sanPham.component';

import { CreateOrEditHoaDonComponent } from './pages/HoaDon/create-or-edit-order/create-or-edit-HoaDon.component';
import { HoaDonComponent } from './pages/HoaDon/HoaDon.component';

import { AssignComponent } from './pages/assign/assign.component';
import { LogInfoComponent } from './pages/log-info/log-info.component';
import { AssignListComponent } from './pages/assign/assign-list/assign-list.component';
import { PayoffComponent } from './pages/payoff/payoff.component';
import { CreateOrEditPayoffComponent } from './pages/payoff/create-or-edit-payoff/create-or-edit-payoff.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreateOrEditUserPayoffComponent } from './pages/payoff/create-or-edit-user-payoff/create-or-edit-user-payoff.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { DataFormatService } from './_services/data-format.service';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PetsComponent,
    SanPhamComponent,
    TmssDatepickerComponent,
    NavbarComponent,
    TmssComboboxComponent,
    TmssTextInputComponent,
    GridTableComponent,
    GridPaginationComponent,
    AgCellButtonRendererComponent,
    EmployeeComponent,
    CustomerComponent,
    HoaDonComponent,
    CreateOrEditCustomerComponent,
    CreateOrEditEmployeeComponent,
    OrderComponent,
    CreateOrEditOrderComponent,
    AssignComponent,
    LogInfoComponent,
    AssignListComponent,
    CreateOrEditPayoffComponent,
    CreateOrEditUserPayoffComponent,
    PayoffComponent,
    SalaryComponent,
    CreateOrEditPetsComponent,
    CreateOrEditSanPhamComponent,
    CreateOrEditHoaDonComponent,
    SelectProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    routing,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AppBsModalModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    TabsModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
