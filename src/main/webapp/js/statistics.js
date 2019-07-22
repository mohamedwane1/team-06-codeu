// load Charts and the corechart package.
google.charts.load('current', {'packages': ['corechart']});

// Draw the pie chart  for racial distribution of abortions
google.charts.setOnLoadCallback(drawRaceChart);

// Draw the pie chart for when abortions typically occur
google.charts.setOnLoadCallback(drawWhenChart);

// Draw the column chart for the cost of an abortion
google.charts.setOnLoadCallback(drawCostChart);

// Draw the column chart for the length of an abortion
google.charts.setOnLoadCallback(drawLengthChart);

//Draw the geochart for the Laws & Policies of abortion
google.charts.load('current', {'packages'  : ['geochart'],
'mapsApiKey': 'AIzaSyBe07-CG9ZcJEpo70rVTDKxsWU-KhFEl9k'
});
google.charts.setOnLoadCallback(drawLawMap);

function drawRaceChart() {
  var raceData = google.visualization.arrayToDataTable([
    ['Ethnic background' , 'Percentage'],
    ['White', 39],
    ['Black', 28],
    ['Hispanic', 25],
    ['Asian/Pacific Islander', 6],
    ['Other', 3]
  ]);
  var raceOptions = {
    title: 'Diversity Of U.S Abortion Patients',
    backgroundColor: 'transparent',
    pieHole: 0.4
  };
  var raceChart = new google.visualization.PieChart(document.getElementById('raceChart'));
  raceChart.draw(raceData, raceOptions);
}

// Callback that draws the pie chart for when abortions typically occur
function drawWhenChart() {
  var whenData = google.visualization.arrayToDataTable([
    ['Weeks of Gestation' , 'Percentage'],
    ['6 weeks or less', 34.2],
    ['7-9 weeks', 40],
    ['10-12 weeks', 13.8],
    ['13-15 weeks', 6.3],
    ['16-20 weeks', 4.1],
    ['21 weeks or more', 1.3]
  ]);
  var whenOptions = {
    title: 'When Do Abortions Typically Occur? (by weeks of pregnancy)',
    is3D: true,
    backgroundColor: 'transparent'

  };
  var whenChart = new google.visualization.PieChart(document.getElementById('whenChart_3D'));
  whenChart.draw(whenData, whenOptions);
}

// procedures charts
function drawCostChart() {
  // cost of procedure
  fetch("/costChart")
  .then((response) => {
    return response.json();
  })
  .then((costJson) => {
    var costData = new google.visualization.DataTable();
    costData.addColumn('string', 'Procedure');
    costData.addColumn('number', 'Average Cost (in USD)');

    for (i = 0; i < costJson.length; i++) {
      costRow = [];
      var procedure = costJson[i].procedure;
      var cost = costJson[i].cost;
      costRow.push(procedure, cost);
      costData.addRow(costRow);
    }
    var costOptions = {
      title: 'Cost of Abortion procedures',
      width: 800, height: 500,
      backgroundColor: 'transparent',
      animation: {
        duration: 1500,
        "startup": true
      }
    };
  var costChart =
  new google.visualization.ColumnChart(document.getElementById('cost_chart'));
  costChart.draw(costData, costOptions);
  });
}

function drawLengthChart() {
  // length of procedure
  fetch("/lengthChart")
  .then((response) => {
    return response.json();
  })
  .then((lengthJson) => {
    var lengthData = new google.visualization.DataTable();
    lengthData.addColumn('string', 'Procedure');
    lengthData.addColumn('number', 'Average length (in minutes)');

    for (i = 0; i < lengthJson.length; i++) {
      lengthRow = [];
      var procedure = lengthJson[i].procedure;
      var length = lengthJson[i].length;
      lengthRow.push(procedure, length);
      lengthData.addRow(lengthRow);
    }
    var lengthOptions = {
      title: 'Length of Abortion procedures',
      width: 800, height: 500,
      backgroundColor: 'transparent',
      animation: {
        duration: 1500,
        "startup": true
      }
    };
  var lengthChart =
  new google.visualization.ColumnChart(document.getElementById('length_chart'));
  lengthChart.draw(lengthData, lengthOptions);
  });
}



