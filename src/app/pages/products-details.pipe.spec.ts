import { ProductsDetailsPipe } from './products-details.pipe';

describe('ProductsDetailsPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductsDetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
