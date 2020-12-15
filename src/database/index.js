import VasernDB from './db';
import Error_Handler from '../Error_Handler';
import intervalJSON from './intervals.json';

import {IntervalSchema} from './Schemas/CardSchema';

const {Intervals} = VasernDB;
// let categorieModel = new CategorieModel();

let error_handler = new Error_Handler();

function _createIntervalsIfNotExist() {
  try {
    if (intervalJSON) {
      if (Intervals.data().length == 0) {
        Intervals.insert(intervalJSON, true);
        console.info('insert all');
      } else if (intervalJSON.length != Intervals.data().length) {
        console.info('else if', intervalJSON.length, Intervals.data().length);
      } else {
        console.info('_createIntervalsIfNotExist all in');
      }
    }
  } catch (error) {
    error_handler._handleError('_createIntervalsIfNotExist', error);
  }
}

// function _createCategoriesIfNotExist() {
//   try {
//     if (categoriesJSON) {
//       if (Categories.data().length == 0) {
//         Categories.insert(categoriesJSON, true);
//         console.info('insert all');
//       } else if (categoriesJSON.length != Categories.data().length) {
//         console.info(
//           'else if',
//           categoriesJSON.length,
//           Categories.data().length,
//         );

//         _createMissingCategories();
//       } else {
//         console.info('_createCategoriesIfNotExist all in');
//       }
//     }
//   } catch (error) {
//     error_handler._handleError('_createCategoriesIfNotExist', error);
//   }
// }

// function _createMissingCategories() {
//   for (let i = 0; i < categoriesJSON.length; i++) {
//     const element = categoriesJSON[i];
//     var categorie = categorieModel.getCategorieByName(element.name);
//     if (!categorie) {
//       Categories.insert(element, true);
//     }
//   }
// }

/**
 * @deprecated Not in Use
 */
function _updateIntervals() {
  Intervals.update({name: 'einmalig'}, {name: 'Single'}, true);
  Intervals.update({name: 'monatlich'}, {name: 'Monthly'}, true);
  Intervals.update({name: 'alle 2 Monate'}, {name: 'Every2Months'}, true);
  Intervals.update({name: 'alle 3 Monate'}, {name: 'Every3Months'}, true);
  Intervals.update({name: 'alle 6 Monate'}, {name: 'Every6Months'}, true);
  Intervals.update({name: 'jährlich'}, {name: 'Yearly'}, true);
}
Intervals.onLoaded(() => {
  _createIntervalsIfNotExist();
});

export default VasernDB;
Intervals.validateProps(Object.keys(new IntervalSchema().props));

export {Intervals};
