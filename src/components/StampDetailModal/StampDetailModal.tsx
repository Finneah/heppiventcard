import * as React from 'react';
import {
  Avatar,
  Heading,
  Image,
  Modal,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';

import {StampType} from '../../Helper/Types';
import GlobalColors from '../../styles/GlobalColors';
const numCol = 3;
type Props = {
  stamp: StampType;
  index: number;
};
const StampDetailModal: React.FC<Props> = ({stamp, index}) => {
  const [modalIsVisible, setModalVisible] = React.useState(false);

  function _showDetails(s: StampType): void {
    // if (selectedItem === index) {
    //   setSelectedItem(undefined);
    // } else {
    //   setSelectedItem(stamp);
    // }

    if (s.done) {
      setModalVisible(true);
    }
  }

  return (
    <>
      <Pressable
        key={(stamp.number + index).toString()}
        style={[styles.item]}
        onPress={() => {
          _showDetails(stamp);
        }}>
        <Image
          alt="test"
          key={(stamp.number + index).toString()}
          source={{uri: 'data:image/png;base64,' + stamp.image}}
          style={styles.image}
        />
      </Pressable>
      <Modal isOpen={modalIsVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content style={styles.bottomModal} w={'100%'}>
          <Modal.CloseButton />

          <Modal.Header>
            <Stack direction="row" space={4} alignItems="center">
              <Avatar
                size="md"
                source={{
                  uri: 'data:image/png;base64,' + stamp?.image,
                }}
              />
              <Heading size="md">{stamp ? stamp.name : ''}</Heading>
            </Stack>
          </Modal.Header>
          <Modal.Body>
            <Image
              source={{
                uri: 'https://www.computerbase.de/forum/attachments/koala-jpg.149958/',
              }}
              alt="image base"
              resizeMode="contain"
              height={300}
              roundedTop="md"
              width={'100%'}
            />
            <Text color="gray.400">
              {stamp ? stamp?.date?.toLocaleDateString() : ''}
            </Text>
            <Text lineHeight={[5, 5, 7]} noOfLines={4} color="gray.700">
              {stamp ? stamp.description : ''}
            </Text>
          </Modal.Body>
          {/* <Modal.Footer safeArea></Modal.Footer> */}
        </Modal.Content>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  bottomModal: {
    marginBottom: 0,
    marginTop: 'auto',
  },
  image: {
    backgroundColor: GlobalColors.lightGrey,
    borderRadius: 20,
    width: '100%',
    height: '100%',
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
});

export default StampDetailModal;
