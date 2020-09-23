import moment from 'moment';

export const calcYearsOfExperience = (workExperience) => {
  let totalExpDays = 0, expInYears = 0;
  workExperience.forEach(_workEx => {
    let startDate = moment(_workEx.start_date.toDate());
    let endDate = moment(_workEx.end_date ? _workEx.end_date.toDate() : new Date());
    totalExpDays += endDate.diff(startDate, 'days');
  });

  expInYears = (totalExpDays / 365).toFixed(1);
  return expInYears;
}