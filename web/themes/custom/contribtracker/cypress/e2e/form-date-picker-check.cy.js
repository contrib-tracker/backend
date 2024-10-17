// Describe the test suite for Date Picker Validation with Random Date Selection
describe('Date Picker Filter Validation with Random Date Selection', () => {
  // Before running the test, visit the base URL
  before(() => {
    cy.visit('/');
  });

  it('should show correct results based on the selected random date range', () => {
    // Generate min and max dates for the test within the specified range
    const { minDate, maxDate } = getMinMaxDates('2023-01-01', '2023-12-31');
    cy.log(`Min Date: ${minDate.formatted}`);
    cy.log(`Max Date: ${maxDate.formatted}`);

    // Set the minimum date in the date picker
    setDate('[class*="date-value-min"] .bef-datepicker', minDate.formatted);

    // Set the maximum date in the date picker
    setDate('[class*="date-value-max"] .bef-datepicker', maxDate.formatted);

    // Click the filter button to apply the date range
    cy.get('#edit-submit-all-contributions')
      .should('have.value', 'Apply')
      .click();

    // Validate that displayed results fall within the selected date range
    cy.get('.contrib__card_date').each(($dateElement) => {
      // Extract the day and month-year text from the displayed date
      const dayText = $dateElement
        .find('.contrib__card_date__day')
        .text()
        .trim();
      const monthYearText = $dateElement
        .find('.contrib__card_date__month--year')
        .text()
        .trim();

      cy.log(`Day text: ${dayText}`);
      cy.log(`Month-Year text: ${monthYearText}`);

      // Parse the displayed date
      const displayedDate = parseDisplayedDate(dayText, monthYearText);
      const minDateObj = new Date(
        Date.UTC(minDate.year, minDate.month - 1, minDate.day)
      );
      const maxDateObj = new Date(
        Date.UTC(maxDate.year, maxDate.month - 1, maxDate.day)
      );

      // Validate that the displayed date falls within the selected date range
      cy.wrap(displayedDate)
        .should('be.gte', minDateObj)
        .and('be.lte', maxDateObj);
    });
  });
});

// Helper function to generate a random date within a specified range
function getRandomDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  // Generate a random date between start and end dates
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  // Format the date components
  const day = `0${randomDate.getUTCDate()}`.slice(-2);
  const month = `0${randomDate.getUTCMonth() + 1}`.slice(-2); // Months are zero-based
  const year = randomDate.getUTCFullYear();
  // Return the date components and the formatted date string
  return { day, month, year, formatted: `${year}-${month}-${day}` };
}

// Function to generate minimum and maximum dates ensuring max date is after min date
function getMinMaxDates(start, end) {
  const minDate = getRandomDate(start, end);
  const minDateObj = new Date(minDate.formatted);
  let maxDate;
  // Ensure max date is always after min date
  do {
    maxDate = getRandomDate(minDate.formatted, end);
  } while (new Date(maxDate.formatted) < minDateObj);
  return { minDate, maxDate };
}

// Function to set the date in the date picker
function setDate(selector, date) {
  // Ensure the date picker is visible and ready
  cy.get(selector)
    .should('be.visible')
    .click()
    .clear()
    .type(date)
    .blur();
}

// Function to parse the displayed date from the day and month-year text
function parseDisplayedDate(dayText, monthYearText) {
  // Convert month abbreviation to month number
  const monthMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  
  // Handle unexpected formats or errors in monthYearText
  if (!monthYearText) {
    throw new Error('Month-Year text is missing or empty');
  }

  const [monthAbbr, year] = monthYearText.split(' ');
  const month = monthMap[monthAbbr];

  if (!month) {
    throw new Error(`Invalid month abbreviation: ${monthAbbr}`);
  }

  // Return the parsed date in UTC format
  return new Date(Date.UTC(year, month - 1, dayText));
}
