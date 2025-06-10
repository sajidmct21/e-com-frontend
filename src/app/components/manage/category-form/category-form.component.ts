import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  name: string = '';
  private catService = inject(CategoryService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  edit: string | null = null;
  catId: string | null = null;

  addorupdate: string = 'Add';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.catId = params.get('id');
      // console.log(this.catId);
      if (this.catId) {
        this.addorupdate = 'Update';
        this.catService.httpGetCategoryById(this.catId).subscribe({
          next: (res) => {
            // console.log(res.data.categoryName);
            this.name = res.data.categoryName;
          },
        });
      }
    });
  }

  onCreateCategory() {
    if (!this.catId) {
      let dataModel: Category = {
        categoryName: this.name,
      };
      this.catService.httpCreateCategory(dataModel).subscribe({
        next: () => {
          alert('Category is added');
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      let dataModel: Category = {
        categoryName: this.name,
      };
      this.catService.httpUpdateCategory(this.catId,dataModel).subscribe({
        next: () => {
          // debugger;
          alert('Category is updated');
          this.router.navigateByUrl('/admin/categories');
        },
        error: (err) => {
          console.log('Error Occured');
        },
      });
    }
  }
}
