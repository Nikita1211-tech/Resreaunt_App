import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeGuard } from './guard/route.guard';
import { LandingPageComponent } from './common/component/landing-page/landing-page.component';
import { canLoadGuard } from './guard/lazy-load.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
  {
    path: 'landingpage' , 
    component: LandingPageComponent
  },
  {
    path:'restraunt',
    loadChildren: () => import('./module/module.module').then(m=> m.ModuleModule),
    canActivate: [routeGuard],
    canLoad: [canLoadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
