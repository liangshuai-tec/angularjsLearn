import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { NewsComponent } from './components/news/news.component'
import { UserComponent } from './components/user/user.component'
import { CourseComponent } from './components/course/course.component'

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"news",
    component:NewsComponent
  },
  {
    path:"user",
    component:UserComponent
  },
  {
    path:"course",
    component:CourseComponent
  },
  {
    path:"",
    redirectTo: 'home',
    pathMatch:'full'
  },


];


// 在 forRoot 方法注册
// 抛出 RouterModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
