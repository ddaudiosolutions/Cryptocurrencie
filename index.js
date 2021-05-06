
let xrpP = document.querySelector('#rippleP')
let bitP = document.querySelector('#bitcoinP')
let ethP = document.querySelector('#etherP')

let ripC = document.querySelector('#ripC')
let ripC24 = document.querySelector('#ripC24')
let ripC7d = document.querySelector('#ripC7')

let bitC = document.querySelector('#bitC')
let bitC24 = document.querySelector('#bitC24')
let bitC7d = document.querySelector('#bitC7d')


let ethC1h = document.querySelector('#ethC1h')
let ethC24 = document.querySelector('#ethC24')
let ethC7d = document.querySelector('#ethC7d')




let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ripple%2C%20bitcoin%2C%20ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d';

fetch (url) 
    .then((respuesta) => { respuesta.json()
    .then(cotizacion => datosCotizacion(cotizacion) )
        
    }).catch((err) => {
        console.log(err)
        
    });
    
    
    function datosCotizacion(cotizacion){ 
       //console.log(cotizacion)
    
        let rippleC1h = cotizacion[2].price_change_percentage_1h_in_currency
        rippleC1h = rippleC1h.toFixed(2)

        let rippleC24h = cotizacion[2].price_change_percentage_24h
        rippleC24h = rippleC24h.toFixed(2)

        let rippleC7d = cotizacion[2].price_change_percentage_7d_in_currency
        rippleC7d = rippleC7d.toFixed(2)
        
        

        let bitCC1h = cotizacion[0].price_change_percentage_1h_in_currency
        bitCC1h = bitCC1h.toFixed(2)
        let bitCC24h = cotizacion[0].price_change_percentage_24h
        bitCC24h = bitCC24h.toFixed(2)
        let bitCC7d = cotizacion[0].price_change_percentage_7d_in_currency
        bitCC7d = bitCC7d.toFixed(2)
        
        
        let etherC1h = cotizacion[1].price_change_percentage_1h_in_currency
        etherC1h = etherC1h.toFixed(2)
        let etherCC24h = cotizacion[1].price_change_percentage_24h_in_currency
        etherCC24h = etherCC24h.toFixed(2)
        let etherC7d = cotizacion[1].price_change_percentage_7d_in_currency
        etherC7d = etherC7d.toFixed(2)
        //console.log(etherC7d, etherCC24h, etherC1h)
        

        xrpP.innerHTML = `XRP Price: $${cotizacion[2].current_price}USD`
        bitP.innerHTML = `BTC Price: $${cotizacion[0].current_price}USD`
        ethP.innerHTML = `ETH Price: $${cotizacion[1].current_price}USD`

        ripC.innerHTML = `Price Change (1h): ${rippleC1h}%`;
        ripC24.innerHTML = `Price Change (24h): ${rippleC24h}%`;
        ripC7d.innerHTML = `Price Change (7d): ${rippleC7d}%`;


        bitC.innerHTML =`Price Change (1h): ${bitCC1h}%`;
        bitC24.innerHTML =`Price Change (24h): ${bitCC24h}%`;
        bitC7d.innerHTML =`Price Change (7d): ${bitCC7d}%`;

         ethC1h.textContent = `Price Change (1h): ${etherC1h}%`; 
         ethC24.textContent = `Price Change(24h): ${etherCC24h}%`;
         ethC7d.textContent = `Price Change (7d): ${etherC7d}%`;
        

        if(rippleC1h <0){
            ripC.style.backgroundColor = 'red';
        }else {
            ripC.style.backgroundColor = '#50ce07';
        }

        if(rippleC24h <0){
            ripC24.style.backgroundColor = 'red';
        }else {
            ripC24.style.backgroundColor = '#50ce07';
        }

        if(rippleC7d <0){
            ripC7d.style.backgroundColor = 'red';
        }else {
            ripC7d.style.backgroundColor = '#50ce07';
        }


        if(bitCC24h <0){
            bitC24.style.backgroundColor = 'red';
        }else {
            bitC24.style.backgroundColor = '#50ce07';
        }
        if(bitCC1h <0){
            bitC.style.backgroundColor = 'red';
        }else {
            bitC.style.backgroundColor = '#50ce07';
        }
        if(bitCC7d <0){
            bitC7d.style.backgroundColor = 'red';
        }else {
            bitC7d.style.backgroundColor = '#50ce07';
        }

        if(etherC1h <0){
            ethC1h.style.backgroundColor = 'red';
        }else {
            ethC1h.style.backgroundColor = '#50ce07';
        }
        if(etherCC24h <0){
            ethC24.style.backgroundColor = 'red';
        }else {
            ethC24.style.backgroundColor = '#50ce07';
        }
        if(etherC7d <0){
            ethC7d.style.backgroundColor = 'red';
        }else {
            ethC7d.style.backgroundColor = '#50ce07';
        }

        

    }


    
