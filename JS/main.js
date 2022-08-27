var token = "a66ff00a1b88f02c41015ef4e8f2a651f1d6ed74ad1aa2f792f982fbce221da8";
var seriesBilletes = ["SM1471", "SM1472", "SM1478", "SM1479", "SM1480", "SM1481", "SM1482"];
var seriesMonedas = ["SM9", "SM10", "SM11", "SM12", "SM13", "SM14", "SM15", "SM16", "SM17", "SM18", "SM19"];

const getValues = async () => {
    const values  = []
    for(let i = 0; i < seriesMonedas.length; i++){
        let requestMondas = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${seriesMonedas[i]}/datos/oportuno?token=${token}`);
        values.push(requestMondas.data);
    }
    for(let i = 0; i < seriesBilletes.length; i++) {
        let requestBilletes = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${seriesBilletes[i]}/datos/oportuno?token=${token}`);
        values.push(requestBilletes.data);
    }
    console.log(values);
    setValues(values);
}

getValues(); 

const setValues = (vals) => {
    let container = document.getElementById("container-values");
    for(let i = 0; i < vals.length; i++) {
        let codeHTML = `<div id="item">
                            <div id="title">${vals[i].bmx.series[0].titulo}</div>
                            <div id="date">${vals[i].bmx.series[0].datos[0].fecha}</div>
                            <div id"stock">${vals[i].bmx.series[0].datos[0].dato}</div>
                            <div id="cont-image"><img src="../IMGS/resourse.jpg"></div> 
                        </div>`;
        container.innerHTML += codeHTML;
    }
}