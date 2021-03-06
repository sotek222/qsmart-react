import React from 'react'
import {Card, Image, Icon} from 'semantic-ui-react'
import { Redirect } from 'react-router'
import LineJoinedWebSocket from './LineJoinedWebSocket'

class LineJoined extends  React.Component{
  constructor(props) {
    super(props)

    this.state = {
     clicked: false,
     listId: '',
     userCount: this.props.line.userCount,
     userPlace: this.props.line.userPlace
    }
  }

  updateLineJoined = (newData) => {
    console.log(newData)
    console.log(newData.users)
    console.log(newData.users.length)
    const userId = this.props.userId
    const newUserIndex = newData.users.findIndex( (user) => { return user.id === userId })
    const newUserPlace = newUserIndex + 1
    this.setState({
      userCount: newData.users.length,
      userPlace: newUserPlace
    })
  }

  onCardClick = (event) => {
    const listId = event.currentTarget.name
    this.setState({
      clicked: true,
      listId: listId
    })
  }

  render(){
    const time = new Date(this.props.line.created_at)
    const newTime = time.toTimeString()
    return(
      <Card onClick={this.onCardClick} name={`${this.props.line.id}`} color={this.props.line.active ? 'green' : 'red'}>
        <LineJoinedWebSocket data-cableApp={this.props['data-cableApp']} data-updateLineJoined={this.updateLineJoined} data-line={this.props.line} />
        <Image size="small" centered src={this.props.line.image_url} />
        <Card.Content>
          <Card.Header>
            {this.props.line.name}
          </Card.Header>
          <Card.Meta>
            Code: {this.props.line.code}
          </Card.Meta>
          <Card.Description>
            <span className='date'>
              Joined @ {newTime}
            </span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='users' />
            { this.props.isCreated ? `Total in Line: ${this.state.userCount}` : `Position: ${this.state.userPlace}/${this.state.userCount}` }
          </a>
        </Card.Content>
        {this.state.clicked ? <Redirect to={`/lines/${this.state.listId}`}/> : null}
      </Card>
    )
  }
}

export default LineJoined
