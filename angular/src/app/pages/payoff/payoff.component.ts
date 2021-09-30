import { PayoffDto } from './../../_models/payoffDto';
import { Payoff } from './../../_models/payoff';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { UserService } from 'src/app/_services/user.service';
import { ceil } from 'lodash';
import * as moment from 'moment';
import { GetShippersInputDto } from 'src/app/_models/get-shippers-input-dto';
import { CreateOrEditPayoffComponent } from './create-or-edit-payoff/create-or-edit-payoff.component';
import { CustomerService } from 'src/app/_services/customer.service';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { Customer } from 'src/app/_models/customer';
import { CacheService } from 'src/app/_services/cache.service';
import { PayoffService } from 'src/app/_services/payoff.service';
import { CreateOrEditUserPayoffComponent } from './create-or-edit-user-payoff/create-or-edit-user-payoff.component';
import { DataFormatService } from 'src/app/_services/data-format.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
declare let alertify: any;
@Component({
  selector: 'app-payoff',
  templateUrl: './payoff.component.html',
  styleUrls: ['./payoff.component.scss'],
})
export class PayoffComponent implements OnInit {
  @ViewChild('createOrEditPayoff', { static: true }) createOrEditPayoff: CreateOrEditPayoffComponent;
  @ViewChild('createOrEditUserPayoff', { static: true }) createOrEditUserPayoff: CreateOrEditUserPayoffComponent;
  paginationParams: PaginationParamsModel;
  userPayoffPaginationParams: PaginationParamsModel

  columnsDef;
  defaultColDef;
  isPayoff= false;
  rowData = [];
  userPayoffRowData = [];
  pagedRowData = [];
  pagedRowDataUser = [];
  bonusList = [];
  punishList = [];
  userList = [];
  params: any;
  user;
  selectedData;
  cusName: string;
  cusEmail: string;
  cusTel: string;
  cusCmnd: string;
  areaList: any[]=[];
  areaId : number = 0;
  currentUser;

  payoff : PayoffDto = new PayoffDto();
  userPayoffColdef;

