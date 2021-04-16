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
  Vibration,
  Alert,
} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import bg from '../image/Download.jpeg';
import Modal from 'react-native-modal-patch';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {strings} from '../i18n';
import RNFetchBlob from 'rn-fetch-blob';
import {StampCards, Stamps, User} from '../database';
import {StampsModel} from '../database/Models/StampsModel';
let stampsModel = new StampsModel();
const numCol = 3;

const StampCard = (props) => {
  var stampCard = props?.item;
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCodeModalVisible, setQRCodeModalVisible] = useState(false);
  const [doneItems, setDoneItems] = useState(0);

  React.useEffect(() => {
    _checkDoneItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function _checkDoneItems() {
    console.log('_checkDoneItems');
    var done = 0;
    if (stampCard.content) {
      stampCard.content.forEach((content) => {
        if (content.done === 1 || content.done === true) {
          done++;
          setDoneItems(done);
          console.log('doneItem', done);
        }
      });
    }
  }

  function _showDetails(item, index) {
    if (selectedItem === index) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(item);
    }

    if (item.done) {
      setModalVisible(true);
    }
  }
  /**

 * @param {*} e
 * @example     var example = {
 * url: 'http://heppivents.de/wp-content/uploads/2021/01/008.png',
 * date: '2019-03-13',
 * description:
 * 'Nur wir und das bizarre Sexleben der Tiere im Schloss Rosenstein.',
 * name: 'Auf ein Schluck Wissen...',
 * }
 */
  function _onSuccessReadQRCode(e) {
    try {
      Vibration.vibrate([500, 500], false);

      var data = e.data
        .replace(/\s\s+/g, '')
        .replace('url', '"url"')
        .replace('date', '"date"')
        .replace('description', '"description"')
        .replace('name', '"name"');
      data = JSON.parse(
        data.slice(0, data.lastIndexOf(',')) +
          data.slice(data.lastIndexOf(',') + 1, data.length),
      );

      RNFetchBlob.fetch('GET', data.url, {})
        .then((res) => {
          let status = res.info().status;

          if (status === 200) {
            var exist = _getStampExists(data);
            console.log('exist', exist);
            if (!exist) {
              selectedItem.image = res.data;
              selectedItem.description = data.description;
              selectedItem.date = new Date(data.date);
              selectedItem.done = true;
              selectedItem.name = data.name;
              Stamps.update(selectedItem, true);
              _checkDoneItems();
            }
          } else {
            // handle other status codes
          }
        })

        // Something went wrong:
        .catch((errorMessage, statusCode) => {
          // error handling
          console.info(errorMessage, statusCode);
        });

      setQRCodeModalVisible(false);
    } catch (error) {
      console.warn(error);
      setQRCodeModalVisible(false);
    }
  }

  /**
   * @param {Object} data
   */
  function _getStampExists(data) {
    var exist = stampsModel.filterStampsBy({
      description: data.description,
      date: new Date(data.date),
      name: data.name,
    });

    if (exist.length !== 0) {
      Alert.alert(strings('DO_NOT_CHEAT'), strings('STAMP_EXIST'), [
        {text: strings('WORTH_A_TRY'), onPress: () => {}},
      ]);
      return true;
    }
    return false;
  }

  function StampCardItems(params) {
    var {stampCard} = params;

    var stampCardItems = null;
    if (stampCard?.content) {
      stampCardItems = stampCard.content.map((stamp, index) => (
        <View key={(stamp.number + index).toString()}>
          {stamp.done === 1 || stamp.done === true ? (
            <Pressable
              key={(stamp.number + index).toString()}
              style={[styles.item]}
              onPress={() => {
                console.log('Pressable', stamp, index);
                _showDetails(stamp, index);
              }}>
              <Image
                key={(stamp.number + index).toString()}
                source={{uri: 'data:image/png;base64,' + stamp.image}}
                style={styles.image}
              />
            </Pressable>
          ) : (
            <View
              key={(stamp.number + index).toString()}
              style={[styles.item, styles.stampItem]}>
              {doneItems === index ? (
                <Icon
                  onPress={() => {
                    setQRCodeModalVisible(true);
                    setSelectedItem(stamp);
                  }}
                  style={{color: GlobalColors.brandPrimary}}
                  name="add"
                />
              ) : (
                <Title style={{color: GlobalColors.brandPrimary}}>
                  {stamp.number.toString()}
                </Title>
              )}
            </View>
          )}
        </View>
      ));
    }

    return stampCardItems;
  }
  return (
    <View style={styles.content}>
      <StampCardItems stampCard={stampCard} />
      {stampCard.finished ? (
        <View style={[styles.item, styles.lastItem]}>
          <Image source={stampCard.finishedIcon} style={styles.image} />
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
                      <Text
                        style={{
                          color: GlobalColors.dark,
                          fontWeight: 'bold',
                          fontSize: 18,
                          flexWrap: 'wrap',
                        }}>
                        {selectedItem ? selectedItem.name : ''}
                      </Text>
                      <Text note>
                        {selectedItem
                          ? selectedItem?.date?.toLocaleDateString()
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
                    primary
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
            showMarker={true}
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
            primary
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
    backgroundColor: GlobalColors.lightGrey,
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
