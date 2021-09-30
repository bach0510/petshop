import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { UserService } from 'src/app/_services/user.service';
import { ceil } from 'lodash';
import * as moment from 'moment';
import { GetShippersInputDto } from 'src/app/_models/get-shippers-input-dto';
import { CustomerService } from 'src/app/_services/customer.service';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { Customer } from 'src/app/_models/customer';
import { CacheService } from 'src/app/_services/cache.service';
import { CreateOrEditOrderComponent } from './create-or-edit-order/create-or-edit-order.component';
import { OrderService } from 'src/app/_services/order.service';
import { GetOrderInputDto } from 'src/app/_models/get-order-input-dto';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Employee } from 'src/app/_models/employee';
import { GetOrderByUserIdDto } from 'src/app/_models/GetOrderByUserIdDto';
import { DataFormatService } from 'src/app/_services/data-format.service';
import { finalize } from 'rxjs/operators';
declare let alertify: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @ViewChild('createOrEditOrder', { static: true }) createOrEditOrder: CreateOrEditOrderComponent;
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;
  selectedData;
  orderCode: string;
  orderName: string;
  status: string = "";
  statusList = [
    {label:"Tất cả",value:""},
    {label:"Mới tạo",value:"Mới tạo"},
    {label:"Đang giao",value:"Đang giao"},
    {label:"Thành công",value:"Thành công"},
    {label:"Không thành công",value:"Không thành công"},
  ];
  cusCmnd: string;
  areaList: any[]=[];
  areaId : number = 0;
  currentUser: Employee;

  constructor(private _orderService: OrderService,private _cacheService: CacheService,private authenticationService: AuthenticationService,private formatService: DataFormatService) {
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
        headerName: 'Mã vận đơn',
        field: 'OrderCode',
      },
      {
        headerName: 'Tên đơn hàng',
        field: 'OrderName',
      },
      {
        headerName: 'Cân nặng',
        field: 'Weight',
      },
      {
        headerName: 'Giá',
        field: 'Price',
      },
      // {
      //   headerName: 'Shipper giao',
      //   field: 'UserId',
      // },
      {
        headerName: 'Địa chỉ giao',
        field: 'DeliveryAdd',
      },
      {
        headerName: 'Ngày tạo',
        field: 'CreateDate',
        valueFormatter: params => params.data.CreateDate ? this.formatService.dateFormat(params.data.CreateDate) : "",
      },
      {
        headerName: 'Ngày KH nhận',
        field: 'ReceiveDate',
        valueFormatter: params => params.data.ReceiveDate ? this.formatService.dateFormat(params.data.ReceiveDate) : "",
      },
      {
        headerName: 'Trạng thái',
        field: 'Status',
      },
      {
        headerName: 'Lý do không thành công',
        field: 'ErrStatus',
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
    // this.authenticationService.currentUser.subscribe(
    //   (x) => (this.currentUser = x)
    // );
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
    if (this.currentUser.RoleId == 1){
      this.callBackEvent(this.params);
    }
    else {
      this.callBackEventForShip(this.params);
    }
  }

  callBackEvent(event) {
    this.params = event;
    var order = new GetOrderInputDto();
    order.OrderCode = this.orderCode ?? '';
    order.OrderName = this.orderName ?? '';
    order.Status = this.status ?? '';

    this._orderService.getOrders(order).subscribe((res) => {
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

  callBackEventForShip(event) {
    this.params = event;
    var order = new GetOrderInputDto();
    order.OrderCode = this.orderCode ?? '';
    order.OrderName = this.orderName ?? '';
    order.Status = this.status ?? '';

    let input = new GetOrderByUserIdDto
    input.UserId = this.currentUser.Id;

    this._orderService.getOrdersByUserId(input).subscribe((res) => {
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

    this.rowData = this.rowData.filter(e => e.OrderCode.include(this.orderCode) && e.OrderName.include(this.orderName) && e.Status == this.status)

  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;
    var order = new GetOrderInputDto();
    order.OrderCode = this.orderCode ?? '';
    order.OrderName = this.orderName ?? '';
    order.Status = this.status ?? '';


    this._orderService.getOrders(order).subscribe((res) => {
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
    this.createOrEditOrder.show(this.selectedData);
  }

  edit() {
    this.createOrEditOrder.show(this.selectedData);
  }

  delete() {
    this._orderService
      .deleteOrder(this.selectedData)
      .subscribe(
        (res) => {
          alertify.success('Xóa đơn hàng thành công');
          this.callBackEvent(this.params);
        },
        (err) => console.log(err)
      );
  }

  modalSave(event) {
    console.log(event);
    event.CreateDate = moment();
    if (event.ReceiveDate && event.ReceiveDate != ""){
      event.Status = "Thành công";
    }
    if (event.Status == "Thành công" && this.currentUser.RoleId == 2 && !event.ReceiveDate){
      event.ReceiveDate = moment();
    }
    if (event.Id) {
      console.log(event)
      this._orderService.updateOrder(event).subscribe(res => {
      }, er => console.log(er), () => {
        if (this.currentUser.RoleId == 2) {this.callBackEventForShip(this.params)}
      else{
        this.callBackEvent(this.params);
      }
      });
      alertify.success('Cập nhật đơn hàng thành công');
      

      this.selectedData = undefined;
    } else {
      this._orderService.registerOrder(event)
      .pipe(finalize(()=>{
        var order = new GetOrderInputDto();
        order.OrderCode = event.OrderCode;
        order.OrderName = this.orderName ?? '';
        order.Status = this.status ?? '';
    
    
        this._orderService.getOrders(order).subscribe((r) => {
          let id = r[0].Id
          var list = r[0].OrderCode.split('.');
          r[0]!.OrderCode = list[0] +"." +list[1] +"."+id +"."+list[2];
          //r[0]!.OrderCode = r[0]!.OrderCode + "." + id;
          const data = Object.assign({},r[0])
          this._orderService.updateOrder(data).subscribe(data => {
          }, er => console.log(er), () => {
            if (this.currentUser.RoleId == 2) {this.callBackEventForShip(this.params)}
          else{
            this.callBackEvent(this.params);
          }
          });
        });
        
      }))
      .subscribe(res => { }, err => console.log(err), () => this.callBackEvent(this.params));
      alertify.success('Thêm mới đơn hàng thành công');
      this.callBackEvent(this.params);
      this.selectedData = undefined;
    }
  }

  exportExcel(){
    this.params.api.exportDataAsCsv();
  }
}
