import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsDetails',
  standalone: true
})
export class ProductsDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
