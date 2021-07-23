import {Modal, Spinner} from 'native-base';
import * as React from 'react';
type Props = {
  spinnerOverlayIsOpen: boolean;
  setSpinnerOverlayIsOpen: Function;
};
const SpinnerOverlay: React.FC<Props> = ({
  spinnerOverlayIsOpen,
  setSpinnerOverlayIsOpen,
}) => {
  return (
    <Modal
      overlayVisible={true}
      bg="transparent"
      isOpen={spinnerOverlayIsOpen}
      onClose={() => setSpinnerOverlayIsOpen(false)}>
      <Modal.Content maxWidth="400px" bg="transparent">
        <Modal.Header>
          <Spinner color="secondary.400" accessibilityLabel="Finish Card" />
        </Modal.Header>
      </Modal.Content>
    </Modal>
  );
};

export default SpinnerOverlay;
