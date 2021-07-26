import {Stack, Heading, HStack, Icon, useColorModeValue} from 'native-base';
import * as React from 'react';

import {strings} from '../../locale/i18n';

import {Stamps, User} from '../../database';
import {StampsModel} from '../../database/Models/StampsModel';
import {UserType} from '../../Helper/Types';
import {isValidUser, _getRank} from '../../Helper/Helper';
import {UserModel} from '../../database/Models/UserModel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditNameAlertDialog from '../Alert/EditNameAlertDialog';
let stampsModel = new StampsModel();
let userModel = new UserModel();
/**
 * @category Component
 * @namespace MemberCard
 * @description MemberCard Element
 */
const MemberCard: React.FC = () => {
  let baseUser: UserType = {name: strings('NAME_PLACEHOLDER'), rank: 0};
  const [user, setUser] = React.useState(baseUser);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  React.useLayoutEffect(() => {
    /**
     * @memberof MemberCard
     */
    User.onLoaded(async () => {
      try {
        if (User.data().length === 0) {
          var newUser: UserType = {name: strings('NAME_PLACEHOLDER'), rank: 0};
          userModel.createNewUser(newUser);
          setUser(newUser);
        } else {
          if (isValidUser(User.data()[0])) {
            setUser(User.data()[0]);
          }
        }
      } catch (error) {
        console.info(error);
      }
    });

    /**
     * @memberof MemberCard
     */
    User.onChange(() => {
      try {
        if (isValidUser(User.data()[0])) {
          setUser(User.data()[0]);
        }
      } catch (error) {
        console.info(error);
      }
    });

    /**
     * @memberof MemberCard
     */
    Stamps.onChange(() => {
      try {
        var stampsLength = stampsModel._getStampsLength();
        if (stampsLength) {
          let dbUser: UserType = User.data()[0];
          dbUser.rank = stampsLength;
          userModel.updateUser(dbUser);
        }
      } catch (error) {
        console.warn('Member Card Stamps.onChange', error);
      }
    });
  }, []);

  return (
    <>
      <Stack
        safeAreaX
        direction="row"
        px={5}
        justifyContent="space-between"
        alignItems="center">
        <HStack alignItems="center" space={2}>
          <Icon
            onPress={() => setShowAlertDialog(true)}
            size="sm"
            as={<Ionicons name="create" />}
            color={useColorModeValue('primary.600', 'secondary.400')}
          />
          <Heading size="sm">
            {strings('HELLO') + ' ' + user?.name ?? ''}
          </Heading>
        </HStack>

        <Heading size="sm" color="secondary.400">
          {strings('YOUR_RANK') + ' ' + _getRank(user)}
        </Heading>
      </Stack>
      <EditNameAlertDialog
        user={user}
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
      />
    </>
  );
};

export default MemberCard;
export const util: any = {forEach: null};
