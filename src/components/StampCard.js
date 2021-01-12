import {
  Body,
  Button,
  Card,
  CardItem,
  Content,
  Icon,
  Left,
  Text,
  Thumbnail,
  Title,
} from 'native-base';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import bg from '../image/Download.jpeg';
import Modal from 'react-native-modal-patch';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {strings} from '../i18n';
import RNFetchBlob from 'rn-fetch-blob';
import {StampCards, Stamps, User} from '../database';
const numCol = 3;

const StampCard = ({item}) => {
  const [stampCard, setStampCard] = useState(item);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCodeModalVisible, setQRCodeModalVisible] = useState(false);

  var doneItems = 0;
  if (item.content) {
    item.content.forEach((content) => {
      if (content.done !== 0) {
        doneItems++;
      }
    });
  }

  function _showDetails(item, index) {
    if (selectedItem === index) {
      setSelectedItem(undefined);
    } else {
      console.log('_showDetails', item);
      setSelectedItem(item);
    }

    if (item.done) {
      setModalVisible(true);
    }
  }

  function _onSuccessReadQRCode(e) {
    var data = JSON.parse(e.data);
    console.log(data);
    RNFetchBlob.fetch('GET', data.url, {})
      .then((res) => {
        let status = res.info().status;

        if (status === 200) {
          selectedItem.image = res.data;
          selectedItem.description = data.description;
          selectedItem.date = new Date(data.date);
          selectedItem.done = 1;
          selectedItem.name = data.name;
          Stamps.update(selectedItem, true);
        } else {
          // handle other status codes
        }
      })

      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
        console.info(errorMessage, statusCode);
      });

    // var example = {
    //   url:
    //     'https://previews.123rf.com/images/chrisdorney/chrisdorney1607/chrisdorney16…1360474-abgeschlossen-stempel-%C3%BCber-einen-wei%C3%9Fen-hintergrund-.jpg',
    //   date: '2020-12-10',
    //   description: 'Textblabla',
    // };

    var x = JSON.parse(e.data);

    setQRCodeModalVisible(false);
  }

  return (
    <View style={styles.content}>
      {item.content
        ? item.content.map((i, index) => (
            <>
              <Pressable
                key={(i.number + index).toString()}
                style={[styles.item]}
                onPress={() => {
                  console.log(i, index);
                  _showDetails(i, index);
                }}>
                {i.done !== 0 ? (
                  <Image
                    key={(i.number + index).toString()}
                    source={{uri: 'data:image/png;base64,' + i.image}}
                    style={styles.image}
                  />
                ) : (
                  <View
                    key={(i.number + index).toString()}
                    style={[styles.image, styles.stampItem]}>
                    {doneItems === index ? (
                      <Icon
                        onPress={() => {
                          setQRCodeModalVisible(true);
                          setSelectedItem(i);
                        }}
                        style={{color: GlobalColors.brandPrimary}}
                        name="add"
                      />
                    ) : (
                      <Title style={{color: GlobalColors.brandPrimary}}>
                        {i.number.toString()}
                      </Title>
                    )}
                  </View>
                )}
              </Pressable>
            </>
          ))
        : null}
      {item.finished ? (
        <View style={[styles.item, styles.lastItem]}>
          <Image source={item.finishedIcon} style={styles.image} />
        </View>
      ) : (
        <View style={[styles.item, styles.lastItem]}>
          <Text>{strings('FINISH_CARD_TEXT')}</Text>
        </View>
      )}

      <Modal
        transparent
        animationType="slide"
        presentationStyle="overFullScreen" // <-- Swipe down/dismiss works now!
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)} // <-- This gets called all the time
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Card transparent>
                <CardItem header first>
                  <Left>
                    {selectedItem ? (
                      <Thumbnail
                        large
                        source={{
                          uri: 'data:image/png;base64,' + selectedItem.image,
                        }}
                      />
                    ) : null}
                    <Body>
                      <Title style={{color: GlobalColors.dark}}>
                        {selectedItem ? selectedItem.name : ''}
                      </Title>
                      <Text note>
                        {selectedItem
                          ? selectedItem.date.toLocaleDateString()
                          : ''}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Text note>
                    {selectedItem ? selectedItem.description : ''}
                  </Text>
                </CardItem>
                <CardItem footer last>
                  <Button
                    style={{marginTop: 10}}
                    centered
                    rounded
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text>{strings('CLOSE')}</Text>
                  </Button>
                </CardItem>
              </Card>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen" // <-- Swipe down/dismiss works now!
        visible={qrCodeModalVisible}
        onDismiss={() => setQRCodeModalVisible(false)} // <-- This gets called all the time
        onRequestClose={() => setQRCodeModalVisible(false)}>
        <View style={{padding: 20, flex: 1, flexDirection: 'column'}}>
          <Card>
            <CardItem first last>
              <Left>
                <Body>
                  <Text>{strings('SCAN_QR_CODE_NOW')}</Text>
                  <Text note>{strings('QR_CODE_DESCRIPTION')}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          <QRCodeScanner
            // cameraStyle={{
            //   alignSelf: 'center',
            // }}
            // containerStyle={{flex: 1}}
            fadeIn={true}
            onRead={_onSuccessReadQRCode.bind(this)}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={null}
            bottomContent={null}
          />
          <Button
            centered
            rounded
            onPress={() => {
              setQRCodeModalVisible(false);
            }}>
            <Text>{strings('CANCEL')}</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    color: '#777',
    alignSelf: 'center',
  },
  detail: {
    position: 'absolute',
    top: 0,
    borderRadius: 20,
    zIndex: 1,
    backgroundColor: 'rgba(248,248,248,0.3)',
    width: Dimensions.get('screen').width * ((100 / numCol - 10) / 100) * 3.5,
    height: Dimensions.get('screen').width * ((100 / numCol - 10) / 100) * 2.1,
  },
  item: {
    zIndex: 0,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 5,

    padding: 0,
    borderRadius: 20,
    width: Dimensions.get('screen').width * ((100 / numCol - 10) / 100),
    height: Dimensions.get('screen').width * ((100 / numCol - 10) / 100),
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  lastItem: {
    backgroundColor: GlobalColors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * ((100 / numCol - 10) / 100) * 2.2,
  },
  image: {
    backgroundColor: GlobalColors.lightGrey,
    borderRadius: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  stampItem: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentBorder: {borderColor: 'transparent'},
  transparentBG: {backgroundColor: 'transparent'},
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: GlobalColors.dark_opacity,
  },
  modalView: {
    minHeight: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default StampCard;