  constructor(private _payoffService: PayoffService,private _cacheService: CacheService,private _userService : UserService,private formatService : DataFormatService,private authenticationService: AuthenticationService) {
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
        headerName: 'Nội dung',
        field: 'PayoffName',
      },
      {
        headerName: 'Số tiền',
        field: 'Price',
      },
    ];

    this.userPayoffColdef = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: (params) =>
          (this.userPayoffPaginationParams.pageNum - 1) * this.userPayoffPaginationParams.pageSize +
          params.rowIndex +
          1,
      },
      {
        headerName: 'Tên shipper',
        field: 'UserId',
        valueGetter: params => params.data.UserId ? this.userList.find(e => e.value == params.data.UserId)?.label : undefined,
      },
      {
        headerName: 'Lý do',
        field: 'PayoffId',
        valueGetter: params => this.payoff.Type == 1 ? this.bonusList.find(e => e.value == params.data.PayoffId)?.label : this.punishList.find(e => e.value == params.data.PayoffId)?.label,
      },
      {
        headerName: 'Ngày',
        field: 'PayoffTime',
        valueGetter: params => params ? this.formatService.dateFormat(params.data.PayoffTime) : "",
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
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.userPayoffPaginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getCacheData();
    this.payoff.Type = 1;
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
    this.payoff.Type = 1;
    this._payoffService.getPayoff(this.payoff).subscribe(res => {
      res.forEach(e => this.bonusList!.push({
        label: e.PayoffName!,
        value: e.Id!,
      }))
    })
    this.payoff.Type = 2;
    this._payoffService.getPayoff(this.payoff).subscribe(res => {
      res.forEach(e => this.punishList!.push({
        label: e.PayoffName!,
        value: e.Id!,
      }))
    })
    var employee = new GetShippersInputDto();
    employee.FullName =  '';
    employee.Email =  '';
    employee.Tel =  '';
    employee.Cmnd =  '';
    employee.Code =  '';
    employee.RegisterNo =  '';
    employee.AreaId =  0;
    employee.Type = '';

    console.log(employee)

    // this._userService.getEmployees(employee).subscribe(res => {
    //   res.forEach(e => this.userList!.push({
    //     label: e.FullName!,
    //     value: e.Id!,
    //   }))
    // })
  }

  onSearch() {
    this.callBackEvent(this.params);
    this.callBackUserPayoffEvent(this.params)
  }

  callBackEvent(event) {
    this.params = event;

    this._payoffService.getPayoff(this.payoff).subscribe((res) => {
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

    this._payoffService.getPayoff(this.payoff).subscribe((res) => {
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

  callBackUserPayoffEvent(event) {
    this.params = event;

    this._payoffService.getUserPayoff(this.payoff).subscribe((res) => {
      this.userPayoffRowData = res;
      if(this.currentUser.RoleId == 2){
        this.userPayoffRowData  = res.filter(e => e.UserId == this.currentUser.Id);
      }
      this.pagedRowDataUser =
        this.userPayoffRowData.length > 0
          ? this.userPayoffRowData.slice(
            (this.userPayoffPaginationParams.pageNum - 1) *
            this.userPayoffPaginationParams.pageSize,
            this.userPayoffPaginationParams.pageNum * this.userPayoffPaginationParams.pageSize
          )
          : [];
      this.userPayoffPaginationParams.totalCount = this.userPayoffRowData.length;
      this.userPayoffPaginationParams.totalPage = ceil(
        this.userPayoffRowData.length / this.userPayoffPaginationParams.pageSize
      );
      this.userPayoffPaginationParams.pageNum = 1;
    });
  }

  changeUserPayoffPaginationParams(paginationParams: PaginationParamsModel) {
    this.userPayoffPaginationParams = paginationParams;
    this.userPayoffPaginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.userPayoffPaginationParams.pageSize = paginationParams.pageSize;

    this._payoffService.getUserPayoff(this.payoff).subscribe((res) => {
      this.userPayoffRowData = res;
      if(this.currentUser.RoleId == 2){
        this.userPayoffRowData  = res.filter(e => e.UserId == this.currentUser.Id);
      }
      this.pagedRowDataUser = this.userPayoffRowData
        ? this.userPayoffRowData.slice(
          this.userPayoffPaginationParams.skipCount,
          this.userPayoffPaginationParams.pageNum * this.userPayoffPaginationParams.pageSize
        )
        : [];
    });
    this.params.api?.setRowData(this.pagedRowDataUser);
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }

  onChangeUserPayoffSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }

  getVehicleCard() {
    this.callBackEvent(this.params);
  }

  add() {
    this.selectedData = new PayoffDto();
    if (!this.isPayoff)
      this.createOrEditPayoff.show(this.selectedData);
    else
      this.createOrEditUserPayoff.show(this.selectedData);

  }

  edit() {
    if (!this.isPayoff)
      this.createOrEditPayoff.show(this.selectedData);
    else
      this.createOrEditUserPayoff.show(this.selectedData);
  }
  setValue(params, isPayoff? : any){
    if (isPayoff){
      this.isPayoff = true;
    }
    else {
      this.isPayoff = false;
    }
    this.payoff.Type = params;
    this.selectedData = undefined;
    this.onSearch();
  }

  delete() {
    this.payoff.Id = this.selectedData.Id;
    this._payoffService
      .deletePayoff(this.payoff)
      .subscribe(
        (res) => {
          alertify.success('Xóa thành công');
          this.callBackEvent(this.params);
          this.getCacheData();
        },
        (err) => console.log(err)
      );
  }
  deleteUserPayoff() {
    this.payoff.Id = this.selectedData.Id;
    this._payoffService
      .deleteUserPayoff(this.payoff)
      .subscribe(
        (res) => {
          alertify.success('Xóa thành công');
          this.callBackUserPayoffEvent(this.params);
          this.getCacheData();
        },
        (err) => console.log(err)
      );
  }

  modalSave(event) {
    console.log(event);
    event.Type = this.payoff.Type;
    this._payoffService.registerPayoff(event).subscribe(res => { }, err => console.log(err), () => this.callBackEvent(this.params));
    alertify.success('Thêm mới thành công');
    this.callBackEvent(this.params);
    this.getCacheData();
    this.selectedData = undefined;
  }
  modalPayoffSave(event){
    console.log(event);
    event.Type = this.payoff.Type;
    this._payoffService.registerUserPayoff(event).subscribe(res => { }, err => console.log(err), () => this.callBackUserPayoffEvent(this.params));
    alertify.success('Thêm mới thành công');
    this.callBackUserPayoffEvent(this.params);
    this.getCacheData();
    this.selectedData = undefined;
  }
}
