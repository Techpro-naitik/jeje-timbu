import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ProductsService } from './../services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage implements OnInit{
products = [];
currentPage =1;
imageBaseUrl = environment.images;

  constructor(
    private productsService: ProductsService,
    private loadingCtrl: LoadingController
  ) {}
  ngOnInit() {
    this.loadProducts();
  }
 
  async loadProducts(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
 
    this.productsService. getProductImages(this.currentPage).subscribe(
      (res) => {
        loading.dismiss();
        this.products.push(...res.results);
 
        event?.target.complete();
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
 
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadProducts(event);
  }
}
