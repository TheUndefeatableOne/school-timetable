// Store teachers and classes
let teachers = [];
let classes = [];

// Handle teacher profile form submission
document.getElementById('teacher-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  let name = document.getElementById('teacher-name').value;
  let subject = document.getElementById('teacher-subject').value;
  let grades = document.getElementById('teacher-grades').value.split(',');

  let teacher = { name, subject, grades };
  teachers.push(teacher);

  document.getElementById('teacher-list').innerHTML += `<p>${name} teaches ${subject} for grades: ${grades.join(', ')}</p>`;

  // Clear form
  document.getElementById('teacher-form').reset();
});

// Handle class and section form submission
document.getElementById('class-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  let grade = document.getElementById('grade-name').value;
  let section = document.getElementById('section-name').value;

  let schoolClass = { grade, section };
  classes.push(schoolClass);

  document.getElementById('class-list').innerHTML += `<p>Grade ${grade}, Section ${section}</p>`;

  // Clear form
  document.getElementById('class-form').reset();
});

// Handle timetable generation
document.getElementById('timetable-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let periods = parseInt(document.getElementById('periods').value);
  let weekdays = parseInt(document.getElementById('weekdays').value);
  let classFrequency = parseInt(document.getElementById('class-frequency').value);

  // Logic to generate the timetable
  let timetable = generateTimetable(periods, weekdays, classFrequency);
  displayTimetable(timetable);
});

// Basic timetable generation logic
function generateTimetable(periods, weekdays, classFrequency) {
  let timetable = [];

  classes.forEach(schoolClass => {
    let classTimetable = { grade: schoolClass.grade, section: schoolClass.section, periods: [] };

    for (let day = 0; day < weekdays; day++) {
      let dailyPeriods = [];
      for (let period = 0; period < periods; period++) {
        // Randomly assign a teacher to each period
        let randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
        dailyPeriods.push(`${randomTeacher.name} (${randomTeacher.subject})`);
      }
      classTimetable.periods.push(dailyPeriods);
    }
    timetable.push(classTimetable);
  });

  return timetable;
}

// Display the generated timetable
function displayTimetable(timetable) {
  let result = '<h3>Generated Timetables</h3>';
  timetable.forEach(classTimetable => {
    result += `<h4>Grade ${classTimetable.grade}, Section ${classTimetable.section}</h4>`;
    classTimetable.periods.forEach((day, index) => {
      result += `<p>Day ${index + 1}: ${day.join(', ')}</p>`;
    });
  });
  document.getElementById('timetable-result').innerHTML = result;
}

