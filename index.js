
let moneda1 = document.getElementById('moneda1');
let moneda2 = document.getElementById('moneda2')
let moneda3 = document.getElementById('moneda3')

let m1P = document.querySelector('#m1P')


let m1C = document.querySelector('#m1C')
let m1C24 = document.querySelector('#m1C24')
let m1C7d = document.querySelector('#m1C7')





//LISTAR LAS OPCIONES DE MONEDAS SELECCIONADAS.
let listadoMonedas = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
//console.log(listadoMonedas)

  fetch (listadoMonedas) 
      .then((respuesta) => { respuesta.json()
      .then(monedas => listarMonedas(monedas) ) 
      }).catch((err) => {
          console.log(err)
          
      });

  function listarMonedas (monedas){
    for (moneda of monedas){
      //console.log (moneda.id)
      let opcion = document.createElement('option')
      opcion.value = moneda.id
      opcion.innerText = moneda.id.toUpperCase()
      moneda1.appendChild(opcion)
    }
    
  }

function seleccionMoneda1(){
  
    let url1 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${moneda1.value}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    
  fetch (url1) 
    .then((respuesta) => { respuesta.json()
    .then(cotizacion1 => datosCotizacion(cotizacion1) ) 
    }).catch((err) => {
        console.log(err)
        
    });

    let moneda1Gr = moneda1.value
    grafico1(moneda1Gr);

  

}

 
    function datosCotizacion(cotizacion1){         
        limpiarhtml()

       const logo = document.querySelector('#logo')
       const linkLogo = document.createElement('img')
       linkLogo.src = cotizacion1[0].image
       linkLogo.setAttribute("width", '50px')
       linkLogo.style.marginTop = '10px'
       logo.appendChild(linkLogo)

        const rotulo1 = document.querySelector('#moneda1Rotulo')
        rotulo1.innerText = cotizacion1[0].id.toUpperCase()
    
        let moneda1C1h = cotizacion1[0].price_change_percentage_1h_in_currency
        moneda1C1h = moneda1C1h.toFixed(2)

        let moneda1C24h = cotizacion1[0].price_change_percentage_24h
        moneda1C24h = moneda1C24h.toFixed(2)

        let moneda1C7d = cotizacion1[0].price_change_percentage_7d_in_currency
        moneda1C7d = moneda1C7d.toFixed(2)

        let moneda = cotizacion1[0].id.toUpperCase()
        
        m1P.innerHTML = `${moneda} Price: $${cotizacion1[0].current_price}USD`
        m1C.innerHTML = `Price Change (1h): ${moneda1C1h}%`;
        m1C24.innerHTML = `Price Change (24h): ${moneda1C24h}%`;
        m1C7d.innerHTML = `Price Change (7d): ${moneda1C7d}%`;
        
        if(moneda1C1h <0){
          m1C.style.backgroundColor = 'red';
        }else {
          m1C.style.backgroundColor = '#50ce07';
        }

        if(moneda1C24h <0){
            m1C24.style.backgroundColor = 'red';
        }else {
            m1C24.style.backgroundColor = '#50ce07';
        }

        if(moneda1C7d  <0){
            m1C7d.style.backgroundColor = 'red';
        }else {
            m1C7d.style.backgroundColor = '#50ce07';
        }

      }

      //LIMPIAR HTML
      function limpiarhtml()
      {
        while (logo.firstChild){
            logo.removeChild(logo.firstChild);
        }
      }
      
      //LIMPIAR CHARTJS CANVAS PARA EVITAR SUPERPOSICIÓN DE GRÁFICOS
      var in_canvas = document.getElementById('chartcontainer'); 

      function limpiarChart(){
        //remove canvas if present
        while (in_canvas.firstChild) {
          in_canvas.removeChild(in_canvas.firstChild);
          } 
      }

      //GRAFICO MONEDA 1
     
      function grafico1(moneda1Gr) {
       
       limpiarChart() 

       let urlchart1 = `https://api.coingecko.com/api/v3/coins/${moneda1Gr}/market_chart?vs_currency=usd&days=30`;
        
      
        fetch (urlchart1) 
          .then((respuesta) => {respuesta.json()      
          .then(valores => dataPoints(valores) )        
          }).catch((err) => {
              console.log(err)
              
          });
          var dataPointsV = []
          var dataSetTime = []
          function dataPoints (valores){        
             
              for (let i=0; i<valores.prices.length; i++){
                  let fecha = valores.prices[i][0]
                  let fechas = new Date (fecha)
                  let myDate = (fechas.getUTCDate()) +  "/" + (fechas.getMonth() + 1);
                  dataSetTime.push(myDate)
                  //console.log(dataSetTime)
              }
              for (let i=0; i<valores.prices.length; i++){
                 // let fecha = valores.prices[i][0]
                  let precio = valores.prices[i][1]
                  dataPointsV.push({ y: (precio)})
                  //console.log(fecha + ' ' + precio)
              }
              
              
              var colors = ['#007bff','#0097fc','#333333','#c3e6cb','#dc3545','#ed872d']; 
       
              //var chLine2 = document.querySelector("#chLine2");   
                
            
            //insert canvas
                var newCanvas = document.createElement('canvas');                
                newCanvas.id = "chLine2";                
                in_canvas.appendChild(newCanvas);
              
      
              var chartData = {
               labels:  dataSetTime,
               datasets: [{
                  data: dataPointsV,
                  backgroundColor: 'transparent',
                  borderColor: colors[1],
                  borderWidth: 2,
                  pointBackgroundColor: colors[3],
                      pointStyle: 'dash'
              }]              
              };

              
              /* large line chart */
               if(chLine2) {       
              new Chart(chLine2, {
              type: 'line',
              data: chartData,
              options: {
                elements:{
                  point:{
                    radius: 0
                  }
                },
                scales: {
                yAxes: [{
                    ticks: {
                      //suggestedMax: maxWind + 2, 
                    beginAtZero: true,
                    stepSize: 0.5,
                    maxTicksLimit: 12
                    }
                }],
                xAxes:[{
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12            
                  }
                }]
                },
                legend: {
                display: false
                }
            }
              });
              
          }   
          }
      
    }
        
      
      

       
       
        

        


       

        

    







