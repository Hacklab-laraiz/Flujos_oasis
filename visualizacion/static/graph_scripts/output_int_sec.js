class Graph {
    constructor(containerId) {
      this.ForceGraph3D = window.ForceGraph3D.default || window.ForceGraph3D;
      this.graph = this.ForceGraph3D()(document.getElementById(containerId));
    }

    generateNodes(companies) {
      let nodes = companies.map((item, index) => {
        let locationParts = item.pais.split(" ");
        let city = locationParts[0]; // Asume que la ciudad es el primer elemento en la ubicación
        return { "id": item.nombre, "group": item.pais, "city": city, "color": getRandomBrightColor() } // Usamos la función getRandomBrightColor para asignar colores aleatorios a los nodos
      });
      return nodes;
    }

    generateLinks(nodes) {
      let links = [];
      for (let i = 0; i < nodes.length; i++) {
        let sameGroupNodes = nodes.filter(node => node.group === nodes[i].group && node.id !== nodes[i].id);
        let sameCityNodes = nodes.filter(node => node.city === nodes[i].city && node.id !== nodes[i].id);

        for (let node of sameGroupNodes) {
          links.push({ "source": nodes[i].id, "target": node.id, "color": "00FFFF" }); // Usamos el color azul oscuro para los enlaces
        }

        for (let node of sameCityNodes) {
          links.push({ "source": nodes[i].id, "target": node.id, "color": "#00FFFF" }); // Usamos el color azul oscuro para los enlaces
        }
      }
      return links;
    }

    // Crear los datos del gráfico
    createGraphData(nodes, links) {
      return {
        "nodes": nodes,
        "links": links
      };
    }

    // Configurar y dibujar el gráfico
    drawGraph(companyData) {
      const nodes = this.generateNodes(companyData);
      const links = this.generateLinks(nodes);
      const graphData = this.createGraphData(nodes, links);

      this.graph.graphData(graphData)
        .backgroundColor('Black')
        .nodeLabel('id')
        .nodeColor(node => node.color)
        .nodeVal(3) // Reduciendo el tamaño de los nodos a la mitad
         //
        .linkWidth(2)
        .cameraPosition({ x: 0, y: 0, z: 200 })
        .linkColor(link => link.color) // Usamos la propiedad color de los enlaces para el color de los mismos
        .forceEngine('d3') // Usa d3 force layout
        .d3Force('charge').strength(-1) // Aumentar la repulsión entre nodos para que se acerquen más
        .d3Force('link').distance(1); // Aumentar la distancia entre los nodos conectados
    }
  }

  // Función para generar colores aleatorios brillantes
  function getRandomBrightColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const intelligenceAgenciesData = [
    { "nombre": "Central Intelligence Agency (CIA)", "pais": "Estados Unidos", "presupuesto_defensa": 778000000000 },
    { "nombre": "National Security Agency (NSA)", "pais": "Estados Unidos", "presupuesto_defensa": 778000000000 },
    { "nombre": "Defense Intelligence Agency (DIA)", "pais": "Estados Unidos", "presupuesto_defensa": 778000000000 },
    { "nombre": "Federal Intelligence Service (BND)", "pais": "Alemania", "presupuesto_defensa": 63000000000 },
    { "nombre": "Foreign Intelligence Service (SVR)", "pais": "Rusia", "presupuesto_defensa": 61000000000 },
    { "nombre": "GRU (Main Intelligence Agency)", "pais": "Rusia", "presupuesto_defensa": 61000000000 },
    { "nombre": "Ministry of State Security (MSS)", "pais": "China", "presupuesto_defensa": 250000000000 },
    { "nombre": "Central Military Commission (CMC)", "pais": "China", "presupuesto_defensa": 250000000000 },
    { "nombre": "Australian Secret Intelligence Service (ASIS)", "pais": "Australia", "presupuesto_defensa": 42000000000 },
    { "nombre": "Australian Signals Directorate (ASD)", "pais": "Australia", "presupuesto_defensa": 42000000000 },
    { "nombre": "Canadian Security Intelligence Service (CSIS)", "pais": "Canadá", "presupuesto_defensa": 24000000000 },
    { "nombre": "Communications Security Establishment (CSE)", "pais": "Canadá", "presupuesto_defensa": 24000000000 },
    { "nombre": "Secret Intelligence Service (MI6)", "pais": "Reino Unido", "presupuesto_defensa": 80000000000 },
    { "nombre": "Government Communications Headquarters (GCHQ)", "pais": "Reino Unido", "presupuesto_defensa": 80000000000 },
    { "nombre": "Mossad", "pais": "Israel", "presupuesto_defensa": 21000000000 },
    { "nombre": "Australian Secret Intelligence Service (ASIS)", "pais": "Israel", "presupuesto_defensa": 21000000000 },
    { "nombre": "Research and Analysis Wing (RAW)", "pais": "India", "presupuesto_defensa": 66000000000 },
    { "nombre": "Intelligence Bureau (IB)", "pais": "India", "presupuesto_defensa": 66000000000 },
    { "nombre": "Direction Générale de la Sécurité Extérieure (DGSE)", "pais": "Francia", "presupuesto_defensa": 67000000000 },
    { "nombre": "Central Directorate of Interior Intelligence (DCRI)", "pais": "Francia", "presupuesto_defensa": 67000000000 },
    { "nombre": "Mukhabarat Al-Jamahiriya", "pais": "Libia", "presupuesto_defensa": 6500000000 },
    { "nombre": "Canadian Security Intelligence Service (CSIS)", "pais": "Libia", "presupuesto_defensa": 6500000000 },
    { "nombre": "Ministry of State Security (MSS)", "pais": "Japón", "presupuesto_defensa": 51000000000 },
    { "nombre": "Central Military Commission (CMC)", "pais": "Japón", "presupuesto_defensa": 51000000000 },
    { "nombre": "Bundesnachrichtendienst (BND)", "pais": "Corea del Sur", "presupuesto_defensa": 45000000000 },
    { "nombre": "National Intelligence Service (NIS)", "pais": "Corea del Sur", "presupuesto_defensa": 45000000000 },
    { "nombre": "Inter-Services Intelligence (ISI)", "pais": "Pakistán", "presupuesto_defensa": 15000000000 },
    { "nombre": "Intelligence Bureau (IB)", "pais": "Pakistán", "presupuesto_defensa": 15000000000 },
    { "nombre": "Canadian Security Intelligence Service (CSIS)", "pais": "Canadá", "presupuesto_defensa": 24000000000 },
    { "nombre": "Ministry of State Security (MSS)", "pais": "Rusia", "presupuesto_defensa": 61000000000 },
    { "nombre": "Research and Analysis Wing (RAW)", "pais": "India", "presupuesto_defensa": 66000000000 },
    { "nombre": "Inter-Services Intelligence (ISI)", "pais": "Pakistán", "presupuesto_defensa": 15000000000 },
    { "nombre": "Bundesnachrichtendienst (BND)", "pais": "Alemania", "presupuesto_defensa": 63000000000 },
    { "nombre": "Research and Analysis Wing (RAW)", "pais": "India", "presupuesto_defensa": 66000000000 },
    { "nombre": "Bundesnachrichtendienst (BND)", "pais": "Alemania", "presupuesto_defensa": 63000000000 },
    { "nombre": "Direction Générale de la Sécurité Extérieure (DGSE)", "pais": "Francia", "presupuesto_defensa": 67000000000 },
    { "nombre": "Bundesnachrichtendienst (BND)", "pais": "Corea del Sur", "presupuesto_defensa": 45000000000 }
];


const myWarGraph = new Graph('int_sec_container');
myWarGraph.drawGraph(intelligenceAgenciesData);
  