import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiResult, ProductsService } from './../services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  imageBaseUrl: string = environment.images;

  constructor(
    private productsService: ProductsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.productsService.getProductImages(this.currentPage).subscribe(
      (result: ApiResult) => {
        this.products = [...this.products, ...result.items];
        loading.dismiss();

        if (event) {
          event.target.complete();
          event.target.disabled = !result.next_page;
        }
      },
      (err) => {
        console.error('Error loading products:', err);
        loading.dismiss();

        if (event) {
          event.target.complete();
        }
      }
    );
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadProducts(event);
  }
}
