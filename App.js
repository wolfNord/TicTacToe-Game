import React , {useState} from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native"

import Icon from "react-native-vector-icons/FontAwesome"

import {
  Heading,
  Text,
  Content,
  AppBar,
  Body,
  Card,
  H1,H3,
  Button,
  CircleIcon,
  CloseIcon,
  Box,
  NativeBaseProvider,
  InfoIcon,
} from 'native-base'

import Icons from "./components/Icons" ;
import Snackbar from "react-native-snackbar";

const itemArray = new Array(9).fill('empty')

const App = () => {

  const [isCross,setCross] = useState(false)
  const [winMsg,setWinMsg] = useState('') 


  const changeItem = (itemNumber) => {
    if(winMsg){
      return Snackbar.show({
        text : winMsg,
        backgroundColor: "#000",
        textColor: "#FFF"
      })
    }

    if(itemArray[itemNumber]=== 'empty'){
      itemArray[itemNumber] = isCross? 'cross' : 'circle' ;
      setCross(!isCross)

    }else{
      return Snackbar.show({
        text : "Position is already taken !!",
        backgroundColor : "#000",
        textColor : "#FFF"
      })
    }
    checkIsWinner()

  }

  const reloadGame = () => {

    setCross(false)
    setWinMsg('')
    itemArray.fill('empty', 0 , 9)

  }

  const checkIsWinner = () => {

      var draw = true ; 

    for(var i=0;i<9;i++)
    {
      if(itemArray[i]=== 'empty')
      {
        draw = false ;
        break ;
      }
    }

    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMsg(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== 'empty' &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMsg(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== 'empty' &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== 'empty' &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMsg(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[2]} won`);
    }else if(draw){
      setWinMsg('DRAW')
    }

    
  };

  return (
      <NativeBaseProvider>
        <Box style={{backgroundColor: "#FFF" , padding : 5  , flex : 1}}>
            <View style={{flexDirection:"row" , alignItems : "center", justifyContent: "center", marginTop: 30}}>
              <Heading color={isCross?"#10A881" : "#F4C724"} size="2xl" >Tic</Heading>
              <Heading color={isCross?"#F4C724" : "#10A881"} size="2xl" >Tac</Heading>
              <Heading color={isCross?"#10A881" : "#F4C724"} size="2xl" >Toe </Heading>
              {!isCross? <CircleIcon color="#10A881"/> : <CloseIcon color="#F4C724" /> }
            </View>
            <View style = {styles.grid}>
              {itemArray.map((item, index) => (
                <TouchableOpacity
                style = {styles.box}
                key = {index}
                onPress = {() => changeItem(index)}
                >
                  <Card style = {styles.card}>
                    <Icons name={item}/>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>

            {winMsg ? (
              <View style = {{marginBottom :180}}>
                <Heading style = {styles.message}>{winMsg}</Heading>
                <Button
                onPress={reloadGame}
                variant="subtle"
                size="sm"
                >
                  <Text>Reload Game</Text>
                </Button>
              </View>
            ) : (
              <Heading style = {styles.message}>
                {isCross ? 'Cross': 'Circle'} turn
              </Heading>
            ) }
        </Box>
      </NativeBaseProvider>
  )
}

export default App ;


const styles = StyleSheet.create({
  grid : {
    flex : 1 ,
    flexDirection : "row",
    flexWrap : "wrap",
    marginTop: 60,
  },

  box :{
    width: '33%',
    marginBottom : 6 , 
  },

  card :{
    height : 120,
    justifyContent : "center",
    alignItems : "center",
  },

  message:{
    textAlign : "center",
    textTransform : "uppercase",
    color : "#FFF",
    backgroundColor : "#4652B3",
    paddingVertical : 10 ,
    marginBottom: 10,
  }
})