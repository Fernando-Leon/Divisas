var token = "a66ff00a1b88f02c41015ef4e8f2a651f1d6ed74ad1aa2f792f982fbce221da8";//Token API Banxico 
var seriesBilletes = ["SM1471", "SM1472", "SM1478", "SM1479", "SM1480", "SM1481", "SM1482"];
var seriesMonedas = ["SM9", "SM10", "SM11", "SM12", "SM13", "SM14", "SM15", "SM16", "SM17", "SM18", "SM19"];
var urlMonedas = ["5centavos.png", "10centavos.png", "20centavos.png", "50centavos.png", "1peso.png", "2pesos.png", "5pesos.png", "10pesos.png", "20pesos.png", "50pesos.png", "100pesos.png"];
var urlBilletes = ["billete10.jpg", "billete20.png", "billete50.png", "billete100.png", "billete200.png", "billete500.png", "billete1000.png"]
const getValues = async () => {
    let arrM = [];
    let arrB = [];
    for(let i = 0; i < seriesMonedas.length; i++){//Get Info Monedas
        let request = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${seriesMonedas[i]}/datos/oportuno?token=${token}`);
        arrM.push(request.data.bmx.series);
    }
    for(let i = 0; i < seriesBilletes.length; i++){//Get Info Billtes
        let request = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${seriesBilletes[i]}/datos/oportuno?token=${token}`);
        arrB.push(request.data.bmx.series);
    }
    setValues(arrB, arrM);
}

getValues();


const setValues = (arrBilles, arrMonedas) => {
    let container = document.getElementById("container-values");
    let codeHTML = "";
    codeHTML += `<div class="title-items">Monedas</div>`
    for(let i = 0; i < arrMonedas.length; i++){//Push Monedas
        codeHTML += `<div class="item">
                        <div class="title">${arrMonedas[i][0].titulo}.</div>
                        <div class="date">Fecha de corte: ${arrMonedas[i][0].datos[0].fecha}.</div>
                        <div class="stock">Unidades en circulación: ${arrMonedas[i][0].datos[0].dato} millones.</div>
                        <div class="cont-image"><img src="../IMGS/${urlMonedas[i]}"></div> 
                     </div>`
    }
    codeHTML += `<div class="title-items">Billetes</div>`
    for(let i = 0; i < arrBilles.length; i++){//Push Billetes
        codeHTML += `<div class="item">
                        <div class="title">${arrBilles[i][0].titulo}.</div>
                        <div class="date">Fecha de corte: ${arrBilles[i][0].datos[0].fecha}.</div>
                        <div class="stock">Unidades en circulación: ${arrBilles[i][0].datos[0].dato} millones.</div>
                        <div class="cont-image"><img src="../IMGS/${urlBilletes[i]}"></div> 
                     </div>`
    }
    container.innerHTML = codeHTML;
}