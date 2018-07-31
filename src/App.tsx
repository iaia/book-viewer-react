import * as React from 'react';
import './App.css';
import { Book } from './Book'

interface IState {
  book: Book | null
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      book: null
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
    return (
      <div />
    )
  }
  private getPages() {
    fetch("http://localhost:3100/books/3499.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            book: new Book(result.data)
          })
        }
      )
  }
}

export default App;
