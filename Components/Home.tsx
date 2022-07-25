import { StyleSheet, Text, View,TouchableOpacity,Linking,FlatList, ScrollView } from 'react-native'
import React, { useState ,useRef} from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import type from './types';




const Home = () => {
  const [getData, setGetData] = useState<{}[]>([]);
  const [currentData, setCurrentData] = useState<type>();
  let page = useRef<number>(1);

 
  const getApi = async () => {
    try {
      const request = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page.current}`
      );
      setGetData((pre) => {
        return [...pre, request.data.hits];
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApi();
    setInterval(() => {
      page.current = page.current + 1;
      getApi();
    }, 10000);
  }, []);


  const mainList = ({ item }: any) => {
    return (
      <View style={styles.mainList}>
        <FlatList
          onEndReached={() => {}}
          data={item}
          renderItem={currentList}
        />
      </View>
    ); 
  };
  const currentList = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.listPage}
        onPress={() => setCurrentData(item)}
      >
        <Text style={styles.title}>Title : {item.title}</Text>
        <Text style={styles.author}>Author : {item.author}</Text>
        <Text style={styles.create}>CreatedAt : {item.created_at}</Text>
        <Text style={styles.url}
        onPress={() => Linking.openURL("item.url")}>URL : {item.url}
        </Text>
      </TouchableOpacity>
    );
  };

  return currentData === undefined ? (
    <View>
      <FlatList data={getData} renderItem={mainList} />
      <View style={styles.page}>
        
        <Text style={styles.pagination}>{page.current}</Text>
        
      </View>
    </View>
  ) :
  
  
  (
    <ScrollView style={styles.scroll}>
   
    <View style={styles.rawJson}>

    <TouchableOpacity> 
      <Text style={styles.button} 
      onPress={() => setCurrentData(undefined)}>
        x 
      </Text>
      </TouchableOpacity>
    
      <Text style={styles.rawText}>{JSON.stringify(currentData)}</Text>
    </View>
   
    </ScrollView>
  );
};

  
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainList: {
    backgroundColor: "#b9f0c8",

   },
  title: {
    fontSize: 25,
    color: "#283618",
    fontWeight:"bold",
   },
 
  author: {
    fontSize: 22,
    fontWeight: "700",
    color: "#283618",
    paddingTop:8,
   
  },
 create:{
  fontStyle:"italic",
  fontWeight:"600",
  color: "#283618",
  paddingTop:8
 },
  
url:{
  fontStyle:"italic",
  color: "black" ,
  fontWeight:"500",
  paddingTop:8,
  textDecorationLine: 'underline',
},
  page: {
    backgroundColor: "white",
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
  },
  pagination: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
    
   },
  button: {
    fontSize: 40,
    textAlign: "left",
    margin: 2,
    color:"red",
     backgroundColor:"#d8e0d3",
    // borderRadius:100,
    //  elevation: 10,
    
    // paddingVertical: 10,
    // paddingHorizontal: 10
  },
  listPage: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 1,
    borderStartColor:"#171717",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:3

  },
  scroll:{
    borderRadius:10,
     padding:10,
    borderColor:"#1e1e1e",
    
    
    
  },
  rawJson: {
    flex: 1,
    backgroundColor: "#d8e0d3",
    padding:10,
    justifyContent:"space-around",
    
  },
  rawText: {
    fontSize: 20,
    fontStyle:"normal",
    fontWeight:"700",
    color:"#121211",
   
  },
})