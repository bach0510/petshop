import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { UserService } from 'src/app/_services/user.service';
import { ceil } from 'lodash';
import * as moment from 'moment';
import { GetShippersInputDto } from 'src/app/_models/get-shippers-input-dto';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';
import { CustomerService } from 'src/app/_services/customer.service';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { Customer } from 'src/app/_models/customer';
import { CacheService } from 'src/app/_services/cache.service';
import { OrderService } from 'src/app/_services/order.service';
import { GetOrderInputDto } from 'src/app/_models/get-order-input-dto';
declare let alertify: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  @ViewChild('createOrEditCustomer', { static: true }) createOrEditCustomer: CreateOrEditCustomerComponent;
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;
  selectedData;
  cusName: string;
  cusEmail: string;
  cusTel: string;
  cusCmnd: string;
  areaList: any[]=[];
  areaId : number = 0;

  constructor(private _customerService: CustomerService,private _cacheService: CacheService,private _orderService :OrderService) {
    this.columnsDef = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: (params) =>
          (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize +
          params.rowIndex +
          1,
      },
      {
        headerName: 'Tên KH',
        field: 'CusName',
      },
      {
        headerName: 'CMND',
        field: 'CusCmnd',
      },
      {
        headerName: 'SĐT',
        field: 'CusTel',
      },
      {
        headerName: 'Email',
        field: 'CusEmail',
      },
      {
        headerName: 'Địa chỉ',
        field: 'CusAdd',
      },
    ];

    this.defaultColDef = {
      flex: 1,
      resizable: true,
      suppressMenu: true,
      menuTabs: [],
      tooltipValueGetter: (t: any) => t.value,
      textFormatter: function (r) {
        if (r == null) return null;
        return r.toLowerCase();
      },
    };
  }

  ngOnInit() {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getCacheData();
  }

  getCacheData(){
    this.areaList = [];
    this._cacheService.getArea().subscribe(res => {
      this.areaList.push({label:"Tất cả",value:0});
      res.forEach(e => this.areaList!.push({
        label: e.AreaName!,
        value: e.Id!,
      }))
    })
  }

  onSearch() {
    this.callBackEvent(this.params);
  }

  callBackEvent(event) {
    this.params = event;
    var cus = new GetCusInputDto();
    cus.CusName = this.cusName ?? '';
    cus.CusEmail = this.cusEmail ?? '';
    cus.CusTel = this.cusTel ?? '';
    cus.CusCmnd = this.cusCmnd ?? '';
    cus.AreaId = this.areaId ?? 0;

    this._customerService.getCustomers(cus).subscribe((res) => {
      this.rowData = res;
      this.pagedRowData =
        this.rowData.length > 0
          ? this.rowData.slice(
            (this.paginationParams.pageNum - 1) *
            this.paginationParams.pageSize,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      this.paginationParams.totalCount = this.rowData.length;
      this.paginationParams.totalPage = ceil(
        this.rowData.length / this.paginationParams.pageSize
      );
      this.paginationParams.pageNum = 1;
    });
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;
    var cus = new GetCusInputDto();
    cus.CusName = this.cusName ?? '';
    cus.CusEmail = this.cusEmail ?? '';
    cus.CusTel = this.cusTel ?? '';
    cus.CusCmnd = this.cusCmnd ?? '';
    cus.AreaId = this.areaId ?? 0;


    this._customerService.getCustomers(cus).subscribe((res) => {
      this.rowData = res;
      this.pagedRowData = this.rowData
        ? this.rowData.slice(
          this.paginationParams.skipCount,
          this.paginationParams.pageNum * this.paginationParams.pageSize
        )
        : [];
    });
    this.params.api?.setRowData(this.pagedRowData);
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }

  getVehicleCard() {
    this.callBackEvent(this.params);
  }

  add() {
    this.selectedData = new Customer();
    this.createOrEditCustomer.show(this.selectedData);
  }

  edit() {
    this.createOrEditCustomer.show(this.selectedData);
  }

  delete() {
    var order = new GetOrderInputDto();
    order.OrderCode = '';
    order.OrderName = '';
    order.Status = '';
    this._orderService.getOrders(order).subscribe(e => {
      if(e.filter(k => k.CustomerId == this.selectedData.Id).length > 0){
        alertify.error("Khách hàng này đang có đơn bạn không thể xóa thông tin của khách hàng này");
      }
      else{
        this._customerService
      .deleteCustomer(this.selectedData)
      .subscribe(
        (res) => {
          alertify.success('Xóa khách hàng thành công');
          this.callBackEvent(this.params);
        },
        (err) => console.log(err)
      );
      }
    })
    
  }

  modalSave(event) {
    console.log(event);
    if (event.Id) {
      this._customerService.updateCustomer(event).subscribe(res => {
      }, er => console.log(er), () => {
        this.callBackEvent(this.params);
      });
      alertify.success('Cập nhật thành công');
      this.callBackEvent(this.params);
      this.selectedData = undefined;
    } else {
      this._customerService.registerCustomer(event).subscribe(res => { }, err => console.log(err), () => this.callBackEvent(this.params));
      alertify.success('Thêm mới thành công');
      this.callBackEvent(this.params);
      this.selectedData = undefined;
    }
  }
}
