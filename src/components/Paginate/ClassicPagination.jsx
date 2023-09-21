import React from 'react';
import './ClassicPagination.scss'

export default class ClassicPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: (this.props.pageCount && 0),
      currPage: (this.props.currPage && 1),
      count: (this.props.count && 0),
    }
    // console.log(this.props)
  }

  render() {
    let {pageCount, currPage, count} = this.state
    pageCount = this.props.pageCount && pageCount
    currPage = this.props.currPage && currPage
    count = this.props.count && count
    this.setState({pageCount, currPage, count})

    let pages = []
    for (let i=1; i<=this.state.pageCount; i++) {
      pages.push(
        (i === this.state.currPage 
          ? <a className="active">{`[${i}]`}</a>
          : <a>{`[${i}]`}</a>
        )
      )
    }

    return (
      <span className="classic-pagination"> Page:
        {[...pages]}
        ({this.state.count} item(s).)
      </span>
    )
  }
}