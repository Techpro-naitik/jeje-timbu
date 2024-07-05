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
  products: any | null = null;
  imageBaseUrl = environment.images;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.getProductDetails(id).subscribe((res) => {
      this.products = res;
    });
  }
 
  openHomepage(URL: string) {
    window.open(url, '_blank');
  }
}
