import * as React from 'react';
import './App.css';
import { Book } from './Book'

interface IState {
  book: Book | null
  visiblePages: number[]
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      book: null,
      visiblePages: [0, 1]
    }
  }
  public render() {
    if (this.state.book == null) { return("") }
    const pageHtml = this.state.book.pages.map((page, index) =>
        <img key={page.index} src={page.url} className={["Page", page.visible ? "Visible" : "Invisible"].join(' ')} />
    );
    return (
      <div className="Book">
        {pageHtml}
      </div>
    );
  }
  public componentDidMount() {
    this.getPages()
    document.addEventListener("keydown", (event) => {
      this.onKey(event)
    })
  }
  private onKey(e: Event) {
    if (this.state.book == null) { return }
    const result = this.nextPage()
    this.setState({
      book: result.newBook,
      visiblePages: result.newVisilbePages
    })
  }
  private nextPage() {
    let newBook = this.state.book!
    let newVisilbePages = this.state.visiblePages
    if (newVisilbePages[1] + 1 >= newBook.pages.length) {
      const result = this.goToFirst(newBook, newVisilbePages)
      newBook = result.newBook
      newVisilbePages = result.newVisilbePages
    } else {
      newBook.pages[newVisilbePages[0]].visible = false
      newBook.pages[newVisilbePages[1] + 1].visible = true
      newVisilbePages = [newVisilbePages[0] + 1, newVisilbePages[1] + 1]
    }
    return { newBook, newVisilbePages }
  }

  private goToFirst(newBook: Book, newVisilbePages: number[]) {
      newBook.pages[newVisilbePages[0]].visible = false
      newBook.pages[newVisilbePages[1]].visible = false
      newBook.pages[0].visible = true
      newBook.pages[1].visible = true
      newVisilbePages = [0, 1]
      return { newBook, newVisilbePages }
  }

  private getPages() {
    fetch("http://localhost:3100/books/3499.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            book: new Book(result.data),
            visiblePages: [0, 1]
          })
        }
      )
  }
}

export default App;
