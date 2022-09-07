var token = "a66ff00a1b88f02c41015ef4e8f2a651f1d6ed74ad1aa2f792f982fbce221da8"
var serie = "SG119";

const setValues = async () => {

    let request = await axios(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/${serie}/datos/oportuno?token=${token}`);

    document.getElementById("finanzas-publicas").innerHTML = `${request.data.bmx.series[0].titulo}
                                                            <br>$${request.data.bmx.series[0].datos[0].dato} mil millones de pesos.`;
    document.getElementById("finanzas-publicas").style.color = "#FFFFFF";
    console.log(request);
}

setValues();