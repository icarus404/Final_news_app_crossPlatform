import React, {Component} from 'react';
import {Container, Content, List, Text} from 'native-base';
import {getArticles} from '../../fetch/news';
import DataItem from '../../component/dataItem';
import {Alert, View, ActivityIndicator} from 'react-native'; //to show loader animation while loading
import Modal from '../../component/modal';

export default class tab3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null, //first setting data to null on loading
      setModalVisible: false, //handling modal visibility
      modalArticleData: {}, //state to fecth particular data
    };
  }

  //checks and handles data accordingly when view news is pressed
  handleItemDataOnPress = articleData => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData, //passing data on this function
    });
  };

  handleModalClose = () => {
    this.setState({
      setModalVisible: false, // false set as we requested to close the modal
      modalArticleData: {}, //free modalarticleData as well
    });
  };

  componentDidMount() {
    //fetching news data here
    getArticles('technology').then(
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
          return <DataItem onPress={this.handleItemDataOnPress} data={item} />;
        }}
        keyExtractor={(_item, index) => index.toString()} //key extractor,for each item
      />
    );

    return (
      <Container>
        <Content>{view}</Content>
        <Modal //we will pass these props to modal.js file
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}
