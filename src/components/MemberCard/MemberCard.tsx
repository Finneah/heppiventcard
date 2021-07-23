import {Stack, Heading, HStack} from 'native-base';
import * as React from 'react';

import {strings} from '../../locale/i18n';

import {Stamps, User} from '../../database';
import {StampsModel} from '../../database/Models/StampsModel';
import {UserType} from '../../Helper/Types';
import {isValidUser, _getRank} from '../../Helper/Helper';
import {UserModel} from '../../database/Models/UserModel';

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

  /**
   * @memberof MemberCard
   */

  // function _renderContent() {
  //   return (
  //     <Box border={1} borderRadius="md">
  //       <Stack direction="column" space={4} divider={<Divider />}>
  //         <Heading>{user ? user.name : strings('NAME_PLACEHOLDER')}</Heading>
  //       </Stack>
  //     </Box>
  //     // <CardItem>
  //     //   <Body>
  //     //     <Item
  //     //       // eslint-disable-next-line react-native/no-inline-styles
  //     //       style={{
  //     //         borderColor:
  //     //           user && user.name === ''
  //     //             ? GlobalColors.brandPrimary
  //     //             : 'transparent',
  //     //       }}
  //     //       inlineLabel>
  //     //       <Label style={{color: GlobalColors.brandPrimary}}>
  //     //         {strings('NAME')}
  //     //       </Label>

  //     //       <Input
  //     //         style={styles.nameInput}
  //     //         placeholder={defaultMemberName}
  //     //         placeholderTextColor={GlobalColors.brown}
  //     //         value={user ? user.name : ''}
  //     //         onChangeText={(text) => {
  //     //           /**
  //     //            * @todo update User
  //     //            *
  //     //            */

  //     //           User.update(user.id, {...user, name: text}, true);
  //     //           setUser({...user, name: text});
  //     //         }}
  //     //       />
  //     //     </Item>

  //     //     <Item style={[styles.transparentBorder]} inlineLabel>
  //     //       <Label style={{color: GlobalColors.brandPrimary}}>
  //     //         {strings('RANK')}
  //     //       </Label>
  //     //       <Input
  //     //         disabled
  //     //         style={styles.rankInput}
  //     //         placeholder={strings('RANK_00')}
  //     //         value={_getRank()}
  //     //       />
  //     //     </Item>
  //     //   </Body>
  //     // </CardItem>
  //   );
  // }

  return (
    <Stack
      direction="row"
      px={5}
      justifyContent="space-between"
      alignItems="center">
      <HStack alignItems="center">
        <Heading size="sm">{strings('HELLO') + ' '}</Heading>
        <Heading size="sm">{user?.name ?? ''}</Heading>
      </HStack>

      <Heading size="sm" color="secondary.400">
        {_getRank(user)}
      </Heading>
    </Stack>
  );
};

export default MemberCard;
export const util: any = {forEach: null};
