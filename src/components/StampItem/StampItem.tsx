/* eslint-disable no-shadow */
import {View} from 'native-base';
import * as React from 'react';
import {
  QRCodeReturnData,
  SectionPart,
  StampCardType,
  StampType,
} from '../../Helper/Types';

import StampDetailModal from '../StampDetailModal/StampDetailModal';

import QRCodeModal from '../QRCodeModal/QRCodeModal';
import {StampCards, Stamps, User} from '../../database';
import {
  _createNewStampCard,
  _getImageNameForRank,
  _getStampCardTitle,
} from '../../Helper/Helper';
import {storeData} from '../../storage/AsyncStorage';
type Props = {
  stamp: StampType;
  index: number;
  stampCard: SectionPart;
};

export const StampItem: React.FC<Props> = ({stamp, index, stampCard}) => {
  async function doOnSuccessReadQRCodeCallback(
    stamp: StampType,
    qrCodeData: QRCodeReturnData,
  ) {
    await Stamps.update(stamp.id, qrCodeData, true);

    if (stamp.number % 10 === 0) {
      _finishCardAndCreateNewCard();
    }
  }
  async function _finishCardAndCreateNewCard() {
    try {
      if (stampCard.id) {
        await storeData('@accordionExpandedId', stampCard.id);

        let stampCardToUpdate: StampCardType = {
          id: stampCard.id,
          title: _getStampCardTitle(stampCard),
          complete: true,
          date_of_creation: stampCard.date_of_creation,
          date_of_completed: new Date(),
          completed_image: _getImageNameForRank(User.data()[0]),
        };

        let updatedItem = await StampCards.update(
          stampCard.id ?? stampCard,
          stampCardToUpdate,
          true,
        );

        if (updatedItem) {
          await _createNewStampCard();
        }
      }
    } catch (error) {
      console.info(error);
    }
  }

  return (
    <View key={(stamp.number + index).toString()}>
      {stamp.done ? (
        <StampDetailModal stamp={stamp} index={index} />
      ) : (
        <QRCodeModal
          stampCard={stampCard}
          stamp={stamp}
          index={index}
          _onSuccessReadQRCodeCallback={doOnSuccessReadQRCodeCallback}
        />
      )}
    </View>
  );
};
