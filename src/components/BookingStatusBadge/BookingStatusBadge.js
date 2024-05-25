import React from 'react';
import { Badge } from 'native-base';
import { BOOKING_STATUS_LABEL } from '../../constants/constants';

function BookingStatusBadge({ bookingStatus }) {
  const colorSchemesMapping = {
    upcoming: 'info',
    canceled: 'error',
    completed: 'success',
  };

  const colorScheme = colorSchemesMapping[bookingStatus]

  return (
    <Badge variant="subtle" colorScheme={colorScheme}>
      {BOOKING_STATUS_LABEL[bookingStatus]}
    </Badge>
  );
}

export default BookingStatusBadge;
