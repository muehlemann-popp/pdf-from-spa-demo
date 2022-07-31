function printMe() {
  // Provide the Base-URL for relative links
  const baseElement = document.createElement("base");
  baseElement.setAttribute('href', window.location.protocol + '//' + window.location.host)
  document.getElementsByTagName('head')[0].appendChild(baseElement)

  // We have to replace the Canvas with the corresponding PNG image
  const ctx = document.getElementById('myChart');
  const imgData = ctx.toDataURL("image/png")
  const img = document.createElement('img')
  img.setAttribute('src', imgData)
  ctx.parentNode.replaceChild(img, ctx)

  // We send the full HTML code to the server
  var htmlSource = document.documentElement.outerHTML;
  axios.post('/get-pdf', {
    htmlSource
  })
    .then(function (response) {
      // Source: https://stackoverflow.com/a/46064696/2454815
      let pdfWindow = window.open("")
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        response.data + "'></iframe>"
      )
      setTimeout(function () {
        pdfWindow.stop()
      }, 1000);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const ctx = document.getElementById('myChart');

function createSampleChart() {
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  })
}

createSampleChart();
