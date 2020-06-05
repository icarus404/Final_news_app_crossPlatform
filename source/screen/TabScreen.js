import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Tab,
  Tabs,
  Icon,
  Button,
} from 'native-base';
import Tab1 from './tabs/tab1';
import Tab2 from './tabs/tab2';
import Tab3 from './tabs/tab3';
export default class TabsExample extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{textAlign: 'center', alignSelf: 'center'}}>
              Lite News
            </Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading="General">
            <Tab1 />
          </Tab>
          <Tab heading="Sports">
            <Tab2 />
          </Tab>
          <Tab heading="Tech">
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
