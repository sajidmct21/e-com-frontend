import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandComponent } from './components/manage/brand/brand.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Category Routes
  { path: 'admin/categories', component: CategoriesComponent },
  { path: 'admin/categories/add', component: CategoryFormComponent },
  { path: 'admin/categories/edit/:id', component: CategoryFormComponent },

  // Brand Routes
  { path: 'admin/brands', component: BrandComponent },
  { path: 'admin/brands/add', component: BrandFormComponent },
  { path: 'admin/brands/edit/:id', component: BrandFormComponent },
];
