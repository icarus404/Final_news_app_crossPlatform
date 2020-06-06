//importing libraries
import React, {Component} from 'react';
import {Dimensions, Modal, Share} from 'react-native';
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

const webViewHeight = Dimensions.get('window').height - 56;

// creating a new component
class ModalComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    return this.props.onClose(); //calling onClose function from tab1
  };

  handleShare = () => {
    //share button
    const {url, title} = this.props.articleData; //grab url and title from props and article data

    message = `${title}\n\nRead More @${url}\n\nShared via Lite News App`; //compose message
    return Share.share();
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
            <Header style={{backgroundColor: '#009387'}}>
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
            <Content contentContainerStyle={{height: webViewHeight}}>
              <WebView
                source={{uri: url}} //this url from article data
                style={{flex: 1}}
                onError={this.handleClose}
                startInLoadingState
                //scalesPageToFit //scales the modal properly within viewport
                scalesPageToFit={true}
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
