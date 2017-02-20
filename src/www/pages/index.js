/* globals issuemd fetch */
import React from 'react'
import Head from 'next/head'

export default class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      server: null,
      issuemd: null
    }
  }

  componentDidMount () {
    fetch('/config').then(r => r.json()).then(config => this.setState({
      server: config.version,
      issuemd: issuemd.version
    }))
  }

  render () {
    let state = this.state
    return (
      <div>
        <Head>
          <title>issue.md website</title>
          <script src='/issuemd.min.js' />
        </Head>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 text-center padding-top-large'>
              <a href='https://github.com/issuemd/issue.md'>
                <div><img src='/static/img/issuemd-logo.png' alt='issue.md logo' /></div>
                <div>fork me on github...</div>
              </a>
              <small>{state.server && `server: ${state.server}, issuemd: ${state.issuemd}`}</small>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
