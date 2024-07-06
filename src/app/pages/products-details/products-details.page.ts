import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
})
export class ProductsDetailsPage implements OnInit {
  product: any | null = null;
  imageBaseUrl: string = environment.images;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadProductDetails();
  }

  loadProductDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductDetails(id).subscribe(
        (res) => {
          this.product = res;
        },
        (err) => {
          console.error('Error loading product details:', err);
        }
      );
    } else {
      console.error('Product ID not found in route parameters.');
    }
  }

  openHomepage(url: string) {
    window.open(url, '_blank');
  }
}
