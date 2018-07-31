import { Page } from './Page'

export class Book {
  public pages: Page[]
  constructor(urls: string[]) {
    this.pages = []
    urls.forEach((url, index) => {
      this.pages.push(new Page(index, url, false))
    })
    this.pages[0].visible = true
    this.pages[1].visible = true
  }
}
