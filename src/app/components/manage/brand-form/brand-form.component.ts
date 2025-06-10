import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../../interfaces/brand.interface';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent implements OnInit {
  name: string = '';
  private brandService = inject(BrandService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  edit: string | null = null;
  brandId: string | null = null;

  addorupdate: string = 'Add';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.brandId = params.get('id');
      console.log(this.brandId);
      if (this.brandId) {
        this.addorupdate = 'Update';
        this.brandService.httpGetBrandById(this.brandId).subscribe({
          next: (res) => {
            console.log(res.data.brandName);
            this.name = res.data.brandName;
          },
        });
      }
    });
  }

  onCreateBrand() {
    if (!this.brandId) {
      let dataModel: Brand = {
        brandName: this.name,
      };
      this.brandService.httpCreateBrand(dataModel).subscribe({
        next: () => {
          alert('Brand is added');
          this.router.navigateByUrl('/admin/brands');
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      let dataModel: Brand = {
        brandName: this.name,
      };
      this.brandService.httpUpdateBrand(this.brandId,dataModel).subscribe({
        next: () => {
          // debugger;
          alert('Brand is updated');
          this.router.navigateByUrl('/admin/brands');
        },
        error: (err) => {
          console.log('Error Occured');
        },
      });
    }
  }
}
