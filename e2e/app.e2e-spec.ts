import { AngNodePage } from './app.po';

describe('ang-node App', function() {
  let page: AngNodePage;

  beforeEach(() => {
    page = new AngNodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
