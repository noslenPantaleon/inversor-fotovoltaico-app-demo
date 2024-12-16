type DateFormat = 'dd/mm/yy' | 'mm/dd/yy' | 'yy/mm/dd' | 'dd MMMM - yyyy';

export const formatDate = (
  dateInput: Date | string | number,
  format: DateFormat = 'dd/mm/yy'
): string => {
  try {
    const date = new Date(dateInput);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date input');
    }

    const day = date.getDate().toString().padStart(2, '0');
    const monthIndex = date.getMonth();
    const month = (monthIndex + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const yearShort = year.toString().substr(-2);
    const hour = date.getHours();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = monthNames[monthIndex];

    switch (format) {
      case 'dd/mm/yy':
        return `${day}/${month}/${yearShort}/${hour}`;
      case 'mm/dd/yy':
        return `${month}/${day}/${yearShort}/${hour}`;
      case 'yy/mm/dd':
        return `${yearShort}/${month}/${day}/${hour}`;
      case 'dd MMMM - yyyy':
        return `${day} ${monthName} - ${year}-${hour}`;
      default:
        throw new Error('Unsupported date format');
    }
  } catch (error) {
    console.error('Error in formatDate:', error);
    return 'Invalid date';
  }
};
