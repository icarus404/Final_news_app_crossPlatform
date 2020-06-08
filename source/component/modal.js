//importing libraries
import React, {Component} from 'react';
import {Modal, Share} from 'react-native';
import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Icon,
  Right,
  Title,
  Button,
} from 'native-base';
import {WebView} from 'react-native-webview';
//import Share from 'react-native-share';  

// creating a new component
class ModalComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    return this.props.onClose(); //calling onClose function from tab1
  };

  handleShare = () => {
    const {url, title} = this.props.articleData;
    const message = `${title}\n\nRead More @${url}\n\nShared via Lite News App`;
    return Share.share(
      {title, message, url: message},
      {dialogTitle: `Share ${title}`},
    );
  };

  render() {
    const {showModal, articleData} = this.props;
    const {url} = articleData; //get url field from our news article json file
    if (url !== undefined) {
      //if url present then only show modal
      return (
        <Modal //creating modal ->container,left,right,header
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={this.handleClose}>
          <Container
            style={{margin: 15, marginBottom: 0, backgroundColor: '#fff'}}>
            <Header style={{backgroundColor: '#233B9C'}}>
              <Left>
                <Button onPress={this.handleClose} transparent>
                  <Icon name="close" style={{color: 'white', fontSize: 12}} />
                </Button>
              </Left>
              <Body>
                <Title children={articleData.title} style={{color: 'white'}} />
              </Body>
              <Right>
                <Button onPress={this.handleShare} transparent>
                  <Icon name="share" style={{color: 'white', fontSize: 12}} />
                </Button>
              </Right>
            </Header>
            <Content contentContainerStyle={{flex: 1}}>
              <WebView
                source={{uri: url}} //this url from article data
                onError={this.handleClose}
                startInLoadingState
                scalesPageToFit //scales the modal properly within viewport
                //scalesPageToFit={true}
                scrollEnabled={true}
              />
            </Content>
          </Container>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

//make this component available to the app
export default ModalComponent;
