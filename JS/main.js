//Tipo de cambio actual peso mexicano - dolar estadounidense

var token = "a66ff00a1b88f02c41015ef4e8f2a651f1d6ed74ad1aa2f792f982fbce221da8"
var Series = {apertura: {compra: "SF43787", venta: "SF43784"}, 
                cierre: {compra: "SF43788", venta: "SF43786"}};

const getTypeChange = async () => {
    let values = [];
    let aperturaCompra = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${Series.apertura.compra}/datos/oportuno?token=${token}`);
    let aperturaVenta = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${Series.apertura.venta}/datos/oportuno?token=${token}`);
    let cierreCompra = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${Series.cierre.compra}/datos/oportuno?token=${token}`);
    let cierreVenta = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${Series.cierre.venta}/datos/oportuno?token=${token}`);
    values.push(aperturaCompra.data.bmx.series[0]);
    values.push(aperturaVenta.data.bmx.series[0]);
    values.push(cierreCompra.data.bmx.series[0]);
    values.push(cierreVenta.data.bmx.series[0]);

    console.log(values)
    setValues(values);
}

const setValues = (dataSeries) => {
    document.getElementById("compra-apertura").innerHTML += `$${dataSeries[0].datos[0].dato} pesos.`;
    document.getElementById("venta-apertura").innerHTML += `$${dataSeries[1].datos[0].dato} pesos.`;
    document.getElementById("compra-cierre").innerHTML += `$${dataSeries[2].datos[0].dato} pesos.`;
    document.getElementById("venta-cierre").innerHTML += `$${dataSeries[3].datos[0].dato} pesos.`;

}

getTypeChange();