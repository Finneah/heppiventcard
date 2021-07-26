import {
  AlertDialog,
  Button,
  FormControl,
  Icon,
  Input,
  KeyboardAvoidingView,
  Stack,
} from 'native-base';

import * as React from 'react';
import {UserModel} from '../../database/Models/UserModel';
import {UserType} from '../../Helper/Types';
import {strings} from '../../locale/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
let userModel = new UserModel();
type Props = {
  user: UserType;
  showAlertDialog: boolean;
  setShowAlertDialog: Function;
};

const EditNameAlertDialog: React.FC<Props> = ({
  user,
  showAlertDialog = false,
  setShowAlertDialog,
}) => {
  const onClose = () => setShowAlertDialog(false);
  const inputRef = React.useRef();
  const [name, setName] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);
  React.useEffect(() => {
    setIsInvalid(name.length < 3 || name.length > 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    setIsInvalid(name.length < 3 || name.length > 8);
  }, [name]);
  return showAlertDialog ? (
    <KeyboardAvoidingView>
      <AlertDialog
        leastDestructiveRef={inputRef}
        onClose={onClose}
        isOpen={showAlertDialog}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton
            icon={<Icon color="primary.600" as={<Ionicons name="close" />} />}
          />
          <AlertDialog.Header>
            {strings('CHANGE_NAME_TITLE')}
          </AlertDialog.Header>
          <AlertDialog.Body>
            <FormControl isRequired isInvalid={isInvalid}>
              <Stack mx={4}>
                <Input
                  p={2}
                  placeholder="Anzeigename"
                  ref={inputRef}
                  onChangeText={(text) => {
                    setName(text);
                  }}
                />

                <FormControl.ErrorMessage>
                  {'Mindestens 3 Zeichnen und maximal 8 Zeichnen'}
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              colorScheme="primary"
              ml={3}
              disabled={isInvalid}
              onPress={() => {
                user.name = name;
                userModel.updateUser(user);
                onClose();
              }}>
              {strings('SAVE')}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </KeyboardAvoidingView>
  ) : null;
};

export default EditNameAlertDialog;
