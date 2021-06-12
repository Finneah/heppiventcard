import {
  Body,
  Button,
  Card,
  CardItem,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Spinner,
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
  ImageBackground,
} from 'react-native';
import GlobalColors from '../styles/GlobalColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal-patch';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {strings} from '../i18n';
import RNFetchBlob from 'rn-fetch-blob';
import {StampCards, Stamps, User} from '../database';
import {StampsModel} from '../database/Models/StampsModel';
import {StampCardsSchema} from '../database/Schemas/StampCardsSchema';
import {TourGuideZone} from 'rn-tourguide';

let stampsModel = new StampsModel();

let stampCardsSchema = new StampCardsSchema();
const numCol = 3;
/**
 * @category Component
 * @namespace StampCard
 * @description StampCard Element
 */
const StampCard = (props) => {
  var stampCard = props?.item;
  var stampCardImage;

  if (stampCard.completed_image) {
    switch (stampCard.completed_image) {
      case 'Standard':
        stampCardImage = require('./../image/Standard.png');
        break;
      case 'Platin':
        stampCardImage = require('./../image/Platin.png');

        break;
      case 'Gold':
        stampCardImage = require('./../image/Gold.png');

        break;

      default:
        break;
    }
  }

  const [selectedItem, setSelectedItem] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCodeModalVisible, setQRCodeModalVisible] = useState(false);
  const [doneItems, setDoneItems] = useState(0);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  React.useEffect(() => {
    _checkDoneItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stampCard]);

  React.useEffect(() => {
    /**
     * @memberof StampCard
     */
    User.onChange(() => {
      _finishCardAndCreateNewCard();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneItems]);

  async function _finishCardAndCreateNewCard() {
    try {
      if (
        doneItems === stampCard?.content?.length &&
        (stampCard?.complete === 0 || stampCard?.complete === false)
      ) {
        /**
         * set completed_image from rank
         * set date_of_completed
         * set tilte = date_of_creation - date_of_completed
         * set complete
         * create new StampCard
         */

        stampCard.completed_image = _getImageNameForRank();
        stampCard.date_of_completed = new Date();
        stampCard.complete = true;
        stampCard.title = _getStampCardTitle();
        setQRCodeModalVisible(false);

        await storeData(stampCard.id);
        await StampCards.update(stampCard, true);
        await _createNewStampCard();

        Alert.alert(strings('GRATULATION'), strings('STAMP_CARD_COMPLETED'), [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
    } catch (error) {
      console.info(error);
    }
  }

  function _getImageNameForRank() {
    var user = User.data()[0];
    if (user.rank >= 30) {
      return 'Gold';
    } else if (user.rank >= 20) {
      return 'Platin';
    } else if (user.rank >= 10) {
      return 'Standard';
    }
  }

  function _getStampCardTitle() {
    var firstDate;
    var lastDate;

    stampCard.content.forEach((element) => {
      if (!firstDate) {
        firstDate = element.date;
      } else {
        if (element.date < firstDate) {
          firstDate = element.date;
        }
      }
      if (!lastDate) {
        lastDate = element.date;
      } else {
        if (element.date > lastDate) {
          lastDate = element.date;
        }
      }
    });

    return (
      firstDate.toLocaleDateString() + ' - ' + lastDate.toLocaleDateString()
    );
  }
  /**
   * @memberof StampCard
   */
  async function _createNewStampCard() {
    var schemaProps = stampCardsSchema.props;

    var newStampCard = {};
    for (const key in schemaProps) {
      if (Object.hasOwnProperty.call(schemaProps, key)) {
        newStampCard[key] = undefined;
      }
    }

    newStampCard.date_of_creation = new Date();
    newStampCard.title = '';
    newStampCard.complete = false;

    var card = await StampCards.insert(newStampCard, true)[0];

    var newStamps = [];
    for (let i = 1; i <= 10; i++) {
      newStamps.push({
        number: i,
        done: 0,
        stampCard: card,
      });
    }

    await Stamps.insert(newStamps, true);
  }

  /**
   * @memberof StampCard
   * @description check Items for is done, set doneItemsCount
   */
  function _checkDoneItems() {
    try {
      var done = 0;
      if (stampCard?.content) {
        stampCard?.content?.forEach((content) => {
          if (content.done === 1 || content.done === true) {
            done++;
          }
        });

        setDoneItems(done);
      }
    } catch (error) {
      console.warn('_checkDoneItems', error);
    }
  }

  /**
   * @memberof StampCard
   * @description set selectedItem for Details, then show Detail Model
   * @param {Object} item StampItem
   * @param {int} index index for StampItem in StampItems
   */
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
   * @memberof StampCard
   * @description on Read QR Code, get Data JSON, load image and set Details
   * @param {*} e
   * @example     var example = {
   * url: 'http://heppivents.de/wp-content/uploads/2021/01/008.png',
   * date: '2019-03-13',
   * description:
   * 'Nur wir und das bizarre Sexleben der Tiere im Schloss Rosenstein.',
   * name: 'Auf ein Schluck Wissen...',
   * }
   */
  async function _onSuccessReadQRCode(e) {
    try {
      setShowLoadingSpinner(true);
      Vibration.vibrate([500, 500], false);

      var data = _createQRCodeDataObject(e.data);

      var image;

      if (data.url) {
        image = await _getImageFromWebsite(data);
      }

      if (data.date && data.description && data.name && image) {
        var exist = _getStampExists(data);

        if (!exist) {
          selectedItem.image = image;
          selectedItem.description = data.description;
          selectedItem.date = new Date(data.date);
          selectedItem.done = true;
          selectedItem.name = data.name;

          setSelectedItem(selectedItem);
          setShowLoadingSpinner(false);
          setQRCodeModalVisible(false);

          await Stamps.update(selectedItem, true);

          _checkDoneItems();
        }
      } else {
        setShowLoadingSpinner(false);
        Alert.alert(strings('SRY'), strings('CANT_READ_QR_CODE'), [
          {
            text: 'OK',
            onPress: () => {
              setQRCodeModalVisible(false);
            },
          },
        ]);
      }
    } catch (error) {
      setShowLoadingSpinner(false);
      Alert.alert(strings('SRY'), strings('CANT_READ_QR_CODE'), [
        {
          text: 'OK',
          onPress: () => {
            console.warn(error);
            setQRCodeModalVisible(false);
          },
        },
      ]);
    }
  }
  async function storeData(value) {
    try {
      await AsyncStorage.setItem('@accordionExpandedId', value);
    } catch (e) {
      // saving error
    }
  }

  function _createQRCodeDataObject(qrCodeData) {
    var data = {};

    qrCodeData.split('&').forEach((element) => {
      if (element.indexOf('url=') !== -1) {
        data.url = element.replace('url=', '').replace('\n', '');
      } else if (element.indexOf('date=') !== -1) {
        data.date = element.replace('date=', '').replace('\n', '');
      } else if (element.indexOf('description=') !== -1) {
        data.description = element
          .replace('description=', '')
          .replace('\n', '');
      } else if (element.indexOf('name=') !== -1) {
        data.name = element.replace('name=', '').replace('\n', '');
      }
    });
    return data;
  }

  async function _getImageFromWebsite(data) {
    try {
      var res = await RNFetchBlob.fetch('GET', data.url, {});
      let status = res.info().status;

      if (status === 200) {
        return res.data;
      }
    } catch (error) {
      console.info(error);
      setShowLoadingSpinner(false);
      Alert.alert(strings('SRY'), strings('CANT_READ_QR_CODE'), [
        {
          text: 'OK',
          onPress: () => {
            setQRCodeModalVisible(false);
          },
        },
      ]);
    }
  }

  /**
   * @memberof StampCard
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
        {
          text: strings('WORTH_A_TRY'),
          onPress: () => {
            setQRCodeModalVisible(false);
          },
        },
      ]);
      return true;
    }
    return false;
  }
  /**
   * @memberof StampCard
   */
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
      {stampCard.complete && stampCardImage ? (
        <View style={[styles.item, styles.lastItem]}>
          <Image
            resizeMode="stretch"
            style={[
              styles.image,
              {
                width:
                  Dimensions.get('screen').width *
                  ((100 / numCol - 10) / 100) *
                  2.2,
                height:
                  Dimensions.get('screen').width * ((100 / numCol - 10) / 100),
              },
            ]}
            // source={require('./../image/Standard.jpg')}
            source={stampCardImage}
          />
        </View>
      ) : (
        <View style={[styles.item, styles.lastItem, {padding: 5}]}>
          <Text note style={{textAlign: 'center'}}>
            {strings('FINISH_CARD_TEXT')}
          </Text>
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
        <Header transparent>
          <Left></Left>
          <Body>
            <Title style={{color: GlobalColors.dark}}>
              {strings('SCAN_QR_CODE_NOW')}
            </Title>
          </Body>
        </Header>
        {showLoadingSpinner ? (
          <Spinner color={GlobalColors.brandSecondary}></Spinner>
        ) : null}
        <View style={{padding: 20, flex: 1, flexDirection: 'column'}}>
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
              setShowLoadingSpinner(false);
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
