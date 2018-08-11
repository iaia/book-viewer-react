import * as React from 'react';
import { Page } from './Page'

interface IPageProps {
    page: Page,
    onClickFunc: (index: number) => undefined
}

class PageComponent extends React.Component<IPageProps, any> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        return (
            <img src={this.props.page.url}
                className={["Page", this.props.page.visible ? "Visible" : "Invisible"].join(' ')}
                style={{order: this.props.page.order}}
                onClick={this.props.onClickFunc.bind(this, this.props.page.index)}
            />
        )
    }
}

export default PageComponent
