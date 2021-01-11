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

const numCol = 3;
const StampCard = ({item}) => {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  var doneItems = 0;
  item.content.forEach((content) => {
    if (content.done !== false) {
      doneItems++;
    }
  });
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

  return (
    <View style={styles.content}>
      {item.content.map((i, index) => (
        <>
          <Pressable
            key={i.name + index}
            style={[styles.item]}
            onPress={() => {
              _showDetails(i, index);
            }}>
            {i.done !== false ? (
              <Image
                key={i.name + index}
                source={{uri: 'data:image/png;base64,' + i.image}}
                style={styles.image}
              />
            ) : (
              <View
                key={i.name + index}
                style={[styles.image, styles.stampItem]}>
                {doneItems === index ? (
                  <Icon style={{color: GlobalColors.brandPrimary}} name="add" />
                ) : (
                  <Title style={{color: GlobalColors.brandPrimary}}>
                    {i.name}
                  </Title>
                )}
              </View>
            )}
          </Pressable>
        </>
      ))}
      {item.finished ? (
        <View style={[styles.item, styles.lastItem]}>
          <Image source={item.finishedIcon} style={styles.image} />
        </View>
      ) : (
        <View style={[styles.item, styles.lastItem]}>
          <Text>{'Lorem Ipsum'}</Text>
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
                        {'Name des Events'}
                      </Title>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Text note>
                    {
                      'Das sind nicht die Droiden die Ihr sucht. Das sind nicht die Droiden die Ihr sucht. Das sind nicht die Droiden die Ihr sucht'
                    }
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
                    <Text>{'close'}</Text>
                  </Button>
                </CardItem>
              </Card>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 22,
  },
  modalView: {
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
