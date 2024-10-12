// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCo8OPFkNwVBfNjs6uCNac5GqOeuG83_I0",
    authDomain: "tkt1-15e42.firebaseapp.com",
    databaseURL: "https://tkt1-15e42-default-rtdb.firebaseio.com",
    projectId: "tkt1-15e42",
    storageBucket: "tkt1-15e42.appspot.com",
    messagingSenderId: "722983577274",
    appId: "1:722983577274:web:e2af233816a09415d60483",
    measurementId: "G-D7QB571J6M",
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Function to update data in real-time
  function getObjectTemp(callback) {
    const dataRef = database.ref("sensor/objectTemp");
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  }
  
  function getHearRate(callback) {
    const dataRef = database.ref("sensor/heartRate");
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  }
  
  function getSpO2(callback) {
    const dataRef = database.ref("sensor/spO2");
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  }
  
  // Function to show the image when the value is updated
  function showImage(id, imgSrc) {
    const img = document.getElementById(id).querySelector('img');
    img.src = imgSrc;
    img.style.display = 'inline'; // Show the image
  }
  
  // Highcharts and value updates
  var chartA = new Highcharts.Chart({
    chart: { renderTo: "chart-body" },
    title: { text: "Nhiệt độ cơ thể" },
    series: [{ showInLegend: false, data: [] }],
    plotOptions: { line: { animation: false, dataLabels: { enabled: true } } },
    xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M:%S" } },
    yAxis: { title: { text: "Temperature (Ambient)" } },
    credits: { enabled: false },
  });
  
  // Add new data points to the chart and display the image
  setInterval(function () {
    getObjectTemp((temperature) => {
      var x = new Date().getTime(),
        y = temperature;
      y = parseFloat(y.toFixed(1));
      if (chartA.series[0].data.length >= 10) {
        chartA.series[0].addPoint([x, y], true, true, true);
      } else {
        chartA.series[0].addPoint([x, y], true, false, true);
      }
      document.querySelector("#temperature p span").textContent = y + " °C";
      // Show the image when temperature is updated
      showImage("temperature", "image/t.png");
    });
  }, 3000);
  
  var chartB = new Highcharts.Chart({
    chart: { renderTo: "chart-heartRate" },
    title: { text: "Nhịp tim (HR)" },
    series: [{ showInLegend: false, data: [] }],
    plotOptions: { line: { animation: false, dataLabels: { enabled: true } } },
    xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M:%S" } },
    yAxis: { title: { text: "BPM" } },
    credits: { enabled: false },
  });
  
  // Add new data points to the chart and display the image
  setInterval(function () {
    getHearRate((heartRate) => {
      var x = new Date().getTime(),
        y = heartRate;
      y = parseFloat(y.toFixed(1));
      if (chartB.series[0].data.length >= 10) {
        chartB.series[0].addPoint([x, y], true, true, true);
      } else {
        chartB.series[0].addPoint([x, y], true, false, true);
      }
      document.querySelector("#heartRate p span").textContent = y + " BPM";
      // Show the image when heart rate is updated
      showImage("heartRate", "image/tim.png");
    });
  }, 3000);
  
  var chartC = new Highcharts.Chart({
    chart: { renderTo: "chart-spo2" },
    title: { text: "Nồng độ oxi trong máu (SpO2)" },
    series: [{ showInLegend: false, data: [] }],
    plotOptions: { line: { animation: false, dataLabels: { enabled: true } } },
    xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M:%S" } },
    yAxis: { title: { text: "%" } },
    credits: { enabled: false },
  });
  
  // Add new data points to the chart and display the image
  setInterval(function () {
    getSpO2((spo2) => {
      var x = new Date().getTime(),
        y = spo2;
      y = parseFloat(y.toFixed(1));
      if (chartC.series[0].data.length >= 10) {
        chartC.series[0].addPoint([x, y], true, true, true);
      } else {
        chartC.series[0].addPoint([x, y], true, false, true);
      }
      document.querySelector("#spo2 p span").textContent = y + " %";
      // Show the image when SpO2 is updated
      showImage("spo2", "image/spo2.png");
    });
  }, 3000);
  