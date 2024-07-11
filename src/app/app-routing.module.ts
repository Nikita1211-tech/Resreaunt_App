import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'restraunt', pathMatch: 'full' },
  {
    path:'restraunt',
    loadChildren: () => import('./module/module.module').then(m=> m.ModuleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
