class Graph {
    constructor(containerId) {
      this.ForceGraph3D = window.ForceGraph3D.default || window.ForceGraph3D;
      this.graph = this.ForceGraph3D()(document.getElementById(containerId));
    }
  
    generateNodes(companies) {
      let nodes = companies.map((item, index) => {
        let locationParts = item.location.split(" ");
        let city = locationParts[0]; // Asume que la ciudad es el primer elemento en la ubicación
        return { "id": item.name, "group": item.sector, "city": city, "color": item.color }
      });
      return nodes;
    }
  
  
    generateLinks(nodes) {
      let links = [];
      for (let i = 0; i < nodes.length; i++) {
        let sameGroupNodes = nodes.filter(node => node.group === nodes[i].group && node.id !== nodes[i].id);
        let sameCityNodes = nodes.filter(node => node.city === nodes[i].city && node.id !== nodes[i].id);
    
        for (let node of sameGroupNodes) {
          links.push({ "source": nodes[i].id, "target": node.id, "color": "blue" });
        }
    
        for (let node of sameCityNodes) {
          links.push({ "source": nodes[i].id, "target": node.id, "color": "red" });
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
        .linkColor(() => 'Green')
        .forceEngine('d3') // Usa d3 force layout
        .d3.forceManyBody().strength(-80)// Aumentar la repulsión entre nodos
        .d3.forceLink().distance(10); // Aumentar la distancia entre los nodos conectados
    }
  }
  


// Datos de las empresas
const companiesData = 
[
    { "name": "African Climate Foundation", "sector": "Climate Philanthropy", "color": "#e377c2", "location": "Cape Town, South Africa" },
    { "name": "GreenCape", "sector": "Sustainable Development", "color": "#a1d99b", "location": "Cape Town, South Africa" },
    { "name": "African Clean Energy", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Lesotho" },
    { "name": "BioTherm Energy", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Johannesburg, South Africa" },
    { "name": "Nyamezela Group", "sector": "Solar Energy", "color": "#9467bd", "location": "Stellenbosch, South Africa" },
    { "name": "Greenpeace Africa", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Johannesburg, South Africa" },
    { "name": "Climate Action Network Africa", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Nairobi, Kenya" },
    { "name": "Sahara Forest Project", "sector": "Climate Innovation", "color": "#8c564b", "location": "Aqaba, Jordan" },
    { "name": "Grupo de Financiamiento Climático para América Latina y el Caribe", "sector": "Climate Finance", "color": "#3182bd", "location": "Santiago, Chile" },
    { "name": "Green Climate Fund", "sector": "Climate Finance", "color": "#3182bd", "location": "Incheon, South Korea" },
    { "name": "Climate Bonds Initiative", "sector": "Climate Finance", "color": "#3182bd", "location": "London, United Kingdom" },
    { "name": "Ecotierra", "sector": "Climate Finance", "color": "#3182bd", "location": "Panama City, Panama" },
    { "name": "Costa Rica Limpia", "sector": "Sustainable Development", "color": "#a1d99b", "location": "San José, Costa Rica" },
    { "name": "Ecoflora Cares", "sector": "Conservation", "color": "#e377c2", "location": "Cali, Colombia" },
    { "name": "Fundación Terram", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Santiago, Chile" },
    { "name": "Parley for the Oceans", "sector": "Ocean Conservation", "color": "#1f77b4", "location": "Rio de Janeiro, Brazil" },
    { "name": "Bolsa de Valores Socioambientales", "sector": "Sustainable Finance", "color": "#3182bd", "location": "São Paulo, Brazil" },
    { "name": "Instituto de Conservación de Ballenas", "sector": "Conservation", "color": "#e377c2", "location": "Quito, Ecuador" },
    { "name": "Energía Limpia XXI", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Mexico City, Mexico" },
    { "name": "Amazon Environmental Research Institute", "sector": "Climate Research", "color": "#e377c2", "location": "Belém, Brazil" },
    { "name": "Observatorio del Clima", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Buenos Aires, Argentina" },
    { "name": "SolarReserve", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Santiago, Chile" },
    { "name": "Agrupación de Ingeniería en Sistemas Energéticos", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Rosario, Argentina" },
    { "name": "Clima Yá", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Lima, Peru" },
    { "name": "South African Renewable Energy Council", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Johannesburg, South Africa" },
    { "name": "Climate and Sustainable Development Network", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Dakar, Senegal" },
    { "name": "Fundación Chile", "sector": "Climate Innovation", "color": "#8c564b", "location": "Santiago, Chile" },
    { "name": "Carbon Trust Africa", "sector": "Carbon Management", "color": "#8c564b", "location": "Johannesburg, South Africa" },
    { "name": "Fundo Clima", "sector": "Climate Finance", "color": "#3182bd", "location": "Brasília, Brazil" },
    { "name": "Instituto Centro de Vida", "sector": "Climate Research", "color": "#e377c2", "location": "Cuiabá, Brazil" },
    { "name": "Tesla", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Palo Alto, California, USA" },
    { "name": "Siemens Gamesa", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Zamudio, Spain" },
    { "name": "Vestas Wind Systems", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Aarhus, Denmark" },
    { "name": "First Solar", "sector": "Solar Energy", "color": "#9467bd", "location": "Tempe, Arizona, USA" },
    { "name": "Enphase Energy", "sector": "Solar Energy", "color": "#9467bd", "location": "Fremont, California, USA" },
    { "name": "Orsted", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Fredericia, Denmark" },
    { "name": "Natura & Co", "sector": "Sustainable Cosmetics", "color": "#a1d99b", "location": "São Paulo, Brazil" },
    { "name": "Patagonia", "sector": "Sustainable Apparel", "color": "#a1d99b", "location": "Ventura, California, USA" },
    { "name": "Unilever", "sector": "Sustainable Consumer Goods", "color": "#a1d99b", "location": "London, United Kingdom & Rotterdam, Netherlands" },
    { "name": "IKEA", "sector": "Sustainable Home Furnishing", "color": "#a1d99b", "location": "Delft, Netherlands" },
    { "name": "Beyond Meat", "sector": "Plant-Based Foods", "color": "#a1d99b", "location": "El Segundo, California, USA" },
    { "name": "ClimateWorks Foundation", "sector": "Climate Philanthropy", "color": "#e377c2", "location": "San Francisco, California, USA" },
    { "name": "Rocky Mountain Institute", "sector": "Climate Think Tank", "color": "#e377c2", "location": "Boulder, Colorado, USA" },
    { "name": "World Resources Institute", "sector": "Climate Research", "color": "#e377c2", "location": "Washington, D.C., USA" },
    { "name": "The Nature Conservancy", "sector": "Conservation", "color": "#e377c2", "location": "Arlington, Virginia, USA" },
    { "name": "Greenpeace", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Amsterdam, Netherlands" },
    { "name": "Conservation International", "sector": "Conservation", "color": "#e377c2", "location": "Arlington, Virginia, USA" },
    { "name": "World Wildlife Fund", "sector": "Conservation", "color": "#e377c2", "location": "Washington, D.C., USA" },
    { "name": "Environmental Defense Fund", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "New York, New York, USA" },
    { "name": "Blue Origin", "sector": "Space Exploration", "color": "#ff7f0e", "location": "Kent, Washington, USA" },
    { "name": "SpaceX", "sector": "Space Exploration", "color": "#ff7f0e", "location": "Hawthorne, California, USA" },
    { "name": "Terracycle", "sector": "Waste Management", "color": "#8c564b", "location": "Trenton, New Jersey, USA" },
    { "name": "Waste Management, Inc.", "sector": "Waste Management", "color": "#8c564b", "location": "Houston, Texas, USA" },
    { "name": "Renault", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Boulogne-Billancourt, France" },
    { "name": "BYD Company", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Shenzhen, China" },
    { "name": "NIO", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Shanghai, China" },
    { "name": "CarbonCure Technologies", "sector": "Carbon Capture", "color": "#d62728", "location": "Halifax, Nova Scotia, Canada" },
    { "name": "Climeworks", "sector": "Carbon Capture", "color": "#d62728", "location": "Zurich, Switzerland" },
    { "name": "Climeworks", "sector": "Carbon Capture", "color": "#d62728", "location": "Reykjavik, Iceland" },
    { "name": "Climate-KIC", "sector": "Climate Innovation", "color": "#8c564b", "location": "Brussels, Belgium" },
    { "name": "GreenCape Extension", "sector": "Sustainable Development", "color": "#a1d99b", "location": "Cape Town, South Africa" },
    { "name": "SolarSolutions", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Cape Town, South Africa" },
    { "name": "ClimateAction Nairobi", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Nairobi, Kenya" },
    { "name": "GreenClimate Incheon", "sector": "Climate Finance", "color": "#3182bd", "location": "Incheon, South Korea" },
    { "name": "Amazon Climate Research", "sector": "Climate Research", "color": "#e377c2", "location": "Belém, Brazil" },
    { "name": "Observatory for Climate Change", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Buenos Aires, Argentina" },
    { "name": "Chilean Climate Innovation", "sector": "Climate Innovation", "color": "#8c564b", "location": "Santiago, Chile" },
    { "name": "Costa Rica Sustainable", "sector": "Sustainable Development", "color": "#a1d99b", "location": "San José, Costa Rica" },
    { "name": "Conservation Cali", "sector": "Conservation", "color": "#e377c2", "location": "Cali, Colombia" },
    { "name": "Chilean Environmental Foundation", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Santiago, Chile" },
    { "name": "Ocean Conservation Rio", "sector": "Ocean Conservation", "color": "#1f77b4", "location": "Rio de Janeiro, Brazil" },
    { "name": "São Paulo Sustainable Finance", "sector": "Sustainable Finance", "color": "#3182bd", "location": "São Paulo, Brazil" },
    { "name": "Ecuadorian Conservation Institute", "sector": "Conservation", "color": "#e377c2", "location": "Quito, Ecuador" },
    { "name": "Mexico Renewable Energy", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Mexico City, Mexico" },
    { "name": "Santiago Climate Research", "sector": "Climate Research", "color": "#e377c2", "location": "Santiago, Chile" },
    { "name": "Renewable Energy Rosario", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Rosario, Argentina" },
    { "name": "Lima Climate Advocacy", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Lima, Peru" },
    { "name": "Senegal Sustainable Energy", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Dakar, Senegal" },
    { "name": "Chilean Climate Foundation", "sector": "Climate Innovation", "color": "#8c564b", "location": "Santiago, Chile" },
    { "name": "South African Carbon Management", "sector": "Carbon Management", "color": "#8c564b", "location": "Johannesburg, South Africa" },
    { "name": "Brazilian Climate Finance", "sector": "Climate Finance", "color": "#3182bd", "location": "Brasília, Brazil" },
    { "name": "Brazilian Climate Research", "sector": "Climate Research", "color": "#e377c2", "location": "Cuiabá, Brazil" },
    { "name": "California Electric Vehicles", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Palo Alto, California, USA" },
    { "name": "Spanish Renewable Energy", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Zamudio, Spain" },
    { "name": "Danish Wind Systems", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Aarhus, Denmark" },
    { "name": "Arizona Solar Energy", "sector": "Solar Energy", "color": "#9467bd", "location": "Tempe, Arizona, USA" },
    { "name": "California Solar Energy", "sector": "Solar Energy", "color": "#9467bd", "location": "Fremont, California, USA" },
    { "name": "Danish Renewable Energy", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Fredericia, Denmark" },
    { "name": "Sustainable Cosmetics São Paulo", "sector": "Sustainable Cosmetics", "color": "#a1d99b", "location": "São Paulo, Brazil" },
    { "name": "California Sustainable Apparel", "sector": "Sustainable Apparel", "color": "#a1d99b", "location": "Ventura, California, USA" },
    { "name": "Climate Action Network South Africa", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Cape Town, South Africa" },
    { "name": "African Climate Reality Project", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Cape Town, South Africa" },
    { "name": "Renewable Energy Lesotho", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Lesotho" },
    { "name": "South African Wind Energy Association", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Cape Town, South Africa" },
    { "name": "Greenpeace Kenya", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Nairobi, Kenya" },
    { "name": "African Wildlife Foundation", "sector": "Conservation", "color": "#e377c2", "location": "Nairobi, Kenya" },
    { "name": "Jordan Environment Society", "sector": "Climate Innovation", "color": "#8c564b", "location": "Aqaba, Jordan" },
    { "name": "Greenpeace Chile", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Santiago, Chile" },
    { "name": "Sustainable Chile", "sector": "Sustainable Development", "color": "#a1d99b", "location": "Santiago, Chile" },
    { "name": "Brazilian Climate Observatory", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Rio de Janeiro, Brazil" },
    { "name": "Amigos da Terra - Amazônia Brasileira", "sector": "Conservation", "color": "#e377c2", "location": "Belém, Brazil" },
    { "name": "Argentina Climate Change Foundation", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Buenos Aires, Argentina" },
    { "name": "African Conservation Foundation", "sector": "Conservation", "color": "#e377c2", "location": "Nairobi, Kenya" },
    { "name": "Latin American Climate Action Network", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Santiago, Chile" },
    { "name": "Chilean Renewable Energy Association", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Santiago, Chile" },
    { "name": "Costa Rica Conservation Foundation", "sector": "Conservation", "color": "#e377c2", "location": "San José, Costa Rica" },
    { "name": "Colombian Environmental Foundation", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Cali, Colombia" },
    { "name": "Ecuadorian Climate Action Network", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Quito, Ecuador" },
    { "name": "Mexican Renewable Energy Association", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Mexico City, Mexico" },
    { "name": "Brazilian Institute of Climate Change", "sector": "Climate Research", "color": "#e377c2", "location": "Cuiabá, Brazil" },
    { "name": "California Climate Foundation", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Palo Alto, California, USA" },
    { "name": "Spanish Solar Energy Association", "sector": "Solar Energy", "color": "#9467bd", "location": "Zamudio, Spain" },
    { "name": "Danish Energy Agency", "sector": "Renewable Energy", "color": "#2ca02c", "location": "Aarhus, Denmark" },
    { "name": "Arizona Sustainability Alliance", "sector": "Sustainable Development", "color": "#a1d99b", "location": "Tempe, Arizona, USA" },
    { "name": "California Coastkeeper Alliance", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Ventura, California, USA" },
    { "name": "Dutch Climate Foundation", "sector": "Climate Advocacy", "color": "#e377c2", "location": "Delft, Netherlands" },
    { "name": "California Plant-Based Foods Association", "sector": "Plant-Based Foods", "color": "#a1d99b", "location": "El Segundo, California, USA" },
    { "name": "Climate Action Network San Francisco", "sector": "Climate Advocacy", "color": "#e377c2", "location": "San Francisco, California, USA" },
    { "name": "Rocky Mountain Climate Institute", "sector": "Climate Think Tank", "color": "#e377c2", "location": "Boulder, Colorado, USA" },
    { "name": "World Resources Institute Washington", "sector": "Climate Research", "color": "#e377c2", "location": "Washington, D.C., USA" },
    { "name": "Virginia Conservation Network", "sector": "Conservation", "color": "#e377c2", "location": "Arlington, Virginia, USA" },
    { "name": "Netherlands Climate Action", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "Amsterdam, Netherlands" },
    { "name": "Conservation International Virginia", "sector": "Conservation", "color": "#e377c2", "location": "Arlington, Virginia, USA" },
    { "name": "World Wildlife Fund Washington", "sector": "Conservation", "color": "#e377c2", "location": "Washington, D.C., USA" },
    { "name": "Environmental Defense Fund New York", "sector": "Environmental Advocacy", "color": "#e377c2", "location": "New York, New York, USA" },
    { "name": "Washington Space Exploration Society", "sector": "Space Exploration", "color": "#ff7f0e", "location": "Kent, Washington, USA" },
    { "name": "California Space Society", "sector": "Space Exploration", "color": "#ff7f0e", "location": "Hawthorne, California, USA" },
    { "name": "New Jersey Waste Management", "sector": "Waste Management", "color": "#8c564b", "location": "Trenton, New Jersey, USA" },
    { "name": "Texas Environmental Defense", "sector": "Waste Management", "color": "#8c564b", "location": "Houston, Texas, USA" },
    { "name": "French Electric Vehicles Association", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Boulogne-Billancourt, France" },
    { "name": "Shenzhen Electric Vehicles Association", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Shenzhen, China" },
    { "name": "Shanghai Electric Vehicles Association", "sector": "Electric Vehicles", "color": "#1f77b4", "location": "Shanghai, China" },
    { "name": "Canadian Carbon Capture Institute", "sector": "Carbon Capture", "color": "#d62728", "location": "Halifax, Nova Scotia, Canada" },
    { "name": "Swiss Carbon Capture Association", "sector": "Carbon Capture", "color": "#d62728", "location": "Zurich, Switzerland" },
    { "name": "Icelandic Climate Action Network", "sector": "Climate Innovation", "color": "#8c564b", "location": "Reykjavik, Iceland" },
    { "name": "Belgian Climate Innovation Foundation", "sector": "Climate Innovation", "color": "#8c564b", "location": "Brussels, Belgium" },
    { "name": "Conferencia Episcopal Española", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Cáritas Española", "sector": "Social Services", "color": "#8c564b", "location": "Madrid, Spain" },
    { "name": "Comisión Islámica de España", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Federación de Comunidades Judías de España", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Unión Budista Española", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Iglesia Evangélica Española", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Hindu Forum of Europe - Spain", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Barcelona, Spain" },
    { "name": "Unión de Comunidades Islámicas de España", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Federación de Entidades Religiosas Evangélicas de España", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Federación de Comunidades Budistas de España", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Comisión Islámica de España - Catalunya", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Barcelona, Spain" },
    { "name": "Comunidad Israelita de Barcelona", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Barcelona, Spain" },
    { "name": "Federación de Entidades Religiosas Evangélicas de Catalunya", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Barcelona, Spain" },
    { "name": "Plataforma Cristiana de Catalunya", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Barcelona, Spain" },
    { "name": "Asamblea Episcopal Ortodoxa de España y Portugal", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Iglesia Ortodoxa del Patriarcado Ecuménico", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Comunidad Hindú de España", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Iglesia Evangélica Española - Barcelona", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Barcelona, Spain" },
    { "name": "Plataforma Cristiana de Madrid", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Casa Sefarad-Israel", "sector": "Cultural Center", "color": "#8c564b", "location": "Madrid, Spain" },
    { "name": "Iglesia Evangélica Española - Valencia", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Valencia, Spain" },
    { "name": "Comunidad Islámica en España", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Madrid, Spain" },
    { "name": "Comunidad Islámica de Valencia", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Valencia, Spain" },
    { "name": "Unión de Comunidades Islámicas de Cataluña", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Barcelona, Spain" },
    { "name": "Comunidad Israelita de Valencia", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Valencia, Spain" },
    { "name": "Iglesia Evangélica Española - Sevilla", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Seville, Spain" },
    { "name": "Comunidad Islámica de Sevilla", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Seville, Spain" },
    { "name": "Iglesia Evangélica Española - Zaragoza", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Zaragoza, Spain" },
    { "name": "Comunidad Islámica de Zaragoza", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Zaragoza, Spain" },
    { "name": "Iglesia Evangélica Española - Málaga", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Málaga, Spain" },
    { "name": "Comunidad Islámica de Málaga", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Málaga, Spain" },
    { "name": "Iglesia Evangélica Española - Murcia", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Murcia, Spain" },
    { "name": "Comunidad Islámica de Murcia", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Murcia, Spain" },
    { "name": "Iglesia Evangélica Española - Palma de Mallorca", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Palma de Mallorca, Spain" },
    { "name": "Comunidad Islámica de Palma de Mallorca", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Palma de Mallorca, Spain" },
    { "name": "Iglesia Evangélica Española - Las Palmas de Gran Canaria", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Las Palmas de Gran Canaria, Spain" },
    { "name": "Comunidad Islámica de Las Palmas de Gran Canaria", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Las Palmas de Gran Canaria, Spain" },
    { "name": "Iglesia Evangélica Española - Bilbao", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Bilbao, Spain" },
    { "name": "Comunidad Islámica de Bilbao", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Bilbao, Spain" },
    { "name": "Iglesia Evangélica Española - Alicante", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Alicante, Spain" },
    { "name": "Comunidad Islámica de Alicante", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Alicante, Spain" },
    { "name": "Iglesia Evangélica Española - Córdoba", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Córdoba, Spain" },
    { "name": "Comunidad Islámica de Córdoba", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Córdoba, Spain" },
    { "name": "Iglesia Evangélica Española - Valladolid", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Valladolid, Spain" },
    { "name": "Comunidad Islámica de Valladolid", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Valladolid, Spain" },
    { "name": "Iglesia Evangélica Española - Vigo", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Vigo, Spain" },
    { "name": "Comunidad Islámica de Vigo", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Vigo, Spain" },
    { "name": "Iglesia Evangélica Española - Gijón", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Gijón, Spain" },
    { "name": "Comunidad Islámica de Gijón", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Gijón, Spain" },
    { "name": "Iglesia Evangélica Española - Granada", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Granada, Spain" },
    { "name": "Comunidad Islámica de Granada", "sector": "Religious Organization", "color": "#ff7f0e", "location": "Granada, Spain" }
  

];
  
  
 
  
// const myGraph = new Graph('climateContainer');
// myGraph.drawGraph(companiesData);



const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5000/render-graph/climate', { waitUntil: 'networkidle2' });

    await page.waitForSelector('#3d-graph', { timeout: 30000 });
    const canvas = await page.$('#3d-graph');
    
    const stream = await canvas.evaluate(canvas => {
      return canvas.captureStream(30); // 30 fps
    });

    const { spawn } = require('child_process');
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-f', 'image2pipe',
      '-r', '30',
      '-i', '-',
      '-f', 'mpeg1video',
      '-b:v', '1000k',
      '-r', '30',
      'pipe:1'
    ]);

    stream.getVideoTracks()[0].requestFrame();

    stream.on('data', chunk => {
      ffmpeg.stdin.write(chunk);
    });

    stream.on('end', () => {
      ffmpeg.stdin.end();
    });

    ffmpeg.stdout.pipe(process.stdout);
    ffmpeg.stderr.pipe(process.stderr);

    ffmpeg.on('close', () => {
      browser.close();
    });

  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
})();
