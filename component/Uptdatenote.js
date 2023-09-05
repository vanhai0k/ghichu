import { View,Text,StyleSheet,TextInput,TouchableOpacity,Keyboard } from "react-native"
import React, { Component, useState } from 'react'
import {API} from '../data/dataNote' 

const Updatenote = ({route,navigation}) =>{

    const [id, setid] = useState(route.params.id);
    const [title, setTitle] = useState(route.params.title);
    const [notes, setNotes] = useState(route.params.notes);

    const updateNote =() =>{
        let note = {
            id:id,
            title:title,
            notes:notes
        }
        fetch(API.update + id, {
            method: 'PUT',
            headers: {  
                'Content-Type': 'application/json',
            Accept: 'application/json'
            },
            body: JSON.stringify(note)
        }).then((result) =>{
            result.json().then((renote) =>{
                console.log(renote);
            })
        })
        Keyboard.dismiss();
        // navigation.navigate("Home")
    }

    return (
        <View style={{marginTop:0,}}>
                        <TouchableOpacity onPress={updateNote} style={styles.butttom}>
                <Text style={{textAlign:'center',fontSize:17,color:'red',fontWeight:'bold',backgroundColor:'#DDDDDD',borderRadius:20}}
                >Xong</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} value={title} placeholder='Nhap title' onChangeText={text => setTitle(text)}multiline={true} />
            <TextInput style={styles.input1} value={notes} placeholder='Nhap notes' onChangeText={text => setNotes(text)}multiline={true} />

        </View>
    )
}
export default Updatenote;
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
  
    },
    input: {
        borderTopWidth:0.35,
        height: "auto",
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 10,
        width: "80%",
        padding: 8,
        alignSelf: "center",
        fontWeight:'bold',
        fontSize:18
      },
      cochu: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
      },
      input1: {
        borderTopWidth:0.1,
        borderLeftWidth:0.1,
        borderRightWidth:0.1,
        height: "auto",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
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