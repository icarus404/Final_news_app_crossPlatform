//importing libraries
import React, {Component} from 'react';
import {Text} from 'native-base';
import moment from 'moment';

// creating a component
class Time extends Component {
  constructor(props) {
    super(props);
    this.date = props.time;
  }

  render() {
    const time = moment(this.date || moment.now()).fromNow(); //if date is current date ,uses current time in props e
    return (
      <Text note style={{marginHorizontal: 10}}>
        {time}
      </Text>
    );
  }
}

//make this component available to the app
export default Time;
