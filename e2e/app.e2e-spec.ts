import { SelfMgmtPage } from './app.po';

describe('self-mgmt App', function() {
  let page: SelfMgmtPage;

  beforeEach(() => {
    page = new SelfMgmtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
