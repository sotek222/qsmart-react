import React from 'react';
import Line from "./Line"
import {APIURL} from "./PageAssets"

import { Container } from 'semantic-ui-react'

class LineShowPage extends React.Component {
  constructor() {
    super()
  }

  componentDidMount(){
    // NOTE: will we ever need this? should we need this?
  }

  render(){
    return (
      <Container textAlign="center" className="Site">
      <Line data={this.props.lineData} />
      </Container>
    )
  }
}
export default LineShowPage;