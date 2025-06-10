import { Component, inject, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['_id', 'categoryName', 'actions'];
  dataSource: MatTableDataSource<any>;
  catList:[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private catService = inject(CategoryService)

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(): void {
    this.onGetAllCategories()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log('Sort assigned:', this.sort);
    this.dataSource.sort = this.sort;
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onGetAllCategories(){
    this.catService.httpGetAllCategories().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.dataSource.data = res.data;
      },
      error:(err)=>{}
    })
  }

  onUpdateCategory(id:string){
    
  }

  onDeleteCategory(id:string){
    console.log(id);
  }
}