function drawLawMap() {
var legalData = new google.visualization.DataTable();
legalData.addColumn('string', 'State');
// Use custom HTML content for the domain tooltip.
legalData.addColumn('number', 'Legal up to: ');
legalData.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
legalData.addRows([
  ['Alabama', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg',
   'All abortions are considered illegal unless it\'s determined to be necessary to prevent a serious health risk to the unborn child\'s mother.')],
  ['Alaska', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Alaska.svg',
   'All abortions are considered illegal unless performed before fetus heartbeat is detected.')],
  ['Arizona', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg',
  'All abortions are considered a felony unless performed to save the life of the mother.')],
  ['Arkansas', 18, createCustomHTMLContent(18, 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
  'Abortions are illegal after the period of quickening, which usually occurs between 16 to 20 weeks into pregnancy.')],
  ['California', 24, createCustomHTMLContent(24,'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg', 'none')],
  ['Colorado', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colorado_designed_by_Andrew_Carlisle_Carson.svg',
  'Females under 18 must get the permission of at least one parent, guardian, or other adult relative she lives with before getting an abortion.')],
  ['Connecticut', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/9/96/Flag_of_Connecticut.svg',
  'Minors (persons less than 16 years) must be provided with information and counseling and then sign and date standard form (unless medical emergency).')],
  ['Delaware', 20, createCustomHTMLContent(20, 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Flag_of_Delaware.svg',
   'Abortions are considered illegal unless continuation of pregnancy would result in death or injury to mother;' +
   'mental and/or physical retardation of child or pregnancy result of rape or incest or unlawful sexual intercourse.')],
  ['Florida', 18, createCustomHTMLContent(18, 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
  'Third trimester abortions are considered illegal unless performed to preserve the health of the mother.')],// *restrictions apply
  ['Georgia', 20, createCustomHTMLContent(20, 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Georgia_%28U.S._state%29.svg',
   'After 2nd trimester, a physician and 2 consulting physicians must certify it is necessary to preserve life or health of mother.')],
  ['Hawaii', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Hawaii.svg',
  'Abortions are considered illegal unless performed before fetus hearbeat is detected ')],
  ['Idaho', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_Idaho.svg',
   'In the third trimester, an abortion is only lawful if necessary to preserve the life of the pregnant woman or the fetus.')],
  ['Illinois', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Illinois.svg',
  'Abortions can be performed after viability only if necessary to protect the health or life of the pregnant woman.')],
  ['Indiana', 14, createCustomHTMLContent(14, 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Flag_of_Indiana.svg',
   'Abortions can be performed after viability only if necessary to protect the health or life of the pregnant woman.')],
  ['Iowa', 20, createCustomHTMLContent(20, 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Iowa.svg',
  'Abortions can be performed after viability only if necessary to protect the health or life of the pregnant woman.')],
  ['Kansas', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Kansas.svg',
  'Abortions can be performed after viability only if necessary to protect the health or life of the pregnant woman.')],
  ['Kentucky', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Flag_of_Kentucky.svg',
   'Abortion is permissible during the first trimester. After viability of the fetus, it’s legal only if necessary to preserve life or health of the woman.')],
  ['Louisiana', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_Louisiana.svg',
  'All abortions are considered illegal unless performed before fetus heartbeat is detected.')],
  ['Maine', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Maine.svg',
   'Before viability, an abortion performed by a physician is lawful. After viability, only abortions necessary to preserve life or health of mother are permitted.')],
  ['Maryland', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Maryland.svg',
   'Performed before fetus is viable or at anytime where termination procedure is necessary to protect life, health of woman or fetus is affected by serious genetic defect/abnormality. ')],
  ['Massachusetts', 24, createCustomHTMLContent(24,'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Massachusetts.svg', 'none')],
  ['Michigan', 20, createCustomHTMLContent(20, 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Michigan.svg',
   'Unlawful except to save the life of a mother endangered by physical illness, physical injury, or physical disorder when no other medical procedure will suffice.')],
  ['Minnesota', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Minnesota.svg',
  'After viability (second half of gestation), must be performed in hospital and necessary to preserve life and health of mother.')],
  ['Mississippi', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Stennis-flag-Mississippi-proposal.svg',
   'unmarried woman under 18 must have written consent of both parents, with exceptions for medical emergency or judicial waiver.')],
  ['Missouri', 21, createCustomHTMLContent(21,'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Missouri.svg',
  'Abortions are considered illegal after 21 weeks and 6 days from date of conception (except if the woman\'s life or health is threatened).')],
  ['Montana', 6, createCustomHTMLContent(6,'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_Montana.svg',
   'Abortions are considered illegal after viability, unless necessary to preserve life or health of mother.')],
  ['Nebraska', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Nebraska.svg',
  'legal before viability, or if woman is victim of abuse or neglect, or if the M.D. has certification in writing that the continued pregnancy is a threat to woman\'s life/health.')],
  ['Nevada', 24, createCustomHTMLContent(24,'https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Nevada.svg',
   'Only within first 24 weeks unless necessary to preserve life, health of mother.')],
  ['New Hampshire', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_New_Hampshire.svg', 'none')],
  ['New Jersey', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/c/ca/New_Jersey_state_flag.png', 'none')],
  ['New Mexico', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_New_Mexico.svg', 'none')],
  ['New York', 24, createCustomHTMLContent(24,'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_York.svg',
   'Only legal if necessary to preserve the mother\'s health or if the fetus doesn\'t have a heartbeat.')],
  ['North Carolina', 20, createCustomHTMLContent(20, 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_North_Carolina.svg',
  'after 20 weeks, must be substantial risk that would threaten life, health of mother.')],
  ['North Dakota', 12, createCustomHTMLContent(12,'https://upload.wikimedia.org/wikipedia/commons/e/ee/Flag_of_North_Dakota.svg',
  'Illegal after viability unless procedure is necessary to preserve life of mother or continuance would impair her physical or mental health.')],
  ['Ohio', 6, createCustomHTMLContent(6, 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Ohio.svg',
   'Illegal once fetus heartbeat is detected unless to prevent the death or serious bodily injury of the pregnant woman.')],
  ['Oklahoma', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Oklahoma.svg',
   'Illegal After viability, unless necessary to preserve life or health of mother.')],
  ['Oregon', 24, createCustomHTMLContent(24,'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Oregon.svg', 'none')],
  ['Pennsylvania', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Pennsylvania.svg',
  'A woman must receive state-directed counseling that includes information designed to discourage her from having an abortion and then wait 24 hours before the procedure.' +
  'Public funding is available for abortion only in cases of life endangerment, rape or incest.')],
  ['Rhode Island', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Rhode_Island.svg',
   'Patients under the age of 18 must get the written consent of at least one parent')],
  ['South Carolina', 20, createCustomHTMLContent(20, 'https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_South_Carolina.svg',
   'Illegal In the third trimester except when necessary to preserve the life or health of the pregnant woman on the written recommendation of two doctors.')],
  ['South Dakota', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_South_Dakota.svg',
  'Legal only to preserve life or health of the mother in third trimester.')],
  ['Tennessee', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Tennessee.svg',
  'After viability, only if necessary to preserve life or health of mother.')],
  ['Texas', 20, createCustomHTMLContent(20, 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
  'Abortion during third trimester of viable child permissible only if necessary to prevent death or substantial risk of serious' +
  'impairment to woman\'s physical or mental health, or if fetus has severe and irreversible abnormality.')],
  ['Utah', 18, createCustomHTMLContent(18, 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Utah.svg',
  'individuals seeking abortions must wait 72 hours after being given informed consent of the abortion procedure to actually have the procedure done.')],
  ['Vermont', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Vermont.svg',
  'none. It is legal for an abortion to be performed in Vermont at any stage of pregnancy for any reason or for no reason.')],
  ['Virginia', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Virginia.svg',
  'Illegal in the third trimester, unless continuation of pregnancy likely to result in death, physical or mental impairment of mother')],
  ['Washington', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Washington.svg', 'none')],
  ['West Virginia', 24, createCustomHTMLContent(24, 'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_West_Virginia.svg',
  'State abortion statutes require notification of one parent prior to an abortion, and a mandatory 24-hour waiting period during which a woman must also receive counseling and a notification of services.')],
  ['Wisconsin', 21, createCustomHTMLContent(21, 'https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_Wisconsin.svg',
  'All abortions are considered illegal unless necessary to save life of mother or advised by two other M.D.s as necessary')],
  ['Wyoming', 24, createCustomHTMLContent(24,'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Wyoming.svg',
   'Illegal after viability, unless necessary to preserve health, life of mother according to appropriate medical judgment')]
]);

var legalOptions = {
  focusTarget: 'category',
  tooltip: { isHtml: true },
  sizeAxis: { minValue: 0, maxValue: 24},
  region: 'US',
  displayMode: 'regions',
  colorAxis: {colors: ['#ff3b5c','c644a6', '#4f4fff']},
  backgroundColor: '#81d4fa',
  datalessRegionColor: 'white',
  defaultColor: '#f8bbd0',
  resolution: 'provinces',
};
var legalChart = new google.visualization.GeoChart(
  document.getElementById('legal_chart'));
  legalChart.draw(legalData, legalOptions);
}

function createCustomHTMLContent(weeksOfLegality, flagURL, restrictions){
return '<div style="width: 100px">' +
'<img src="' + flagURL + '" style="width:75px;height:50px"; text-align: center><br/>' +
'<b>Legal  up to: </b><br>' + weeksOfLegality + ' weeks<br>' +
'<b>Restrictions: </b><br>' + restrictions;
}
