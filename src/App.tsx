import * as React from 'react';
import './App.css';
import { Book } from './Book'
import PageComponent from './PageComponent';

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
    if (this.state.book == null) { return ("") }
    const pages = this.state.book.pages.filter(
      element => element.visible).map((page, index) =>
        <PageComponent key={index} page={page} />
      )
    return (
      <div className="Book">
        {pages}
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
    this.movePage()
  }
  private movePage() {
    this.goToNext()
  }

  private goToNext() {
    const newVisibles = []
    const oldVisibles = this.state.visiblePages
    if (this.state.visiblePages[0] + 1 >= this.state.book!.pages.length) {
      newVisibles.push(0)
    } else {
      newVisibles.push(this.state.visiblePages[0] + 1)
    }
    if (this.state.visiblePages[1] + 1 >= this.state.book!.pages.length) {
      newVisibles.push(0)
    } else {
      newVisibles.push(this.state.visiblePages[1] + 1)
    }

    this.state.book!.pages[oldVisibles[0]].visible = false
    this.state.book!.pages[oldVisibles[1]].visible = false
    this.state.book!.pages[newVisibles[0]].visible = true
    this.state.book!.pages[newVisibles[1]].visible = true
    this.state.book!.pages[newVisibles[0]].index = 1
    this.state.book!.pages[newVisibles[1]].index = 2
    this.setState({
      book: this.state.book,
      visiblePages: newVisibles
    })
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
