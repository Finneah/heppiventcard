import {Alert, Box} from 'native-base';

import * as React from 'react';

type Props = {
  status: string;
  title: string;
  description: string;
  showAlert: boolean;
};

export const MainAlert: React.FC<Props> = ({
  status,
  title,
  description,
  showAlert = false,
}) => {
  return showAlert ? (
    <Box safeArea>
      <Alert status={status} w="100%">
        <Alert.Icon />
        <Box flex={1} ml={2}>
          <Alert.Title>{title}</Alert.Title>
          <Alert.Description>{description}</Alert.Description>
        </Box>
      </Alert>
    </Box>
  ) : null;
};
