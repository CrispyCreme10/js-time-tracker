const timeTracks = [];
const weeklyTimes = {};

document.addEventListener('DOMContentLoaded', event => {
  const startDatetimeInput = document.querySelector('#start-datetime');
  const endDatetimeInput = document.querySelector('#end-datetime');
  const addRecordBtn = document.querySelector('#add-record');
  const resetDatesBtn = document.querySelector('#reset-dates');

  setStartDateInput(startDatetimeInput);
  setEndDateInput(endDatetimeInput);

  addRecordBtn.addEventListener('click', event => {
    const startDate = new Date(startDatetimeInput.value);
    const endDate = new Date(endDatetimeInput.value);
    if (areDatetimeInputsValid(startDate, endDate)) {
      console.log('valid dates');
      addTimeTrack(startDate, endDate);
    } else {
      console.log('invalid dates');
    }
  });

  resetDatesBtn.addEventListener('click', event => {
    setStartDateInput(startDatetimeInput);
    setEndDateInput(endDatetimeInput);
  });
});

function getInputFormattedDate(datetimeStr) {
  try {
    const date = datetimeStr ? new Date(datetimeStr) : new Date();
    const fullYear = date.getFullYear();
    const month = (m = (date.getMonth() + 1)) < 10 ? `0${m}` : m;
    const day = (d = date.getDate()) < 10 ? `0${d}` : d;
    const hours = (h = date.getHours()) < 10 ? `0${h}` : h;
    const minutes = (m = date.getMinutes()) < 10 ? `0${m}` : m;
  
    return `${fullYear}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    
  }

  return new Date();
}

function setStartDateInput(startDatetimeInput, dateStr) {
  const fmtDate = getInputFormattedDate(dateStr);
  startDatetimeInput.value = fmtDate;
}

function setEndDateInput(endDatetimeInput, dateStr) {
  const fmtDate = getInputFormattedDate(dateStr);
  endDatetimeInput.value = fmtDate;
}

function areDatetimeInputsValid(startDate, endDate) {updateTimeTrack();
  const now = new Date();
  return startDate < endDate
}

function addTimeTrack(startDate, endDate) {
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();
  console.log(endTime - startTime)

  addTrack({
    startDate: startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString(),
    endDate: endDate.toLocaleDateString() + ' ' + endDate.toLocaleTimeString(),
    timeElapsed: convertMStoHHMM(endTime - startTime)
  })
}

function convertMStoHHMM(ms) {
  const seconds = ms / 1000;

  const hours = Math.floor(seconds / 3600);
  const minutes = seconds / 60 - hours * 60;

  const fmtHours = hours < 10 ? `0${hours}` : hours;
  const fmtMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${fmtHours}:${fmtMinutes}`;
}

function addTrack(timeTrack) {
  timeTracks.push(timeTrack);
  updateTimeTrack();
  updateWeeklyTimes();
}

function removeTimeTrack() {
  updateTimeTrack();
  updateWeeklyTimes();
}

function updateTimeTrack() {
  const timeTracksParent = document.querySelector('#time-tracks > tbody');
  timeTracksParent.innerHTML = '';

  timeTracks.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate)
  })

  for (const timeTrack of timeTracks) {
    const tr = document.createElement('tr');
    const startTimetd = document.createElement('td');
    const endTimetd = document.createElement('td');
    const timeElapsedtd = document.createElement('td');

    startTimetd.textContent = timeTrack.startDate;
    endTimetd.textContent = timeTrack.endDate;
    timeElapsedtd.textContent = timeTrack.timeElapsed;

    tr.append(startTimetd, endTimetd, timeElapsedtd);
    timeTracksParent.append(tr);
  }
}

function updateWeeklyTimes() {
  // ['yyyy-MM-dd:yyyy-MM-dd']: ...totals
  
}