import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { uri } from '../api.json'
import axios from "axios"

const ClientUpdateModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clientName, setClientName] = useState(``);
  const [phoneNumber,setPhoneNumber] = useState(``);
  const [balance, setBalance] = useState(0);
  const [id, setID] = useState(``)

  const updateClient = () => {
      const body = {
        userName: clientName,
        balance: balance,
        phone: phoneNumber,
      }
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      
      axios.put(`${uri}/api/client/${id}`, body, config)
      .then(() => props.getClients())
      .catch(err => console.log(err.response))
      .finally(() => props.handleClose())
  }
  
  useEffect(() => {
    setClientName(props.object.userName)
    setPhoneNumber(props.object.phone)
    setBalance(props.object.balance)
    setID(props.object._id)
  }, [props.object])
  
  useEffect(() => {
    setModalVisible(props.state);
  }, [props.state]);

  function handleClose() {
    setModalVisible(false);
  }
  const onChangeClientName = (name) => {
    setClientName(name)
  }
  const onChangePhoneNumber = (phoneNum) => {
    setPhoneNumber(phoneNum);
  }

  return (
    
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            swipeDirection="left"
            visible={modalVisible}
            onSwipeComplete={() => props.handleClose()}
            onRequestClose={() => {
            props.handleClose();
            }}
        > 
       
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{props.title}</Text>
                <View style={styles.modalBody}>
                    <TextInput placeholder="Username" onChangeText= {onChangeClientName} style={styles.input} value = {clientName}/>
                    <TextInput placeholder="PhoneNumber" onChangeText= {onChangePhoneNumber}  style={styles.input} value = {phoneNumber}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems : 'center'}}>
                    <TouchableOpacity onPress={() => props.handleClose()}>
                        <View style={styles.buttonModalContainer}>
                            <Text style={styles.buttonModalText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => updateClient()}>
                        <View style={styles.backButtonModalContainer}>
                            <Text style={styles.buttonModalText}>Done</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
            
                
            
            </View>
        </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'Roboto',
    fontSize: Dimensions.get('window').height > 900 ? 22 : 14,
    paddingTop: Dimensions.get('window').height > 900 ? 25 : 16
  },  
  modalTitle : {
    color: '#006270',
    //fontSize: Dimensions.get('window').height > 900 ? 30 : 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 28 : 24): 24,
    top: 15,
  },
  buttonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 35 : null): null,
    margin: 20,
    display: 'flex',

  },
  backButtonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 35 : null): null,
    margin: 20,
    display: 'flex',
    
  },
  buttonModalContainer2 : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#00E0C7',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 60 : 35): 35,
    margin: 20,
    display: 'flex',

  },
  backButtonModalContainer2 : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: '#008394',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 60 : 35): 35,
    margin: 20,
    display: 'flex',
    
  },
  deleteButtonModalContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    borderRadius : 40,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: Dimensions.get('window').height > 900 ? 35 : 15,
    margin: 20,
    display: 'flex',
    
  },
  buttonModalText :{
    color: '#ffffff',
    fontSize: Dimensions.get('window').height > 900 ? (Dimensions.get('window').width > 480 ? 24 : 16): 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalBody:{
    paddingVertical:'30%',
    paddingHorizontal:10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').height > 900 ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').width * 0.80,
    height: Dimensions.get('window').height > 900 ? Dimensions.get('window').height* 0.5 : Dimensions.get('window').height * 0.60
    // width: '80%',
    // height: Dimensions.get('window').height > 900 ? '65%' : Dimensions.get('window').height * 0.60
  },

  input: {
    height: 40,
    width: Dimensions.get('window').width * 0.65,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: Dimensions.get('window').height > 900 ? 5 : 5,
    fontSize: 12,
    borderColor: "#008394",
    padding: 13
    
},
  
});

export default ClientUpdateModal;