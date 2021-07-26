import {AlertDialog, Button, Center} from 'native-base';

import * as React from 'react';
import {strings} from '../../locale/i18n';

type Props = {
  title: string;
  description: string;
  showAlertDialog: boolean;
  setShowAlertDialog: Function;
  okButtonCallback: Function;
  okButtonText: string;
};

const MainAlertDialog: React.FC<Props> = ({
  title,
  description,
  showAlertDialog,
  setShowAlertDialog,
  okButtonText,
  okButtonCallback,
}) => {
  const onClose = () => setShowAlertDialog(false);

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={undefined}
        isOpen={showAlertDialog}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{description}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button colorScheme="primary" onPress={onClose}>
              {strings('CANCEL')}
            </Button>
            <Button
              colorScheme="secondary"
              onPress={() => okButtonCallback()}
              ml={3}>
              {okButtonText}
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};
export default MainAlertDialog;
