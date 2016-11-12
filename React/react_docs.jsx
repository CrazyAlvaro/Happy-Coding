class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }

  tick = () => {
    this.setState({
      date: new Date()
    })
  }

  // Runs after the component output has been rendered to the DOM
  componentDidMount() {
    /* feel free to add other fields except this.state, this.props */
    this.timeID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timeID)
  }

  render() {
    return (
      <div>
          <h1>Hello, world</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
