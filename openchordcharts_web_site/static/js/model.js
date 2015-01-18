'use strict';


var chromaticKeys = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];


function chordsToCells(chords) {
  var sum = (a, b) => a + b;
  var normalizedChords = normalizeChords(chords);
  var cells = [];
  var cellChords = [];
  normalizedChords.forEach((chord) => {
    cellChords.push(chord);
    var cellChordsDurationSum = cellChords.map((chord) => chord.duration).reduce(sum);
    if (cellChordsDurationSum >= 1) {
      cells.push(cellChords);
      cellChords = [];
    }
  });
  return cells;
}


function normalizeChords(chords) {
  // Return a new list of chords having a max duration of 1. Duplicate if greater as many times as needed.
  var normalizedChords = [];
  chords.forEach((chord) => {
    if (chord.duration > 1) {
      var remainingDuration = chord.duration;
      while (remainingDuration > 0) {
        normalizedChords.push({alterations: chord.alterations, degree: chord.degree, duration: 1}); // TODO shallow copy
        remainingDuration -= 1;
      }
      if (remainingDuration > 0)
      normalizedChords.push({alterations: chord.alterations, degree: chord.degree, duration: remainingDuration}); // TODO shallow copy
    } else {
      normalizedChords.push(chord);
    }
  });
  return normalizedChords;
}

module.exports = {chordsToCells, chromaticKeys, normalizeChords};
