import * as React from 'react';
import './App.css';

interface IState {
  pages: string[]
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pages: [""]
    }
  }
  public render() {
    const pageHtml = this.state.pages.map((page, index) =>
        <img key={page} src={page} className="Page Visible" />
    );
    return (
      <div className="Book">
        {pageHtml}
      </div>
    );
  }
  public componentDidMount() {
    this.getPages()
  }
  private getPages() {
    fetch("http://localhost:3100/books/3499.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pages: result.data
          })
        }
      )
  }
}

export default App;
