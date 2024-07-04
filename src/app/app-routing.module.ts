import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestrauntListComponent } from './module/restraunt-list/restraunt-list.component';

const routes: Routes = [
  { path: 'restraunt', component: RestrauntListComponent },
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
