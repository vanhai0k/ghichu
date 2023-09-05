import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  alert,
  Alert,
  Image,SearchBar,
} from "react-native";
import React, { Component, useState, } from "react";
import {
  FlatList,
  GestureHandlerRootView,
  Swipeable,
  TextInput,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import {API} from '../data/dataNote' 
import axios from 'axios'

const Home = (props) => {
  const [dsnote, setdsnote] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [keySearch, setkeySearch] = useState('')

  // tim kiem
  const onchangeKeySeach = value => setkeySearch(value)

  const forMatTime = (time) =>{
    const options = {hour: "numeric", minute:"numeric"};
    return new Date(time).toLocaleDateString("vi-VN",options);
  }

  const getData = async () => {
    fetch(API.get)
      .then((res) => res.json())
      .then((result) => {
        setdsnote(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    

  };



  const renderNote = ({ item }) => {
    urldele = "http://192.168.1.11:8000/api/users/delete/";
    const xoaItem = () => {
      console.log("api Xoa Item", urldele + item._id);

      fetch(urldele + item._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        getData();
        if (response.status == 200) alert("Xoa thanh cong");
      });
    };
    const submit = () => {
      Alert.alert("Xóa giao dịch", "Bạn có muốn xóa ghi chu này?", [
        {
          text: "OK",
          onPress: () => {
            xoaItem(), getData();
          },
        },
        {
          text: "Cancel",

          style: "cancel",
        },
        
      ]);
    };
    const leftSwipe = () => {
      return (
        <TouchableOpacity style={styles.deletebox} onPress={() => submit()}>
          <View>
            <IonIcon name={"trash-outline"} size={30}></IonIcon>
          </View>
        </TouchableOpacity>
      );
    };
    const chuyenupdates = () => {
      props.navigation.navigate("Updatenote", {
        id: item._id,
        title: item.title,
        notes: item.notes,
      });
    };
    // hien thi giao iteam
    return (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={leftSwipe}>
          <View
            style={{
              with: "90%",
              height: "auto",
              marginBottom: 6,
              paddingLeft: 10,
            }}
          >
            <Text onPress={chuyenupdates} style={styles.cochu}>
              {item.title}
            </Text>
            <Text style={styles.cochu2}>{item.notes.slice(0, 19)} ...</Text>
            <Text style={styles.cochu2}>{forMatTime(item.date)} </Text>
            <Text
              style={{ backgroundColor: "gray", height: 0.5, marginTop: 3 }}
            >
              -
            </Text>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const chuyenadd = () => {
    props.navigation.navigate("Addnote");
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // khi màn hình được hiển thị sẽ gọi vào hàm này
      // gọi hàm load dữ liệu
      getData();
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <GestureHandlerRootView>
      <View style={{ backgroundColor: "#DDDDDD" }}>
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 15 }}>
            Ghi chú
          </Text>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius:15,
          margin:5,
          backgroundColor:'white'
        }}>
          <TextInput style={{flex: 1, marginLeft:15}}
          placeholder="Enter your key seach..."
          value={keySearch}
          onChangeText={onchangeKeySeach}
          />
        </View>
        
        <View style={styles.body}>
          <FlatList
            data={dsnote.filter(title => title.title.search(keySearch) > -1)}
            keyExtractor={(item) => `key-${item._id}`}
            renderItem={renderNote}
          />
        </View>
        <View>
          <TouchableOpacity onPress={chuyenadd}>
            <Image
              style={styles.image}
              source={require("../assets/iconadd.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  body: {
    margin: 5,
    borderRadius: 15,
    margin: 5,
    height: "82.9%",
    padding: 10,
    backgroundColor: "white",
  },
  cochu: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
  },
  cochu2: {
    fontSize: 20,
    color: "gray",
  },
  cochu1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 360,
  },
  deletebox: {
    width: 40,
    backgroundColor: "red",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
});


{/* <View style={{width:'100%',flexDirection:'row'}}>

<View style={{width:'46%',margin:5,height:270,shadowRadius:20}}>
  <Image source={require('./assets/doraemon.webp')} 
  style={{width:'90%',height:270,alignSelf:'center',marginTop:3,borderRadius:20,position:'absolute'}} />
  <Text style={{position:'absolute',top:'89%',left:'10%',color:'black',fontWeight:'bold',fontSize:20}}>
    Doraemon
  </Text>
  <View style={{width:30,height:30,backgroundColor:'red',borderRadius:20,alignSelf:'flex-end',position:'relative',top:'3%',right:'8%'}}>
  <Text style={{color:'white',alignSelf:'center',marginTop:5}}>
    7.5
  </Text>
  </View>
</View>

<View style={{width:'46%',margin:5,height:270,shadowRadius:20}}>
  <Image source={require('./assets/bia1.jpg')} 
  style={{width:'90%',height:270,alignSelf:'center',marginTop:3,borderRadius:20,position:'absolute',
  
}}
  />
  <Text style={{position:'absolute',top:'89%',left:'10%',color:'black',fontWeight:'bold',fontSize:20}}>
    Doraemon
  </Text>
  <View style={{width:30,height:30,backgroundColor:'red',borderRadius:20,alignSelf:'flex-end',position:'relative',top:'3%',right:'8%'}}>
  <Text style={{color:'white',alignSelf:'center',marginTop:5}}>
    7.5
  </Text>
  </View>
</View>

</View> */}