let urlChart = 'https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=30';

fetch (urlChart) 
    .then((respuesta) => { respuesta.json()
    .then(valores => dataPoints(valores) )
        
    }).catch((err) => {
        console.log(err)
        
    });
    var dataPointsV = []

    function dataPoints (valores){        
        for (let valor of valores.prices){
            let fecha = valor[0]
            let precio = valor[1]
           //console.log(precio)
            dataPointsV.push ({x: new Date(fecha), y: (precio)})

        }
        //console.log(dataPointsV)
        
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light1", // "light1", "light2", "dark1", "dark2"
	    animationEnabled: true,
	    title:{
		text: "Ripple Currency 30d"   
        },
        axisX: {
            interval: 1,
            intervalType: "month",
            //valueFormatString: "DDD, MMM, YY"
        },
        axisY:{
            title: "Price (in USD)",
            includeZero: true,
            //valueFormatString: "$#0"
        },
            data: [{
              
              type: "line",              
              xValueFormatString: "DDD DD, MMM, YYYY",
              yValueFormatString: "$#.##",
              dataPoints: dataPointsV,
            }]
          });
        
          chart.render();
    }


    let urlChartbitcoin = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30';

fetch (urlChartbitcoin) 
    .then((respuesta) => { respuesta.json()
    .then(valoresbtc => dataPointsbtc(valoresbtc) )
        
    }).catch((err) => {
        console.log(err)
        
    });
    var dataPointsVbtc = []

    function dataPointsbtc (valoresbtc){        
        for (let valorbtc of valoresbtc.prices){
            let fecha = valorbtc[0]
            let precio = valorbtc[1]
           //console.log(precio)
           dataPointsVbtc.push ({x: new Date(fecha), y: (precio)})

        }
        //console.log(dataPointsV)
        
        var chartbtc = new CanvasJS.Chart("chartContainerbtc", {
            theme: "light1", // "light1", "light2", "dark1", "dark2"
	    animationEnabled: true,
	    title:{
		text: "Bitcoin Currency 30d"   
        },
        axisX: {
            interval: 1,
            intervalType: "month",
            //valueFormatString: "DDD, MMM, YY"
        },
        axisY:{
            title: "Price (in USD)",
            includeZero: true,
            //valueFormatString: "$#0"
        },
            data: [{
              
              type: "line",              
              xValueFormatString: "DDD DD, MMM, YYYY",
              yValueFormatString: "$#.##",
              dataPoints: dataPointsVbtc,
            }]
          });
        
          chartbtc.render();
    }
       

    //ETHEREUM CHART

    let urlChartEth = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30';

fetch (urlChartEth) 
    .then((respuesta) => { respuesta.json()
    .then(valoreseth => dataPointsEth(valoreseth) )
        
    }).catch((err) => {
        console.log(err)
        
    });
    var dataPointsVeth = []

    function dataPointsEth (valoreseth){        
        for (let valoreth of valoreseth.prices){
            let fecha = valoreth[0]
            let precio = valoreth[1]
           //console.log(precio)
           dataPointsVeth.push ({x: new Date(fecha), y: (precio)})

        }
        //console.log(dataPointsV)
        
        var chartEth = new CanvasJS.Chart("chartContainereth", {
            theme: "light3", // "light1", "light2", "dark1", "dark2"
            animationEnabled: true,
            title:{
            text: "Ethereum Currency 30d"   
            },
        axisX: {
            interval: 1,
            intervalType: "month",
            //valueFormatString: "DDD, MMM, YY"
        },
        axisY:{
            title: "Price (in USD)",
            includeZero: true,
            //valueFormatString: "$#0"
        },
            data: [{
              type: "line",              
              xValueFormatString: "DDD DD, MMM, YYYY",
              yValueFormatString: "$#.##",
              dataPoints: dataPointsVeth,
            }]
          });
        
          chartEth.render();
    }

            
       
    
