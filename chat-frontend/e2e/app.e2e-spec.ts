import { ChatFrontendPage } from './app.po';

describe('chat-frontend App', () => {
  let page: ChatFrontendPage;

  beforeEach(() => {
    page = new ChatFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
