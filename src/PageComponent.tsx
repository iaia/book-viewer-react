import * as React from 'react';
import { Page } from './Page'

interface IPageProps {
    page: Page
}

class PageComponent extends React.Component<IPageProps, any> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        return (
            <img src={this.props.page.url}
                className={["Page", "Visible"].join(' ')}
                style={{order: this.props.page.index}}
            />
        )
    }
}

export default PageComponent
