import { OrderComponent } from './pages/order/order.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeComponent } from './pages/employee/employee/employee.component';

import { HomeComponent } from './_components/home/home.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AssignComponent } from './pages/assign/assign.component';
import { LogInfoComponent } from './pages/log-info/log-info.component';
import { PayoffComponent } from './pages/payoff/payoff.component';
import { SalaryComponent } from './pages/salary/salary.component';

const appRoutes: Routes = [
  { path: 'assign', component: AssignComponent, canActivate: [AuthGuard] ,data: { state: 'assign' } },
  { path: 'log-info', component: LogInfoComponent, canActivate: [AuthGuard] ,data: { state: 'log-info' } },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] ,data: { state: 'employee' } },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] ,data: { state: 'customer' } },
  {
    path: 'order',
    canActivate: [AuthGuard],
    component: OrderComponent,
    data: { state: 'order' }
  },
  { path: 'payoff', component: PayoffComponent, canActivate: [AuthGuard] ,data: { state: 'payoff' } },
  { path: 'salary', component: SalaryComponent, canActivate: [AuthGuard] ,data: { state: 'salary' } },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
