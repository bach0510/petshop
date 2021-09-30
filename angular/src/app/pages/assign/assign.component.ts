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
import { OrderService } from 'src/app/_services/order.service';
import { GetOrderInputDto } from 'src/app/_models/get-order-input-dto';
import { GetOrderByUserIdDto } from 'src/app/_models/GetOrderByUserIdDto';
import { Order } from 'src/app/_models/order';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;
@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss'],
})
export class AssignComponent implements OnInit {
  // @ViewChild('createOrEditCustomer', { static: true }) createOrEditCustomer: CreateOrEditCustomerComponent;
  paginationParams: PaginationParamsModel;
  orders : any[] = [];
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
  unscOrders: any[] = [];
  testList:any[];

  orderCodeInput = '';
  shipName = '';

  dragedRegister: any;
  targetPDrag: string = '';
  setZIndex: boolean = true;

  shipperName : string;

  currentUser : Employee = new Employee;

  shippers: any[]=[];


  constructor(private _customerService: CustomerService,
    private _cacheService: CacheService,
    private _userService: UserService,
    private _orderService: OrderService,
    private authenticationService: AuthenticationService
    ) {
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

    // this.authenticationService.currentUser.subscribe(
    //   (x) => (this.currentUser = x)
    // );

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
    //this.getCacheData();
    this.getOrder();
    this.getShipper();
  }

  // getCacheData(){
  //   this.areaList = [];
  //   this._cacheService.getArea().subscribe(res => {
  //     this.areaList.push({label:"Tất cả",value:0});
  //     res.forEach(e => this.areaList!.push({
  //       label: e.AreaName!,
  //       value: e.Id!,
  //     }))
  //   })
  // }

  getOrder(){
    var order = new GetOrderInputDto();
    order.OrderCode = this.orderCodeInput ?? '';
    order.OrderName =  '';
    order.Status = '';

    this._orderService.getOrders(order).subscribe((res) => {
      this.orders = res.filter(e => (!e.UserId || e.UserId == 0 || e.UserId == 1) && e.Status == "Mới tạo");
      this.unscOrders = res.filter(e => e.Status == "Không thành công");
    });
  }

  getShipper(){
    var shipperInput = new GetShippersInputDto();
    shipperInput.FullName = this.shipName ?? '';
    shipperInput.Email =  '';
    shipperInput.Tel = '';
    shipperInput.Cmnd =  '';
    shipperInput.Code =  '';
    shipperInput.RegisterNo =  '';
    shipperInput.AreaId =  0;
    shipperInput.Type =  ''


    // this._userService.getEmployees(shipperInput).subscribe((res) => {
    //   this.shippers = res;
    //   console.log(res)

    //   this.shippers.forEach(e => {
    //     let input = new GetOrderByUserIdDto
    //     input.UserId = e.Id;
    //     this._orderService.getOrdersByUserId(input).subscribe((r) => {
    //       const orderList = r.filter(e => e.Status != "Không thành công" &&  e.Status != "Thành công");
    //       Object.assign(e, {OrderList: orderList});
    //     });
    //   })
    // });

    console.log(this.shippers)
  }

  //#region - Kéo thả từ danh sách đơn sang ship
  dragStart(item) {
    console.log(item)
    this.dragedRegister = item;
    this.targetPDrag = 'register';
    this.setZIndex = false;
  }

  dragEnd() {
      this.dragedRegister = null;
      this.setZIndex = true;
  }

  //#region - Kéo thả giữa các shipper
  dragStartAdvisor(item) {
    console.log(item)
    this.dragedRegister = item;
    this.targetPDrag = 'advisor';
    setTimeout(() => { this.setZIndex = false; });
  }

  dragEndAdvisor() {

      this.dragedRegister = null;
      this.setZIndex = true;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(event: any) {
  if (this.targetPDrag === 'advisor') { // sự kiện thả card đơn giữa các shipper
    var shipperItem = this.shippers.find(e => e.Id == parseInt(event.target?.id.toString()));

    this.shipperName = shipperItem.FullName;

      this.dragedRegister.UserId = parseInt(event.target?.id.toString());
      shipperItem!.OrderList.push(Object.assign(this.dragedRegister));
      this.dragedRegister.Status = "Đang giao";
      this.updateOrder();


  } else { // sự kiện thả card đơn hàng từ danh sách sang shipper

      var shipperItem = this.shippers.find(e => e.Id == parseInt(event.target?.id.toString()));

    this.shipperName = shipperItem.FullName;
    const index = this.orders.indexOf(this.dragedRegister);
      if (index > -1) {
        this.orders.splice(index, 1);
      }
    if (this.dragedRegister.Status == "Không thành công"){
      const index2 = this.unscOrders.indexOf(this.dragedRegister);
        this.unscOrders.splice(index2, 1);
    }

      this.dragedRegister.UserId = parseInt(event.target?.id.toString());
      this.dragedRegister.Status = "Đang giao";

      shipperItem!.OrderList.push(Object.assign(this.dragedRegister));
      this.updateOrder();

      
  }
  this.setZIndex = true;
  this.getOrder();
      this.getShipper();
  }

  updateOrder(){
    this._orderService.updateAssign(this.dragedRegister).subscribe(res => {
      alertify.success("Đơn " + this.dragedRegister.OrderCode + "đã được giao cho shipper " + this.shipperName );
    })
  }

}
