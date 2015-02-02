'use strict';


var Immutable = require('immutable'),
  t = require('transducers.js');


var chromaticKeys = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];


function chordsToBars(chords, key) {
  // Return a new list of chords having a max duration of 1, and grouping chords having a duration < 1 bar
  // into the same bar.
  // Duplicate a chord if its duration is greater than a bar, as many times as needed.
  // The returned list is a list of lists.
  var sum = (a, b) => a + b;
  var bars = [];
  var barChords = [];
  chords.forEach((chord, idx) => {
    var immutableNewChord = Immutable.Map(chord).merge({
      referenceIndex: idx,
      rendered: renderChord(chord, key),
    });
    if (chord.duration > 1) {
      var remainingDuration = chord.duration;
      while (remainingDuration > 0) {
        bars.push([immutableNewChord.set('duration', 1).toObject()]);
        remainingDuration -= 1;
      }
      if (remainingDuration > 0) {
        barChords.push(immutableNewChord.set('duration', remainingDuration).toObject());
      }
    } else {
      barChords.push(immutableNewChord.toObject());
    }
    if (barChords.length) {
      var barChordsDurationSum = t.transduce(barChords, t.map((chord) => chord.duration), t.transformer(sum), 0);
      if (barChordsDurationSum >= 1) {
        bars.push(barChords);
        barChords = [];
      }
    }
  });
  return bars;
}


function renderChord(chord, key) {
  var chartKeyIndex = chromaticKeys.indexOf(key);
  var chordStr = chromaticKeys[(chartKeyIndex + chord.degree) % chromaticKeys.length];
  if (chord.alterations) {
    chordStr += chord.alterations.join();
  }
  return chordStr;
}


module.exports = {chordsToBars, chromaticKeys, renderChord};
