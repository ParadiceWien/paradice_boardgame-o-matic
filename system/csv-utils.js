/**
 * Parst ein Key/Value-CSV im Paradice-Stil:
 * "ID";"123";
 * "Name";"Brass";
 * ...
 * → Gibt ein Array von Objekten zurück
 */
function parseKeyValueCSV(csvData) {
  var lines = csvData.split("\n");
  var result = [];
  var obj = {};

  lines.forEach(function(line) {
    // Ignoriere leere Zeilen
    if (line.trim() === "") return;

    // Aufteilen bei ;
    var parts = line.split(";");

    // Müssen mindestens 2 Teile sein
    if (parts.length < 2) return;

    // Entferne Anführungszeichen
    var key = parts[0].replace(/"/g, "").trim();
    var value = parts[1].replace(/"/g, "").trim();

    // Neues Objekt starten bei neuem "ID"
    if (key === "ID" && Object.keys(obj).length > 0) {
      result.push(obj);
      obj = {};
    }

    obj[key] = value;
  });

  // Letztes Objekt anhängen, wenn es eins gibt
  if (Object.keys(obj).length > 0) {
    result.push(obj);
  }

  return result;
}
