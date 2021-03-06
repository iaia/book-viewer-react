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
      visiblePages: [0, 1, 2, 3]
    }
  }

  public render() {
    if (this.state.book == null) { return "" }
    const pages = [this.state.book.pages[this.state.visiblePages[0]], this.state.book.pages[this.state.visiblePages[1]], this.state.book.pages[this.state.visiblePages[2]], this.state.book.pages[this.state.visiblePages[3]]].map((page, index) =>
      <PageComponent key={index} page={page} onClickFunc={this.onClickFunc} />
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

  private onClickFunc = (index: number) => {
    if(index === this.state.visiblePages[0]) {
      this.goToPrevious()
    } else {
      this.goToNext()
    }
    return undefined
  }

  private onKey(e: KeyboardEvent) {
    if (this.state.book == null) { return }
    const key = (e.shiftKey ? "S" : "") + e.key
    switch(key) {
      case " ":
      case "j":
      case "k":
      case "h":
      case "a":
      case "s":
      case "ArrowDown":
      case "ArrowLeft":
        this.goToNext()
        break
      case "S ":
      case "SJ":
      case "SK":
      case "l":
      case "w":
      case "d":
      case "ArrowUp":
      case "ArrowRight":
        this.goToPrevious()
        break
      default:
        return
    }
  }

  private changeVisibles(oldVisibles: number[], newVisibles: number[]) {
    oldVisibles.forEach((old) => {
      this.state.book!.pages[old].visible = false
    })
    newVisibles.forEach((newV, index) => {
      this.state.book!.pages[newV].visible = index === 1 || index === 2
      this.state.book!.pages[newV].order = index
    })
    this.setState({
      book: this.state.book,
      visiblePages: newVisibles
    })
  }

  private goToPrevious() {
    const newVisibles: number[] = []
    const oldVisibles = this.state.visiblePages
    this.state.visiblePages.forEach((item) => {
      if (item - 1 < 0) {
        newVisibles.push(this.state.book!.pages.length - 1)
      } else {
        newVisibles.push(item - 1)
      }
    })

    this.changeVisibles(oldVisibles, newVisibles)
  }

  private goToNext() {
    const newVisibles: number[] = []
    const oldVisibles = this.state.visiblePages
    this.state.visiblePages.forEach((item) => {
      if (item + 1 >= this.state.book!.pages.length) {
        newVisibles.push(0)
      } else {
        newVisibles.push(item + 1)
      }
    })
    this.changeVisibles(oldVisibles, newVisibles)
  }

  private getPages() {
    const url = location.pathname
    fetch(url + '.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            book: new Book(result.data),
            visiblePages: [result.data.length, 0, 1, 2]
          })
        }
      )
      .catch(error =>
        this.setState({
          book: new Book(["/assets/sample/sample_double.png", "/assets/sample/sample1.png", "/assets/sample/sample2.png", "/assets/sample/sample3.png", "/assets/sample/sample4.png"]),
          visiblePages: [4, 0, 1, 2]
        })
      )
  }
}

export default App;
