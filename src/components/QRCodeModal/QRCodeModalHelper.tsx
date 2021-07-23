import RNFetchBlob from 'rn-fetch-blob';
import {StampsModel} from '../../database/Models/StampsModel';

import {QRCodeObject, StampType} from '../../Helper/Types';

let stampsModel = new StampsModel();

export const _createQRCodeDataObject = (qrCodeData: string): QRCodeObject => {
  var data: QRCodeObject = {
    url: '',
    date: '',
    description: '',
    name: '',
    picture: undefined,
  };

  qrCodeData.split('&').forEach((element: any) => {
    if (element) {
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
      } else if (element.indexOf('picture=') !== -1) {
        data.picture = element.replace('picture=', '').replace('\n', '');
      }
    }
  });

  return data;
};

export const _getImageFromWebsite = async (
  data: any,
): Promise<string | void> => {
  try {
    var res = await new Promise<any>((resolve) =>
      resolve(RNFetchBlob.fetch('GET', data.url, {})),
    );

    let status = res?.info()?.status;
    if (status === 200) {
      return res?.data;
    } else {
      throw new Error('Image not found');
    }
  } catch (error) {
    throw new Error('Image not found' + ' ' + error.message);
  }
};

export const _getStampExists = (data: any): boolean => {
  var exist: StampType[] = stampsModel.filterStampsBy({
    description: data.description,
    date: new Date(data.date),
    name: data.name,
  });

  if (exist.length !== 0) {
    return true;
  }
  return false;
};
