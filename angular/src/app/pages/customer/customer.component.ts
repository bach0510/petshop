import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ceil } from 'lodash';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';
import { CustomerService } from 'src/app/_services/customer.service';
import { Customer } from 'src/app/_models/customer';
import { GetKhachHangInput } from 'src/app/_models/GetKhachHangInput';
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
  MAKH: string;
  HoTen: string;
  gioiTinh: string;
  diaChi: string;
  ngaySinh: Date;
  CMND: string;
  sdt: string;

  searchType= [
    {value:1,label:"lấy danh sách khách hàng theo mã"},
    {value:2,label:"lấy danh sách khách hàng theo tên "},
    {value:3,label:"lấy danh sách khách hàng theo số điện thoại"},
    {value:4,label:"lấy hết danh sách khách hàng"},
  ];
  type : number = 1;
  filter = "";

  constructor(private _customerService: CustomerService) {
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
        headerName: 'Tên khách hàng',
        field: 'HoTen',
      },
      {
        headerName: 'giới tính',
        field: 'gioiTinh',
      },
      {
        headerName: 'địa chỉ',
        field: 'diaChi',
      },
      {
        headerName: 'ngày sinh',
        field: 'ngaySinh',
      },
      {
        headerName: 'số điện thoại',
        field: 'sdt',
      },
      {
        headerName: 'CMND',
        field: 'CMND',
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
    var cus = new GetKhachHangInput();
    cus.Value = this.type ?? 1;
    cus.Filter = this.filter ?? '';

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

    var cus = new GetKhachHangInput();
    cus.Value = this.type ?? 1;
    cus.Filter = this.filter ?? '';


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
    //this.selectedData = new Customer();
    this.createOrEditCustomer.show(new Customer());
  }

  edit() {
    this.createOrEditCustomer.show(this.selectedData);
  }

  delete() {
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
    this.callBackEvent(this.params);
    this.selectedData = undefined;

  }
  exportExcel(){
    this.params.api.exportDataAsCsv();
  }
}
