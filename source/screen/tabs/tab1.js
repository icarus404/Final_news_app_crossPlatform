import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {getArticles} from '../../fetch/news';
import DataItem from '../../component/dataItem';
import {Alert, View, ActivityIndicator} from 'react-native'; //to show loader animation while loading
export default class ListThumbnailExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null, //first setting data to null on loading
      setModalVisible: false,
      modalArticleData: {},
    };
  }

  componentDidMount() {
    //fetching news data here
    getArticles().then(
      data => {
        this.setState({
          isLoading: false,
          data: data, //passing fetched data to data
        });
      },
      error => {
        Alert.alert('Error', 'Something went wrong!');
      },
    );
  }

  render() {
    console.log(this.state.data); //log check, data responding
    //check if state is loading, if loading display loading animation
    let view = this.state.isLoading ? (
      <View>
        <ActivityIndicator animating={this.state.isLoading} />
        <Text style={{marginTop: 10}}>"Please Wait.." </Text>
      </View>
    ) : (
      <List
        dataArray={this.state.data} //nativebase data array property, and render row property
        renderRow={item => {
          //for each item it returns data item
          return <DataItem data={item} />;
        }}
        keyExtractor={(_item, index) => index.toString()} //key extractor,for each item
      />
    );

    return (
      <Container>
        <Content>{view}</Content>
      </Container>
    );
  }
}
