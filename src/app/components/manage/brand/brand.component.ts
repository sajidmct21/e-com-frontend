import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../services/category.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit, AfterViewInit{
displayedColumns: string[] = ['_id', 'brandName', 'actions'];
  dataSource: MatTableDataSource<any>;
  brandList:[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private brandService = inject(BrandService)

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(): void {
    this.onGetAllBrands()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // console.log('Sort assigned:', this.sort);
    this.dataSource.sort = this.sort;
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onGetAllBrands(){
    this.brandService.httpGetAllBrands().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.dataSource.data = res.data;
      },
      error:(err)=>{}
    })
  }

  onUpdateBrand(id:string){
    
  }

  onDeleteBrand(id:string){
    this.brandService.httpDeleteBrand(id).subscribe({
      next:()=>{
        alert(`Brand is deleted`)
        this.onGetAllBrands()
        
      },
      error:(err)=>{
        console.log(`${err}`);
      }
    })
  }
}
