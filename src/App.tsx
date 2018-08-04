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
  private onKey(e: KeyboardEvent) {
    if (this.state.book == null) { return }
    const key = (e.shiftKey ? "S" : "") + e.key
    switch(key) {
      case " ":
        this.goToNext()
        break
      case "S ":
        this.goToPrevious()
        break
      default:
        break
    }
  }

  private goToPrevious() {
    const newVisibles = []
    const oldVisibles = this.state.visiblePages
    if (this.state.visiblePages[0] - 1 < 0) {
      newVisibles.push(this.state.book!.pages.length - 1)
    } else {
      newVisibles.push(this.state.visiblePages[0] - 1)
    }
    if (this.state.visiblePages[1] - 1 < 0) {
      newVisibles.push(this.state.book!.pages.length - 1)
    } else {
      newVisibles.push(this.state.visiblePages[1] - 1)
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
    const url = location.search.substring(1).split('&')[0].split("=")[1]
    fetch(url)
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
