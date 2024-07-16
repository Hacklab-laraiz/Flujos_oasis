class Graph {
  constructor(containerId) {
    this.ForceGraph3D = window.ForceGraph3D.default || window.ForceGraph3D;
    this.graph = this.ForceGraph3D()(document.getElementById(containerId));
    
  }

  generateNodes(warData) {
    let nodes = warData.map((war, index) => {
      let muertos = war.muertos;
      let duracion = war.duracion;
      let locationParts = war.lugar.split(", ");
      let city = locationParts[0];
      return { "id": war.lugar, "group": war.bandoAtacante, "city": city, "color": getRandomColor(), "muertos": muertos, "duracion": duracion };
    });
    return nodes;
  }

  generateLinks(nodes) {
    let links = [];
    for (let i = 0; i < nodes.length; i++) {
      let sameGroupNodes = nodes.filter(node => node.group === nodes[i].group && node.id !== nodes[i].id);
      let sameCityNodes = nodes.filter(node => node.city === nodes[i].city && node.id !== nodes[i].id);

      for (let node of sameGroupNodes) {
        links.push({ "source": nodes[i].id, "target": node.id, "color": "#ff0000" }); // Cambiar el color de los links a rojo
      }

      for (let node of sameCityNodes) {
        links.push({ "source": nodes[i].id, "target": node.id, "color": "#ff0000" }); // Cambiar el color de los links a rojo
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
  drawGraph(warData) {
    const nodes = this.generateNodes(warData);
    const links = this.generateLinks(nodes);
    const graphData = this.createGraphData(nodes, links);

    this.graph.graphData(graphData)
      .backgroundColor('black')
      .nodeLabel(node => node.id + '\nMuertos: ' + node.muertos + '\nDuración: ' + node.duracion) // Mostrar información adicional al pulsar el nodo
      .nodeColor(node => node.color)
      .nodeVal(node => Math.sqrt(node.muertos) * 0.0005) // Tamaño del nodo en función del número de muertos
      .linkColor(link => link.color)
      .linkWidth(2) 
      .cameraPosition({ x: 0, y: 0, z: 200 })
      
      .d3Force('charge').strength(-1) // Aumentar la repulsión entre nodos para que se acerquen más
      .d3Force('link').distance(1); // Aumentar la distancia entre los nodos conectados
  }
}

// Función para generar colores aleatorios
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



const warData = [
  { "lugar": "Guerra Mundial I", "bandoAtacante": "Aliados", "bandoDefensor": "Imperios Centrales", "muertos": 14500000, "duracion": "1914-1918", "region": "Europa" },
  { "lugar": "Guerra Civil Rusa", "bandoAtacante": "Ejército Rojo", "bandoDefensor": "Ejército Blanco", "muertos": 9500000, "duracion": "1917-1922", "region": "Europa" },
  { "lugar": "Segunda Guerra Mundial", "bandoAtacante": "Aliados", "bandoDefensor": "Eje", "muertos": 70000000, "duracion": "1939-1945", "region": "Europa" },
  { "lugar": "Guerra Civil China", "bandoAtacante": "Ejército Rojo", "bandoDefensor": "Nacionalistas", "muertos": 7000000, "duracion": "1927-1949", "region": "Asia" },
  { "lugar": "Guerra de Corea", "bandoAtacante": "Corea del Norte", "bandoDefensor": "Corea del Sur", "muertos": 5000000, "duracion": "1950-1953", "region": "Asia" },
  { "lugar": "Guerra de Vietnam", "bandoAtacante": "Vietnam del Norte", "bandoDefensor": "Vietnam del Sur", "muertos": 1090000, "duracion": "1955-1975", "region": "Asia" },
  { "lugar": "Guerra de Irak-Irán", "bandoAtacante": "Irak", "bandoDefensor": "Irán", "muertos": 680000, "duracion": "1980-1988", "region": "Oriente Medio" },
  { "lugar": "Guerra de Afganistán (1978-1992)", "bandoAtacante": "Unión Soviética", "bandoDefensor": "Muyahidines", "muertos": 1500000, "duracion": "1978-1992", "region": "Asia" },
  { "lugar": "Guerra Civil de Mozambique", "bandoAtacante": "FRELIMO", "bandoDefensor": "RENAMO", "muertos": 1000000, "duracion": "1977-1992", "region": "África" },
  { "lugar": "Guerra Irak-Kuwait", "bandoAtacante": "Irak", "bandoDefensor": "Kuwait", "muertos": 50000, "duracion": "1990-1991", "region": "Oriente Medio" },
  { "lugar": "Guerra de Bosnia", "bandoAtacante": "Serbia", "bandoDefensor": "Bosnia y Herzegovina", "muertos": 250000, "duracion": "1992-1995", "region": "Europa" },
  { "lugar": "Guerra Civil de Argelia", "bandoAtacante": "Argelia", "bandoDefensor": "Grupos Islamistas", "muertos": 200000, "duracion": "1991-2002", "region": "África" },
  { "lugar": "Guerra de Chechenia", "bandoAtacante": "Rusia", "bandoDefensor": "Chechenia", "muertos": 160000, "duracion": "1994-2009", "region": "Europa" },
  { "lugar": "Guerra de Congo", "bandoAtacante": "RDC", "bandoDefensor": "Ruanda y Uganda", "muertos": 5200000, "duracion": "1998-2003", "region": "África" },
  { "lugar": "Guerra de Darfur", "bandoAtacante": "Janjawid", "bandoDefensor": "Grupos Rebeldes", "muertos": 300000, "duracion": "2003-2010", "region": "África" },
  { "lugar": "Guerra Civil de Costa de Marfil", "bandoAtacante": "Fuerzas Republicanas", "bandoDefensor": "Nuevas Fuerzas", "muertos": 300000, "duracion": "2002-2007", "region": "África" },
  { "lugar": "Guerra de Sudán del Sur", "bandoAtacante": "Sudán del Sur", "bandoDefensor": "Sudán", "muertos": 383000, "duracion": "1955-1972", "region": "África" },
  { "lugar": "Guerra de Libia", "bandoAtacante": "Libia", "bandoDefensor": "OTAN", "muertos": 250000, "duracion": "2011", "region": "África" },
  { "lugar": "Guerra de Somalia", "bandoAtacante": "Al-Shabaab", "bandoDefensor": "Tropas de la Unión Africana", "muertos": 500000, "duracion": "1991-presente", "region": "África" },
  { "lugar": "Guerra Civil de Siria", "bandoAtacante": "Siria", "bandoDefensor": "Oposición Armada", "muertos": 400000, "duracion": "2011-presente", "region": "Oriente Medio" },
  { "lugar": "Guerra de Yemen", "bandoAtacante": "Arabia Saudita", "bandoDefensor": "Houthis", "muertos": 233000, "duracion": "2015-presente", "region": "Oriente Medio" },
  { "lugar": "Guerra de Nigeria", "bandoAtacante": "Boko Haram", "bandoDefensor": "Nigeria", "muertos": 100000, "duracion": "2009-presente", "region": "África" },
  { "lugar": "Guerra Civil de Sri Lanka", "bandoAtacante": "Tamil Eelam", "bandoDefensor": "Sri Lanka", "muertos": 100000, "duracion": "1983-2009", "region": "Asia" },
  { "lugar": "Guerra de Uganda", "bandoAtacante": "LRA", "bandoDefensor": "Uganda", "muertos": 100000, "duracion": "1987-presente", "region": "África" },
  { "lugar": "Guerra de Sudán", "bandoAtacante": "Sudán", "bandoDefensor": "SSLM/A", "muertos": 400000, "duracion": "1955-1972", "region": "África" },
  { "lugar": "Guerra Civil de Sudán", "bandoAtacante": "SSLM/A", "bandoDefensor": "Sudán", "muertos": 2000000, "duracion": "1983-2005", "region": "África" },
  { "lugar": "Guerra Civil de Colombia", "bandoAtacante": "FARC", "bandoDefensor": "Colombia", "muertos": 250000, "duracion": "1964-presente", "region": "América Latina" },
  { "lugar": "Guerra de Irak", "bandoAtacante": "Irak", "bandoDefensor": "ISIS", "muertos": 500000, "duracion": "2014-2017", "region": "Oriente Medio" },
  { "lugar": "Guerra de Mali", "bandoAtacante": "Francia", "bandoDefensor": "MLNA", "muertos": 500000, "duracion": "2012-presente", "region": "África" },
  { "lugar": "Guerra de Afganistán (2001-presente)", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Talibán", "muertos": 241000, "duracion": "2001-presente", "region": "Asia" },
  { "lugar": "Guerra de Chad", "bandoAtacante": "FUC", "bandoDefensor": "Chad", "muertos": 64000, "duracion": "2005-2010", "region": "África" },
  { "lugar": "Guerra de Cachemira", "bandoAtacante": "India", "bandoDefensor": "Pakistán", "muertos": 70000, "duracion": "1947-presente", "region": "Asia" },
  { "lugar": "Guerra de Nagorno-Karabaj", "bandoAtacante": "Armenia", "bandoDefensor": "Azerbaiyán", "muertos": 64000, "duracion": "1988-1994", "region": "Asia" },
  { "lugar": "Guerra de México", "bandoAtacante": "Cárteles del narcotráfico", "bandoDefensor": "México", "muertos": 200000, "duracion": "2006-presente", "region": "América Latina" },
  { "lugar": "Guerra de Cachemira (2021)", "bandoAtacante": "India", "bandoDefensor": "Pakistán", "muertos": 135, "duracion": "2021", "region": "Asia" },
  { "lugar": "Guerra del Pacífico", "bandoAtacante": "Chile", "bandoDefensor": "Perú y Bolivia", "muertos": 60000, "duracion": "1879-1884", "region": "América Latina" },
  { "lugar": "Guerra de 100 Horas", "bandoAtacante": "El Salvador", "bandoDefensor": "Honduras", "muertos": 3000, "duracion": "1969", "region": "América Latina" },
  { "lugar": "Guerra de las Malvinas", "bandoAtacante": "Argentina", "bandoDefensor": "Reino Unido", "muertos": 907, "duracion": "1982", "region": "América Latina" },
  { "lugar": "Guerra Civil Española", "bandoAtacante": "Nacionales", "bandoDefensor": "Repblicanos", "muertos": 500000, "duracion": "1936-1939", "region": "Europa" },
  { "lugar": "Guerra de Irlanda del Norte", "bandoAtacante": "IRA", "bandoDefensor": "Reino Unido", "muertos": 3700, "duracion": "1969-1998", "region": "Europa" },
  { "lugar": "Guerra del Líbano", "bandoAtacante": "Israel", "bandoDefensor": "Hezbollah", "muertos": 150000, "duracion": "1985-2000", "region": "Oriente Medio" },
  { "lugar": "Guerra del Líbano de 2006", "bandoAtacante": "Israel", "bandoDefensor": "Hezbollah", "muertos": 1200, "duracion": "2006", "region": "Oriente Medio" },
  { "lugar": "Guerra de Omán", "bandoAtacante": "Omán", "bandoDefensor": "Fuerzas Populares", "muertos": 10000, "duracion": "1963-1976", "region": "Oriente Medio" },
  { "lugar": "Guerra de Afganistán (1989-1992)", "bandoAtacante": "Unión Soviética", "bandoDefensor": "Muyahidines", "muertos": 19000, "duracion": "1989-1992", "region": "Asia" },
  { "lugar": "Guerra Civil de Guatemala", "bandoAtacante": "Guatemala", "bandoDefensor": "Guerrilla", "muertos": 200000, "duracion": "1960-1996", "region": "América Latina" },
  { "lugar": "Guerra Civil de Nicaragua", "bandoAtacante": "Nicaragua", "bandoDefensor": "Contras", "muertos": 30000, "duracion": "1981-1990", "region": "América Latina" },
  { "lugar": "Guerra Civil de Sudán del Sur", "bandoAtacante": "Sudán del Sur", "bandoDefensor": "Sudán", "muertos": 383000, "duracion": "1983-2005", "region": "África" },
  { "lugar": "Guerra de Uganda", "bandoAtacante": "LRA", "bandoDefensor": "Uganda", "muertos": 100000, "duracion": "1987-2007", "region": "África" },
  { "lugar": "Guerra de Nagorno-Karabaj", "bandoAtacante": "Armenia", "bandoDefensor": "Azerbaiyán", "muertos": 50000, "duracion": "2020-presente", "region": "Asia" },
  { "lugar": "Guerra de Uganda", "bandoAtacante": "LRA", "bandoDefensor": "Uganda", "muertos": 100000, "duracion": "1987-2007", "region": "África" },
  { "lugar": "Guerra de Kosovo", "bandoAtacante": "OTAN", "bandoDefensor": "Yugoslavia", "muertos": 13000, "duracion": "1998-1999" },
  { "lugar": "Guerra de Afganistán (2001-presente)", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Talibán", "muertos": 241000, "duracion": "2001-presente" },
  { "lugar": "Guerra de Irak", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Irak", "muertos": 250000, "duracion": "2003-2011" },
  { "lugar": "Intervención militar en Libia", "bandoAtacante": "OTAN", "bandoDefensor": "Libia", "muertos": 10000, "duracion": "2011" },
  { "lugar": "Intervención militar en Somalia", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Somalia", "muertos": 15000, "duracion": "1992-1995" },
  { "lugar": "Guerra en Irak (2014-2017)", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Estado Islámico", "muertos": 15000, "duracion": "2014-2017" },
  { "lugar": "Guerra contra el Estado Islámico", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Estado Islámico", "muertos": 10000, "duracion": "2014-presente" },
  { "lugar": "Intervención militar en Afganistán (2001)", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Talibán", "muertos": 4000, "duracion": "2001" },
  { "lugar": "Intervención militar en Yugoslavia", "bandoAtacante": "OTAN", "bandoDefensor": "Yugoslavia", "muertos": 5000, "duracion": "1999" },
  { "lugar": "Guerra Civil de El Salvador", "bandoAtacante": "El Salvador", "bandoDefensor": "FMLN", "muertos": 75000, "duracion": "1979-1992" },
  { "lugar": "Guerra Irán-Contra", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Contras", "muertos": 60000, "duracion": "1985-1987" },
  { "lugar": "Guerra de Kosovo", "bandoAtacante": "OTAN", "bandoDefensor": "Yugoslavia", "muertos": 13000, "duracion": "1998-1999" },
  { "lugar": "Guerra Civil de Colombia", "bandoAtacante": "Colombia", "bandoDefensor": "FARC", "muertos": 220000, "duracion": "1964-presente" },
  { "lugar": "Guerra Civil de Siria", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Varios Grupos Rebeldes", "muertos": 600000, "duracion": "2011-presente" },
  { "lugar": "Guerra en Yemen", "bandoAtacante": "Arabia Saudita", "bandoDefensor": "Houthis", "muertos": 233000, "duracion": "2015-presente" },
  { "lugar": "Guerra contra el Estado Islámico", "bandoAtacante": "Coalición Internacional", "bandoDefensor": "Estado Islámico", "muertos": 300000, "duracion": "2014-presente" },
  { "lugar": "Crisis de los Misiles en Cuba", "bandoAtacante": "Estados Unidos", "bandoDefensor": "Unión Soviética", "muertos": 0, "duracion": "1962", "region": "América" },
  { "lugar": "Guerra del Golfo Pérsico", "bandoAtacante": "Varios países", "bandoDefensor": "Irak", "muertos": 0, "duracion": "1990-1991", "region": "Oriente Medio" },
  { "lugar": "Crisis de los Misiles de Turquía", "bandoAtacante": "Unión Soviética", "bandoDefensor": "Turquía", "muertos": 0, "duracion": "1962", "region": "Europa" },
  { "lugar": "Disputa de las Islas Malvinas", "bandoAtacante": "Argentina", "bandoDefensor": "Reino Unido", "muertos": 0, "duracion": "1982", "region": "América" },
  { "lugar": "Conflicto Diplomático Chipre-Turquía", "bandoAtacante": "Chipre", "bandoDefensor": "Turquía", "muertos": 0, "duracion": "1974-presente", "region": "Europa" },
  { "lugar": "Crisis de Suez", "bandoAtacante": "Egipto", "bandoDefensor": "Reino Unido y Francia", "muertos": 0, "duracion": "1956", "region": "África" },
  { "lugar": "Crisis del Estrecho de Taiwán", "bandoAtacante": "Taiwán", "bandoDefensor": "China", "muertos": 0, "duracion": "1949-presente", "region": "Asia" },
  { "lugar": "Crisis de Gibraltar", "bandoAtacante": "España", "bandoDefensor": "Reino Unido", "muertos": 0, "duracion": "1969-presente", "region": "Europa" },
  { "lugar": "Crisis de Cachemira", "bandoAtacante": "India", "bandoDefensor": "Pakistán", "muertos": 0, "duracion": "1947-presente", "region": "Asia" },
  { "lugar": "Conflicto de Cisjordania", "bandoAtacante": "Israel", "bandoDefensor": "Autoridad Palestina", "muertos": 0, "duracion": "1967-presente", "region": "Oriente Medio" },
  { "lugar": "Crisis de Crimea", "bandoAtacante": "Rusia", "bandoDefensor": "Ucrania", "muertos": 0, "duracion": "2014-presente", "region": "Europa" },
  { "lugar": "Crisis de Kosovo", "bandoAtacante": "Yugoslavia", "bandoDefensor": "Varios países", "muertos": 0, "duracion": "1999", "region": "Europa" },
  { "lugar": "Crisis de la Franja de Gaza", "bandoAtacante": "Israel", "bandoDefensor": "Hamas", "muertos": 0, "duracion": "2006-presente", "region": "Oriente Medio" },
  { "lugar": "Crisis de Transnistria", "bandoAtacante": "Moldavia", "bandoDefensor": "Transnistria", "muertos": 0, "duracion": "1990-presente", "region": "Europa" },
  { "lugar": "Crisis de Abjasia", "bandoAtacante": "Georgia", "bandoDefensor": "Abjasia", "muertos": 0, "duracion": "1992-presente", "region": "Europa" },
  { "lugar": "Crisis de Osetia del Sur", "bandoAtacante": "Georgia", "bandoDefensor": "Osetia del Sur", "muertos": 0, "duracion": "1991-presente", "region": "Europa" },
  { "lugar": "Crisis de Gibraltar", "bandoAtacante": "Reino Unido", "bandoDefensor": "España", "muertos": 0, "duracion": "1969-presente", "region": "Europa" },
  { "lugar": "Conflicto de Cachemira", "bandoAtacante": "Pakistán", "bandoDefensor": "India", "muertos": 0, "duracion": "1947-presente", "region": "Asia" },
  { "lugar": "Crisis de Chipre", "bandoAtacante": "Grecia", "bandoDefensor": "Turquía", "muertos": 0, "duracion": "1974-presente", "region": "Europa" },
  { "lugar": "Crisis de Nagorno-Karabaj", "bandoAtacante": "Azerbaiyán", "bandoDefensor": "Armenia", "muertos": 0, "duracion": "1988-presente", "region": "Europa" },
  { "lugar": "Crisis de Bosnia y Herzegovina", "bandoAtacante": "Bosnia y Herzegovina", "bandoDefensor": "Serbia", "muertos": 0, "duracion": "1992-1995", "region": "Europa" },
  { "lugar": "Crisis de Ucrania", "bandoAtacante": "Rusia", "bandoDefensor": "Varios países", "muertos": 0, "duracion": "2014-presente", "region": "Europa" },
  { "lugar": "Crisis de las Maldivas", "bandoAtacante": "Maldivas", "bandoDefensor": "Varios países", "muertos": 0, "duracion": "2018", "region": "Asia" },
  { "lugar": "Crisis del Sáhara Occidental", "bandoAtacante": "Marruecos", "bandoDefensor": "Frente Polisario", "muertos": 0, "duracion": "1975-presente", "region": "África" },
  { "lugar": "Crisis de Karakalpakstan", "bandoAtacante": "Uzbekistán", "bandoDefensor": "Karakalpakstan", "muertos": 0, "duracion": "1990-presente", "region": "Asia" },
  { "lugar": "Crisis de Ceuta y Melilla", "bandoAtacante": "Marruecos", "bandoDefensor": "España", "muertos": 0, "duracion": "1956-presente", "region": "Europa" },
  { "lugar": "Crisis del Índico", "bandoAtacante": "Varios países", "bandoDefensor": "Somalia", "muertos": 0, "duracion": "2008-presente", "region": "África" },
  { "lugar": "Crisis de las Islas Kuriles", "bandoAtacante": "Rusia", "bandoDefensor": "Japón", "muertos": 0, "duracion": "1945-presente", "region": "Asia" },
  { "lugar": "Crisis del Riachuelo", "bandoAtacante": "Argentina", "bandoDefensor": "Uruguay", "muertos": 0, "duracion": "2006-2010", "region": "América" },
  { "lugar": "Crisis de Gruyères", "bandoAtacante": "Suiza", "bandoDefensor": "Varios países", "muertos": 0, "duracion": "2003", "region": "Europa" },
  { "lugar": "Crisis del Chaco", "bandoAtacante": "Paraguay", "bandoDefensor": "Bolivia", "muertos": 0, "duracion": "1932-1935", "region": "América" },
  { "lugar": "Tratado de Versalles", "bandoAtacante": "Aliados", "bandoDefensor": "Alemania", "fecha": "1919", "region": "Europa" },
  { "lugar": "Tratado de Tordesillas", "bandoAtacante": "España", "bandoDefensor": "Portugal", "fecha": "1494", "region": "Europa" },
  { "lugar": "Tratado de Westfalia", "bandoAtacante": "Suecia", "bandoDefensor": "Sacro Imperio Romano Germánico", "fecha": "1648", "region": "Europa" },
  { "lugar": "Tratado de Paris", "bandoAtacante": "Gran Bretaña", "bandoDefensor": "Estados Unidos", "fecha": "1783", "region": "Norteamérica" },
  { "lugar": "Tratado de Utrecht", "bandoAtacante": "Gran Alianza", "bandoDefensor": "España", "fecha": "1713", "region": "Europa" },
  { "lugar": "Tratado de Aquisgrán", "bandoAtacante": "Reino Unido", "bandoDefensor": "Francia", "fecha": "1748", "region": "Europa" },
  { "lugar": "Tratado de Ryswick", "bandoAtacante": "Gran Alianza", "bandoDefensor": "Francia", "fecha": "1697", "region": "Europa" },
  { "lugar": "Tratado de Nimega", "bandoAtacante": "Francia", "bandoDefensor": "Provincias Unidas", "fecha": "1678", "region": "Europa" },
  { "lugar": "Tratado de Hubertusburg", "bandoAtacante": "Prusia", "bandoDefensor": "Austria", "fecha": "1763", "region": "Europa" },
  { "lugar": "Tratado de Karlowitz", "bandoAtacante": "Sacro Imperio Romano Germánico", "bandoDefensor": "Imperio Otomano", "fecha": "1699", "region": "Europa" },
  { "lugar": "Tratado de Campo Formio", "bandoAtacante": "Primera República Francesa", "bandoDefensor": "Imperio Austriaco", "fecha": "1797", "region": "Europa" },
  { "lugar": "Tratado de Lunéville", "bandoAtacante": "Primera República Francesa", "bandoDefensor": "Sacro Imperio Romano Germánico", "fecha": "1801", "region": "Europa" },
  { "lugar": "Tratado de Amiens", "bandoAtacante": "Francia", "bandoDefensor": "Reino Unido", "fecha": "1802", "region": "Europa" },
  { "lugar": "Tratado de París (1815)", "bandoAtacante": "Séptima Coalición", "bandoDefensor": "Francia", "fecha": "1815", "region": "Europa" },
  { "lugar": "Tratado de Paris (1763)", "bandoAtacante": "Reino Unido", "bandoDefensor": "Francia", "fecha": "1763", "region": "Europa" },
  { "lugar": "Tratado de Berlín", "bandoAtacante": "Gran Alianza", "bandoDefensor": "Imperio Otomano", "fecha": "1878", "region": "Europa" },
  { "lugar": "Tratado de Tilsit", "bandoAtacante": "Imperio Francés", "bandoDefensor": "Imperio Ruso", "fecha": "1807", "region": "Europa" },
  { "lugar": "Tratado de Kiel", "bandoAtacante": "Suecia", "bandoDefensor": "Reino Unido", "fecha": "1814", "region": "Europa" },
  { "lugar": "Tratado de Paris (1783)", "bandoAtacante": "Gran Bretaña", "bandoDefensor": "Estados Unidos", "fecha": "1783", "region": "Norteamérica" },
  { "lugar": "Tratado de Trianon", "bandoAtacante": "Cuatro Grandes Potencias", "bandoDefensor": "Reino de Hungría", "fecha": "1920", "region": "Europa" },
  { "lugar": "Tratado de Portsmouth", "bandoAtacante": "Rusia", "bandoDefensor": "Imperio del Japón", "fecha": "1905", "region": "Norteamérica" },
  { "lugar": "Tratado de Sevres", "bandoAtacante": "Potencias Aliadas", "bandoDefensor": "Imperio Otomano", "fecha": "1920", "region": "Europa" },
  { "lugar": "Tratado de Rapallo", "bandoAtacante": "Alemania", "bandoDefensor": "Unión Soviética", "fecha": "1922", "region": "Europa" },
  { "lugar": "Tratado de Nystad", "bandoAtacante": "Suecia", "bandoDefensor": "Imperio Ruso", "fecha": "1721", "region": "Europa" },
  { "lugar": "Tratado de Küçük Kaynarca", "bandoAtacante": "Imperio Ruso", "bandoDefensor": "Imperio Otomano", "fecha": "1774", "region": "Europa" },
  { "lugar": "Tratado de Zaragoza", "bandoAtacante": "España", "bandoDefensor": "Portugal", "fecha": "1529", "region": "Europa" },
  { "lugar": "Tratado de Brest-Litovsk", "bandoAtacante": "Potencias Centrales", "bandoDefensor": "Rusia", "fecha": "1918", "region": "Europa" },
  { "lugar": "Tratado de Guadalupe Hidalgo", "bandoAtacante": "Estados Unidos", "bandoDefensor": "México", "fecha": "1848", "region": "Norteamérica" },
  { "lugar": "Tratado de Adrianópolis", "bandoAtacante": "Rusia", "bandoDefensor": "Imperio Otomano", "fecha": "1829", "region": "Europa" },
  { "lugar": "Tratado de La Haya (1720)", "bandoAtacante": "Sacro Imperio Romano Germánico", "bandoDefensor": "Provincias Unidas", "fecha": "1720", "region": "Europa" },
  { "lugar": "Tratado de La Haya (1795)", "bandoAtacante": "República Bátava", "bandoDefensor": "Francia", "fecha": "1795", "region": "Europa" },
  { "lugar": "Tratado de Teschen", "bandoAtacante": "Austria", "bandoDefensor": "Prusia", "fecha": "1779", "region": "Europa" },
  { "lugar": "Tratado de Paris (1898)", "bandoAtacante": "Estados Unidos", "bandoDefensor": "España", "fecha": "1898", "region": "Norteamérica" },
];
  
  







const myWarGraph = new Graph('glob_war_container');
myWarGraph.drawGraph(warData);