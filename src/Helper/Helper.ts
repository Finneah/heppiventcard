import {StampCards, Stamps} from '../database';
import {UserRank} from './Enums';
import {strings} from '../locale/i18n';
import {SectionPart, StampCardType, UserType} from './Types';
import moment from 'moment';
import 'moment/locale/de';
export const isValidUser = (user: UserType): Boolean => {
  try {
    if (user?.name !== '' || user?.rank >= 0) {
      return true;
    }
    throw new Error('name or rank is missing');
  } catch (error) {
    return false;
  }
};
/**
 * "RANK_0": "Gast",
 * "RANK_3": "Stammgast",
 * "RANK_10": "Mitglied",
 * "RANK_15": "Stammmitglied",
 * "RANK_20": "Platinmitglied",
 * "RANK_30": "Goldmitglied",
 */
export const _getRank = (user: UserType): string => {
  let returnValue = strings('RANK_00');
  if (user?.rank) {
    if (user.rank >= UserRank.RANK_30) {
      returnValue = strings('RANK_30');
    } else if (user.rank >= UserRank.RANK_20) {
      returnValue = strings('RANK_20');
    } else if (user.rank >= UserRank.RANK_15) {
      returnValue = strings('RANK_15');
    } else if (user.rank >= UserRank.RANK_10) {
      returnValue = strings('RANK_10');
    } else if (user.rank >= UserRank.RANK_03) {
      returnValue = strings('RANK_03');
    } else {
      returnValue = strings('RANK_00');
    }
  }
  return returnValue;
};

export const _getImageNameForRank = (user: UserType): string => {
  if (user?.rank >= 30) {
    return 'Gold';
  } else if (user.rank >= 20) {
    return 'Platin';
  }
  return 'Standard';
};

export const _checkDoneItems = (stampCard: SectionPart): number | string => {
  try {
    var done = 0;

    if (stampCard?.content) {
      stampCard?.content?.forEach((content: any) => {
        if (content.done === 1 || content.done === true) {
          done++;
        }
      });

      return done;
    } else {
      throw new Error('Error on _checkDoneItems');
    }
  } catch (error) {
    console.warn('_checkDoneItems', error);
    return '_checkDoneItems' + ' ' + error.message;
  }
};

export const _getStampCardTitle = (stampCard: SectionPart): string => {
  let firstDate: Date | undefined;
  let lastDate: Date | undefined;
  let title = '';

  if (stampCard?.content) {
    for (const element of stampCard.content) {
      if (!firstDate && element.date) {
        firstDate = element.date;
      } else {
        if (
          firstDate &&
          element?.date !== null &&
          element?.date !== undefined &&
          element?.date < firstDate
        ) {
          firstDate = element.date;
        }
      }
      if (!lastDate) {
        lastDate = element.date;
      } else {
        if (
          lastDate &&
          element?.date !== null &&
          element?.date !== undefined &&
          element?.date > lastDate
        ) {
          lastDate = element.date;
        }
      }

      if (firstDate && lastDate) {
        title =
          moment(firstDate).locale('de').format('L') +
          ' - ' +
          moment(lastDate).locale('de').format('L');
        console.log(title);
      }
    }
  } else {
    return title;
  }

  return title;
};

export const _createNewStampCard = async () => {
  var newStampCard: StampCardType = {
    title: '',
    complete: false,
    date_of_creation: new Date(),
    date_of_completed: undefined,
    completed_image: undefined,
  };

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
};
