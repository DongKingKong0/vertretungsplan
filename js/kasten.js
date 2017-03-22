var boxContainer = document.getElementById('kasten-container');
var lastClass = '';
var allClassNames = [];

function updateBox(klasse, raum, fach, stunde, hinweis, art) {
  if (allClassNames.indexOf(klasse) === -1) {
    allClassNames.push(klasse);
  }

  if (!classShouldBeShown(klasse)) {
    return;
  }

  checkIfNewClass(klasse);

  var box = '<div class="kasten';
  box += '">                    \
            <div class="top">                                                           \
                <div class="kasten-fach">                                        \
                    ' +
    fach +
    '                  \
                </div>                                                           \
                <div class="kasten-raum">';
                  if (raum.indexOf('---') === -1) {
                      box += raum;
                  }

  box +='                \
                </div>                                                           \
                <div class="kasten-stunde">                                      \
                    ' +
    stunde +
    '             \
                </div>                                                \
            </div>';
            if (hinweis.length > 2) {
              box += '\
              <div class="middle">                                         \
                '+ hinweis +'                                                \
              </div>';
            }
            box += '\
            <div class="bottom">                          \
              <div class="kasten-art ';
              if (art.indexOf('Ausfall') !== -1) {
                box += ' ausfall';
              } else if (art.indexOf('Vertretung') !== -1) {
                box += ' vertretung';
              }
              box += '">                                     \
                  ' +
    art +
    '           \
              </div>                                                           \
            </div>                                         \
        </div>                                                               \
        ';

  boxContainer.innerHTML += box;
}

function updateBoxClass(schoolClass) {
  var box = '\
    <div class="kasten klasse">\
      <p>' +
    schoolClass +
    '</p>\
    </div>\
  ';

  boxContainer.innerHTML += box;
}

function updateBoxDate(date) {
  var box = '\
    <div class="kasten date">\
      <p>' +
    date +
    '</p>\
    </div>\
  ';

  boxContainer.innerHTML += box;
}

function classShouldBeShown(schoolClass) {
  var klasseShouldBeShown = parameters['klasse'] == undefined ||
    parameters['klasse'] == '' ||
    parameters['klasse'] === schoolClass;

  var klassenstufeShouldBeShown = parameters['klassenstufe'] == undefined ||
    parameters['klassenstufe'] == '' ||
    schoolClass.includes(parameters['klassenstufe']);

  return (klasseShouldBeShown && klassenstufeShouldBeShown);
}

function checkIfNewClass(schoolClass) {
  if (schoolClass != lastClass) {
    updateBoxClass(schoolClass);
  }

  lastClass = schoolClass;
}
//updateKasten("11a", "2.209", "BIO", "5", "Ausfall", "Ausfall");
