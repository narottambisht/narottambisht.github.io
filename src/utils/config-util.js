import moment from 'moment';

export const calcYearsOfExperience = (workExperience) => {
  let totalExpDays = 0, expInYears = 0;
  workExperience.forEach(_workEx => {
    let startDate = moment(_workEx.start_date.toDate());
    let endDate   = moment(_workEx.end_date ? _workEx.end_date.toDate() : new Date());
    totalExpDays += endDate.diff(startDate, 'days');
  });

  expInYears = (totalExpDays / 365).toFixed(1);
  return expInYears;
}

export const particleJsConfig = {
  "particles"    : {
    "number"     : {
      "value"  : 160,
      "density": {
        "enable": false
      }
    },
    "size"       : {
      "value" : 3,
      "random": true,
      "anim"  : {
        "speed"   : 4,
        "size_min": 0.3
      }
    },
    "line_linked": {
      "enable": false
    },
    "move"       : {
      "random"   : true,
      "speed"    : 1,
      "direction": "top",
      "out_mode" : "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode"  : "bubble"
      },
      "onclick": {
        "enable": true,
        "mode"  : "repulse"
      }
    },
    "modes" : {
      "bubble" : {
        "distance": 250,
        "duration": 2,
        "size"    : 0,
        "opacity" : 0
      },
      "repulse": {
        "distance": 400,
        "duration": 4
      }
    }
  }
  // "particles": {
  //   "number": {
  //     "value": 50
  //   },
  //   "size": {
  //     "value": 3
  //   },
  //   "color": "#000"
  // },
  // "interactivity": {
  //   "events": {
  //     "onhover": {
  //       "enable": true,
  //       "mode": "repulse"
  //     }
  //   }
  // }
}