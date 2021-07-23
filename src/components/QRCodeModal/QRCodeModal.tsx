/* eslint-disable react-native/no-inline-styles */
import {Heading, Icon, Pressable, Spinner, Modal, useToast} from 'native-base';
import {StyleSheet, Dimensions, Vibration} from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {QRCodeReturnData, SectionPart, StampType} from '../../Helper/Types';
import GlobalColors from '../../styles/GlobalColors';
import {strings} from '../../locale/i18n';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {
  _createQRCodeDataObject,
  _getImageFromWebsite,
  _getStampExists,
} from './QRCodeModalHelper';
import {_checkDoneItems} from '../../Helper/Helper';

type Props = {
  stampCard: SectionPart;
  stamp: StampType;
  index: number;

  _onSuccessReadQRCodeCallback: Function;
};
const numCol = 3;

const QRCodeModal: React.FC<Props> = ({
  stampCard,
  stamp,
  index,
  _onSuccessReadQRCodeCallback,
}) => {
  const [qrCodeModalVisible, setQRCodeModalVisible] = React.useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = React.useState(false);

  const toast = useToast();

  React.useEffect(() => {
    if (!qrCodeModalVisible) {
      setQRCodeModalVisible(false);
      setShowLoadingSpinner(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeModalVisible]);

  function setAndShowToast(
    title: string,
    description: string,
    status: 'error' | 'info' | 'warning' | 'success' | undefined,
  ) {
    setShowLoadingSpinner(false);
    setQRCodeModalVisible(false);

    toast.show({
      title: title,
      description: description,
      placement: 'bottom',
      status: status,
    });
  }

  async function _onSuccessReadQRCode(e: any) {
    try {
      setShowLoadingSpinner(true);
      Vibration.vibrate([500, 500], false);

      var data = _createQRCodeDataObject(e.data);

      var image;

      try {
        image = await _getImageFromWebsite(data);
        // @todo get Picture
      } catch (error) {
        console.info(error);
        setShowLoadingSpinner(false);
        setAndShowToast(
          strings('SRY'),
          strings('CANT_READ_QR_CODE' + ' ' + error),
          'error',
        );
      }

      if (image) {
        var exist = _getStampExists(data);
        if (__DEV__) {
          exist = false;
        }

        if (exist) {
          setAndShowToast(
            strings('DO_NOT_CHEAT'),
            strings('STAMP_EXIST'),
            'info',
          );
        } else {
          let qrCodeData: QRCodeReturnData = {
            image: image,
            // picture:
            description: data.description,
            date: new Date(data.date),
            done: true,
            name: data.name,
          };

          setShowLoadingSpinner(false);
          setQRCodeModalVisible(false);

          _onSuccessReadQRCodeCallback(stamp, qrCodeData);
        }
      } else {
        setShowLoadingSpinner(false);
        setAndShowToast(strings('SRY'), strings('CANT_READ_QR_CODE'), 'error');
      }
    } catch (error) {
      setShowLoadingSpinner(false);
      setAndShowToast(strings('SRY'), strings('CANT_READ_QR_CODE'), 'error');
    }
  }

  return (
    <>
      <Pressable
        onPress={() => {
          _checkDoneItems(stampCard) === index
            ? setQRCodeModalVisible(true)
            : null;
        }}
        key={(stamp.number + index).toString()}
        style={[styles.item, styles.stampItem]}>
        {_checkDoneItems(stampCard) === index ? (
          <Icon color="primary.600" as={<Ionicons name="add" />} />
        ) : (
          <Heading size="md" style={{color: GlobalColors.brandPrimary}}>
            {stamp.number.toString()}
          </Heading>
        )}
      </Pressable>
      <Modal
        size="full"
        isOpen={qrCodeModalVisible}
        onClose={() => setQRCodeModalVisible(false)}>
        <Modal.Content style={styles.bottomModal} w={'100%'}>
          <Modal.CloseButton />
          <Modal.Header>
            <Heading style={{color: GlobalColors.dark}}>
              {strings('SCAN_QR_CODE_NOW')}
            </Heading>
          </Modal.Header>
          <Modal.Body>
            <QRCodeScanner
              reactivate={true}
              reactivateTimeout={5000}
              showMarker={true}
              markerStyle={{
                borderColor: GlobalColors.brandSecondary,
                borderRadius: 25,
              }}
              cameraStyle={{
                alignSelf: 'center',
                width: '100%',
              }}
              customMarker={
                showLoadingSpinner ? (
                  <Spinner
                    accessibilityLabel="scanning QRCode"
                    color="secondary.400"
                  />
                ) : undefined
              }
              fadeIn={true}
              onRead={_onSuccessReadQRCode.bind(this)}
              topContent={undefined}
              bottomContent={undefined}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
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
  bottomModal: {
    marginBottom: 0,
    marginTop: 'auto',
  },
  stampItem: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default QRCodeModal;
