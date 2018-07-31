export class Page {
  public index: number
  public url: string
  public visible: boolean
  constructor(index: number, url: string, visible: boolean) {
    this.index = index
    this.url = url
    this.visible = visible
  }
}