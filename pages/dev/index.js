/* globals issuemd fetch */
import React from 'react'
import Head from 'next/head'
import { Well } from '../../components'

export default class Main extends React.Component {

  componentDidMount () {
    console.log(issuemd({title: 'cooler beans'}).md())
    fetch('/issues').then(r => r.text()).then(txt => console.log(txt))
  }

  render () {
    return (
      <div>
        <Head>
          <title>issue.md website</title>
          <script src='/issuemd.js' />
        </Head>
        <span>
          <Well>Cool</Well>
          Lorem ipsum Dolor aliqua adipisicing exercitation commodo aliquip magna fugiat Ut Excepteur.
        </span>
      </div>
    )
  }
}
