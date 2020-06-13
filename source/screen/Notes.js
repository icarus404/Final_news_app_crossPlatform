import React from 'react';
import {
  StyleSheet,
  Text,
  alert,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import NoteField from '../component/addNote';

//logic for adding and removing notes
export default class App extends React.Component {
  //constructor

  // @array ->  notes   all added notes.
  // @string -> note    the current note value.

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      note: '',
    };
  }

  //load notes from async storage if existes , in component did mount state
  async componentDidMount() {
    const notes = await AsyncStorage.getItem('notes');
    if (notes && notes.length > 0) {
      this.setState({
        notes: JSON.parse(notes),
      });
    }
  }

  //update notes--array of notes
  updateAsyncStorage(notes) {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem('notes');
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        return resolve(true);
      } catch (e) {
        return reject(e);
      }
    });
  }

  //make a copy of notes array
  cloneNotes() {
    return [...this.state.notes];
  }

  //add a new note
  async addNote() {
    if (this.state.note.length <= 0) {
      return;
    }

    try {
      const notes = this.cloneNotes();
      notes.push(this.state.note);

      await this.updateAsyncStorage(notes);

      this.setState({
        notes: notes,
        note: '',
      });
    } catch (e) {
      // notes could not be updated
      alert(e);
    }
  }

  //remove note
  async removeNote(i) {
    try {
      const notes = this.cloneNotes();
      notes.splice(i, 1);

      await this.updateAsyncStorage(notes);
      this.setState({notes: notes});
    } catch (e) {
      // Note could not be deleted
      alert(e);
    }
  }

  //render all notes
  renderNotes() {
    return this.state.notes.map((note, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={styles.note}
          onPress={() => this.removeNote(i)}>
          <Text style={styles.noteText}>{note}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>{this.renderNotes()}</ScrollView>

        <NoteField
          onChangeText={note => this.setState({note})}
          inputValue={this.state.note}
          onNoteAdd={() => this.addNote()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    maxHeight: '82%',
    marginBottom: 100,
    backgroundColor: '#fff',
  },
  note: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  noteText: {
    fontSize: 14,
    padding: 10,
  },
});
