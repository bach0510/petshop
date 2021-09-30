import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { UserService } from 'src/app/_services/user.service';
import { ceil } from 'lodash';
import { CreateOrEditEmployeeComponent } from './create-or-edit-employee/create-or-edit-employee.component';
import * as moment from 'moment';
import { GetShippersInputDto } from 'src/app/_models/get-shippers-input-dto';
import { CacheService } from 'src/app/_services/cache.service';
import { GetNhanVienInput } from 'src/app/_models/get-nhanvien-input';
declare let alertify: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild('createOrEditEmployee', { static: true }) createOrEditEmployee: CreateOrEditEmployeeComponent;
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;
  selectedData;
  fullName: string;
  email: string;
  tel: string;
  code: string;
  registerNo  : string;
  cmnd: string;
  searchType= [
    {value:1,label:"mã nhân viên"},
    {value:2,label:"họ tên"},
    {value:3,label:"chứng minh thư"},
  ];
  type : number = 1;
  filter = "";

  constructor(private _employeeService: UserService,private _cacheService: CacheService) {
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
        headerName: 'Mã nhân vien',
        field: 'MaNv',
      },
      {
        headerName: 'Tên nhân viên',
        field: 'HoTen',
      },
      {
        headerName: 'Số điện thoại',
        field: 'Sdt',
      },
      {
        headerName: 'Số chứng minh thư',
        field: 'Cmnd',
      },
      {
        headerName: 'Chức vụ',
        field: 'ChucVu',
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
  }


  onSearch() {
    this.callBackEvent(this.params);
  }

  callBackEvent(event) {
    this.params = event;
    var employee = new GetNhanVienInput();
    employee.Value = this.type ?? 1;
    employee.Filter = this.filter ?? '';

    console.log(employee)

    this._employeeService.getEmployees(employee).subscribe((res) => {
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
    var employee = new GetNhanVienInput();
    employee.Value = this.type ?? 1;
    employee.Filter = this.filter ?? '';
    this._employeeService.getEmployees(employee).subscribe((res) => {
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
    this.selectedData = undefined;
    this.createOrEditEmployee.show(this.selectedData);
  }

  edit() {
    this.createOrEditEmployee.show(this.selectedData);
  }

  delete() {
    
    this._employeeService
      .deleteEmployee(this.selectedData)
      .subscribe(
        (res) => {
          alertify.success('Xóa shipper thành công');
          this.callBackEvent(this.params);
        },
        (err) => console.log(err)
      );
  }

  base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}
  modalSave(event) {
    console.log(event);
    
    if (event.MaNv) {
      this._employeeService.updateEmployee(event).subscribe(res => {
      }, er => console.log(er), () => {
        this.callBackEvent(this.params);
      });
      alertify.success('Cập nhật thành công');
      this.callBackEvent(this.params);
      this.selectedData = undefined;
    } else {
      this._employeeService.registerEmployee(event).subscribe(res => { }, err => console.log(err), () => this.callBackEvent(this.params));
      alertify.success('Thêm mới thành công');
      this.callBackEvent(this.params);
      this.selectedData = undefined;
    }
  }
  exportExcel(){
    this.params.api.exportDataAsCsv();
  }
}
