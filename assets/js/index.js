const estatesJSON = [
  {
    name: "Casa de campo",
    description: "Un lugar ideal para descansar de la ciudad",
    src: "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
    rooms: 2,
    meters: 170
  },
  {
    name: "Casa de playa",
    description: "Despierta tus días oyendo el oceano",
    src: "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
    rooms: 2,
    meters: 130
  },
  {
    name: "Casa en el centro",
    description: "Ten cerca de ti todo lo que necesitas",
    src: "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
    rooms: 1,
    meters: 80
  },
  {
    name: "Casa rodante",
    description: "Conviertete en un nómada del mundo sin salir de tu casa",
    src: "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
    rooms: 1,
    meters: 6
  },
  {
    name: "Departamento",
    description: "Desde las alturas todo se ve mejor",
    src: "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
    rooms: 3,
    meters: 200
  },
  {
    name: "Mansión",
    description: "Vive una vida lujosa en la mansión de tus sueños ",
    src: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/FJYA5LJ4PNEIVNBUDMQ66KV6UQ.jpg",
    rooms: 5,
    meters: 500
  }
];

const button = document.querySelector("#searchButton")
const estatesSection = document.querySelector(".propiedades");
let total = document.querySelector("#total");
let templateHtml = "";

const baseTemplate = (estate) => {
 return `
    <div class="propiedad">
      <div class="img"
          style="background-image: url(${estate.src})">
      </div>
      <section>
        <h5>${estate.name}</h5>
        <div class="d-flex justify-content-between">
          <p>Cuartos:${estate.rooms}</p>
          <p>Metros: ${estate.meters}</p>
        </div>
        <p class="my-3">${estate.description}</p>
        <button class="btn btn-info ">Ver más</button>
      </section>
    </div>
  `;
}

const initialLoad = () => {
  for (const estate of estatesJSON) {
    templateHtml += baseTemplate(estate);
  }
  estatesSection.innerHTML += templateHtml;
  total.innerHTML = estatesJSON.length;
}

const searchEstate = (from, to, rooms) => {
  templateHtml = "";
  let totalresultado = [];

  for (const estate of estatesJSON) {
    if ((from <= estate.meters <= to) && (estate.rooms >= rooms)) {
      templateHtml += baseTemplate(estate);
      totalresultado.push(estate);
    } 
  }

  if(totalresultado.length>0) {
    estatesSection.innerHTML = templateHtml;
    total.innerHTML = totalresultado.length;
  } else {
    estatesSection.innerHTML = `
    <div class="propiedad">NO HAY RESULTADOS PARA ESTA BUSQUEDA</div>
    `;
    total.innerHTML = totalresultado.length;
  }
}

const validate = () => {
  let rooms = Number(document.querySelector("#rooms").value);
  let value1 = Number(document.querySelector("#from").value);
  let value2 = Number(document.querySelector("#to").value);

 if(rooms != 0 && value1 != 0 && value2 != 0) {
   searchEstate(value1, value2, rooms);
} else {
   alert('Faltan campos por llenar')
 }
}

button.addEventListener("click", validate);

window.onload = function () {
  initialLoad();
}
