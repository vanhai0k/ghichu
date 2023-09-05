import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Alert,alert,Keyboard
} from "react-native";
import React, { Component, useState } from "react";

const Addnote = (props) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [checktitle, setchecktitle] = useState('')
  const [checknote, setchecknote] = useState('')

  const addNote = () => {
    let url = "http://192.168.1.11:8000/api/users";
    let obj = {
      title: title,
      notes: notes,
    };

    obj.title === '' ? setchecktitle('Chưa nhập tiêu đề...') : setchecktitle('')
    obj.notes === ''? setchecknote('Chưa nhập nội dung...') : setchecknote('')

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (response.status == 201) {
          Alert.alert({
            title: "Thong bao",
            message: "Da them ghi chu thanh cong!!!"
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
      Keyboard.dismiss();
    // props.navigation.navigate("Home");
  };

  return (
    <View style={{ marginTop: 0 }}>
            <TouchableOpacity onPress={addNote} style={styles.butttom}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            color: "red",
            fontWeight: "bold",
            backgroundColor: "#DDDDDD",
            borderRadius:20
          }}
        >
          Xong
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nhap title"
        onChangeText={(text) => setTitle(text)}
        multiline={true}
      />
      <Text style={{color:'red',marginLeft:40,marginBottom:8}}>{checktitle}</Text>
      <TextInput
        style={styles.input1}
        placeholder="Nhap notes"
        onChangeText={(text) => setNotes(text)}
        multiline={true}
      />
      <Text style={{color:'red',marginLeft:40,marginBottom:4}}>{checknote}</Text>
    </View>
  );
};
export default Addnote;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  input: {
    borderWidth: 0.5,
    height: "auto",
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 10,
    width: "80%",
    padding: 8,
    alignSelf: "center",
  },
  cochu: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  input1: {
    borderWidth: 0.5,
    height: "auto",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
    padding: 8,
    alignSelf: "center",
  },
  butttom: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: 'auto',
    width: 100,
    alignSelf: 'flex-end',
    marginRight:10
  },
});
