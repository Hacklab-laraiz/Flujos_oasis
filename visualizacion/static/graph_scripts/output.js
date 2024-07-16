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
      .linkColor(() => 'Yellow')
      .forceEngine('d3') // Usa d3 force layout
      .d3.forceManyBody().strength(-80)// Aumentar la repulsión entre nodos
      .d3.forceLink().distance(10); // Aumentar la distancia entre los nodos conectados
  }
}

// Datos de las empresas
const companiesData = 
[
  { "name": "BlackRock", "sector": "Financial", "color": "#FFA500", "location": "New York, New York, USA" },
  { "name": "Vanguard", "sector": "Financial", "color": "#FFA500", "location": "Malvern, Pennsylvania, USA" },
  { "name": "Amazon", "sector": "Technology", "color": "#00008B", "location": "Seattle, Washington, USA" },
  { "name": "Google", "sector": "Technology", "color": "#00008B", "location": "Mountain View, California, USA" },
  { "name": "JPMorgan Chase", "sector": "Financial", "color": "#FFA500", "location": "New York, New York, USA" },
  { "name": "ExxonMobil", "sector": "Energy", "color": "#00FF00", "location": "Irving, Texas, USA" },
  { "name": "Apple", "sector": "Technology", "color": "#00008B", "location": "Cupertino, California, USA" },
  { "name": "Microsoft", "sector": "Technology", "color": "#00008B", "location": "Redmond, Washington, USA" },
  { "name": "Facebook", "sector": "Technology", "color": "#00008B", "location": "Menlo Park, California, USA" },
  { "name": "Walmart", "sector": "Retail", "color": "#800080", "location": "Bentonville, Arkansas, USA" },
  { "name": "Bank of America", "sector": "Financial", "color": "#FFA500", "location": "Charlotte, North Carolina, USA" },
  { "name": "Procter & Gamble", "sector": "Consumer Goods", "color": "#FF0000", "location": "Cincinnati, Ohio, USA" },
  { "name": "Johnson & Johnson", "sector": "Healthcare", "color": "#FFFFFF", "location": "New Brunswick, New Jersey, USA" },
  { "name": "Chevron", "sector": "Energy", "color": "#00FF00", "location": "San Ramon, California, USA" },
  { "name": "Intel", "sector": "Technology", "color": "#00008B", "location": "Santa Clara, California, USA" },
  { "name": "AT&T", "sector": "Telecommunications", "color": "#FFC0CB", "location": "Dallas, Texas, USA" },
  { "name": "Verizon", "sector": "Telecommunications", "color": "#FFC0CB", "location": "New York, New York, USA" },
  { "name": "Coca-Cola", "sector": "Consumer Goods", "color": "#FF0000", "location": "Atlanta, Georgia, USA" },
  { "name": "McDonald's", "sector": "Hospitality", "color": "#800080", "location": "Chicago, Illinois, USA" },
  { "name": "Pfizer", "sector": "Healthcare", "color": "#FFFFFF", "location": "New York, New York, USA" },
  { "name": "Visa", "sector": "Financial", "color": "#FFA500", "location": "Foster City, California, USA" },
  { "name": "PepsiCo", "sector": "Consumer Goods", "color": "#FF0000", "location": "Purchase, New York, USA" },
  { "name": "Tesla", "sector": "Automotive", "color": "#FF0000", "location": "Palo Alto, California, USA" },
  { "name": "Ford", "sector": "Automotive", "color": "#FF0000", "location": "Dearborn, Michigan, USA" },
  { "name": "Chevrolet", "sector": "Automotive", "color": "#FF0000", "location": "Detroit, Michigan, USA" },
  { "name": "Toyota", "sector": "Automotive", "color": "#FF0000", "location": "Toyota, Aichi, Japan" },
  { "name": "Honda", "sector": "Automotive", "color": "#FF0000", "location": "Minato, Tokyo, Japan" },
  { "name": "Nissan", "sector": "Automotive", "color": "#FF0000", "location": "Nishi-ku, Yokohama, Japan" },
  { "name": "Hyundai", "sector": "Automotive", "color": "#FF0000", "location": "Seoul, South Korea" },
  { "name": "Volkswagen", "sector": "Automotive", "color": "#FF0000", "location": "Wolfsburg, Germany" },
  { "name": "Mercedes-Benz", "sector": "Automotive", "color": "#FF0000", "location": "Stuttgart, Germany" },
  { "name": "BMW", "sector": "Automotive", "color": "#FF0000", "location": "Munich, Germany" },
  { "name": "Audi", "sector": "Automotive", "color": "#FF0000", "location": "Ingolstadt, Germany" },
  { "name": "Porsche", "sector": "Automotive", "color": "#FF0000", "location": "Stuttgart, Germany" },
  { "name": "Volvo", "sector": "Automotive", "color": "#FF0000", "location": "Gothenburg, Sweden" },
  { "name": "Ferrari", "sector": "Automotive", "color": "#FF0000", "location": "Maranello, Italy" },
  { "name": "Lamborghini", "sector": "Automotive", "color": "#FF0000", "location": "Sant'Agata Bolognese, Italy" },
  { "name": "McLaren", "sector": "Automotive", "color": "#FF0000", "location": "Woking, United Kingdom" },
  { "name": "Warner Bros.", "sector": "Entertainment", "color": "#800080", "location": "Burbank, California, USA" },
  { "name": "Paramount Pictures", "sector": "Entertainment", "color": "#800080", "location": "Hollywood, California, USA" },
  { "name": "Universal Pictures", "sector": "Entertainment", "color": "#800080", "location": "Universal City, California, USA" },
  { "name": "20th Century Studios", "sector": "Entertainment", "color": "#800080", "location": "Century City, California, USA" },
  { "name": "Royal Dutch Shell", "sector": "Energy", "color": "#9ecae1", "location": "The Hague, Netherlands" },
  { "name": "Gazprom", "sector": "Energy", "color": "#9ecae1", "location": "Moscow, Russia" },
  { "name": "Chevron", "sector": "Energy", "color": "#9ecae1", "location": "San Ramon, California, USA" },
  { "name": "ExxonMobil", "sector": "Energy", "color": "#9ecae1", "location": "Irving, Texas, USA" },
  { "name": "Total", "sector": "Energy", "color": "#9ecae1", "location": "Courbevoie, France" },
  { "name": "Santander", "sector": "Financial", "color": "#3182bd", "location": "Santander, Spain" },
  { "name": "BBVA", "sector": "Financial", "color": "#3182bd", "location": "Bilbao, Spain" },
  { "name": "HSBC", "sector": "Financial", "color": "#3182bd", "location": "London, United Kingdom" },
  { "name": "Barclays", "sector": "Financial", "color": "#3182bd", "location": "London, United Kingdom" },
  { "name": "Deutsche Bank", "sector": "Financial", "color": "#3182bd", "location": "Frankfurt, Germany" },
  { "name": "BNP Paribas", "sector": "Financial", "color": "#3182bd", "location": "Paris, France" },
  { "name": "UBS", "sector": "Financial", "color": "#3182bd", "location": "Zurich, Switzerland" },
  { "name": "Credit Suisse", "sector": "Financial", "color": "#3182bd", "location": "Zurich, Switzerland" },
  { "name": "Vodafone", "sector": "Telecommunications", "color": "#9e9ac8", "location": "London, United Kingdom" },
  { "name": "Telefónica", "sector": "Telecommunications", "color": "#9e9ac8", "location": "Madrid, Spain" },
  { "name": "Deutsche Telekom", "sector": "Telecommunications", "color": "#9e9ac8", "location": "Bonn, Germany" },
  { "name": "Orange", "sector": "Telecommunications", "color": "#9e9ac8", "location": "Paris, France" },
  { "name": "T-Mobile", "sector": "Telecommunications", "color": "#9e9ac8", "location": "Bonn, Germany" },
  { "name": "O2", "sector": "Telecommunications", "color": "#9e9ac8", "location": "Slough, United Kingdom" },
  { "name": "Verizon", "sector": "Telecommunications", "color": "#9e9ac8", "location": "New York, New York, USA" },
  { "name": "AT&T", "sector": "Telecommunications", "color": "#9e9ac8", "location": "Dallas, Texas, USA" },
  { "name": "Ferrero", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Alba, Italy" },
  { "name": "Nestlé", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Vevey, Switzerland" },
  { "name": "Danone", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Paris, France" },
  { "name": "Unilever", "sector": "Consumer Goods", "color": "#a1d99b", "location": "London, United Kingdom" },
  { "name": "Procter & Gamble", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Cincinnati, Ohio, USA" },
  { "name": "PepsiCo", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Purchase, New York, USA" },
  { "name": "Coca-Cola", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Atlanta, Georgia, USA" },
  { "name": "Kraft Heinz", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Chicago, Illinois, USA" },
  { "name": "Mars", "sector": "Consumer Goods", "color": "#a1d99b", "location": "McLean, Virginia, USA" },
  { "name": "Mondelez", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Chicago, Illinois, USA" },
  { "name": "Johnson & Johnson", "sector": "Healthcare", "color": "#bcbddc", "location": "New Brunswick, New Jersey, USA" },
  { "name": "Pfizer", "sector": "Healthcare", "color": "#bcbddc", "location": "New York, New York, USA" },
  { "name": "Novartis", "sector": "Healthcare", "color": "#bcbddc", "location": "Basel, Switzerland" },
  { "name": "Roche", "sector": "Healthcare", "color": "#bcbddc", "location": "Basel, Switzerland" },
  { "name": "Sanofi", "sector": "Healthcare", "color": "#bcbddc", "location": "Paris, France" },
  { "name": "Merck & Co.", "sector": "Healthcare", "color": "#bcbddc", "location": "Kenilworth, New Jersey, USA" },
  { "name": "GlaxoSmithKline", "sector": "Healthcare", "color": "#bcbddc", "location": "Brentford, United Kingdom" },
  { "name": "AbbVie", "sector": "Healthcare", "color": "#bcbddc", "location": "North Chicago, Illinois, USA" },
  { "name": "AstraZeneca", "sector": "Healthcare", "color": "#bcbddc", "location": "Cambridge, United Kingdom" },
  { "name": "Gilead Sciences", "sector": "Healthcare", "color": "#bcbddc", "location": "Foster City, California, USA" },
  { "name": "Repsol", "sector": "Energy", "color": "#9ecae1", "location": "Madrid, Spain" },
  { "name": "Total", "sector": "Energy", "color": "#9ecae1", "location": "Courbevoie, France" },
  { "name": "Gazprom", "sector": "Energy", "color": "#9ecae1", "location": "Moscow, Russia" },
  { "name": "Saudi Aramco", "sector": "Energy", "color": "#9ecae1", "location": "Dhahran, Saudi Arabia" },
  { "name": "Petrobras", "sector": "Energy", "color": "#9ecae1", "location": "Rio de Janeiro, Brazil" },
  { "name": "Sinopec", "sector": "Energy", "color": "#9ecae1", "location": "Beijing, China" },
  { "name": "PetroChina", "sector": "Energy", "color": "#9ecae1", "location": "Dongcheng District, Beijing, China" },
  { "name": "Exelon", "sector": "Energy", "color": "#9ecae1", "location": "Chicago, Illinois, USA" },
  { "name": "NextEra Energy", "sector": "Energy", "color": "#9ecae1", "location": "Juno Beach, Florida, USA" },
  { "name": "Duke Energy", "sector": "Energy", "color": "#9ecae1", "location": "Charlotte, North Carolina, USA" },
  { "name": "Enel", "sector": "Energy", "color": "#9ecae1", "location": "Rome, Italy" },
  { "name": "Engie", "sector": "Energy", "color": "#9ecae1", "location": "Courbevoie, France" },
  { "name": "E.ON", "sector": "Energy", "color": "#9ecae1", "location": "Essen, Germany" },
  { "name": "EDF", "sector": "Energy", "color": "#9ecae1", "location": "Paris, France" },
  { "name": "RWE", "sector": "Energy", "color": "#9ecae1", "location": "Essen, Germany" },
  { "name": "Orsted", "sector": "Energy", "color": "#9ecae1", "location": "Fredericia, Denmark" },
  { "name": "Vestas", "sector": "Energy", "color": "#9ecae1", "location": "Aarhus, Denmark" },
  { "name": "Siemens Gamesa", "sector": "Energy", "color": "#9ecae1", "location": "Zamudio, Vizcaya, Spain" },
  { "name": "Equinor", "sector": "Energy", "color": "#9ecae1", "location": "Stavanger, Norway" },
  { "name": "ConocoPhillips", "sector": "Energy", "color": "#9ecae1", "location": "Houston, Texas, USA" },
  { "name": "BP", "sector": "Energy", "color": "#00FF00", "location": "London, England" },
  { "name": "Royal Dutch Shell", "sector": "Energy", "color": "#9ecae1", "location": "The Hague, Netherlands" },
  { "name": "TotalEnergies", "sector": "Energy", "color": "#00FF00", "location": "Courbevoie, France" },
  { "name": "Chevron", "sector": "Energy", "color": "#00FF00", "location": "San Ramon, California, USA" },
  { "name": "ConocoPhillips", "sector": "Energy", "color": "#00FF00", "location": "Houston, Texas, USA" },
  { "name": "Schlumberger", "sector": "Energy", "color": "#00FF00", "location": "Curaçao, Kingdom of the Netherlands" },
  { "name": "TotalEnergies", "sector": "Energy", "color": "#00FF00", "location": "Courbevoie, France" },
  { "name": "BP", "sector": "Energy", "color": "#00FF00", "location": "London, United Kingdom" },
  { "name": "Royal Dutch Shell", "sector": "Energy", "color": "#9ecae1", "location": "The Hague, Netherlands" },
  { "name": "Eni", "sector": "Energy", "color": "#00FF00", "location": "Rome, Italy" },
  { "name": "Equinor", "sector": "Energy", "color": "#00FF00", "location": "Stavanger, Norway" },
  { "name": "Gazprom", "sector": "Energy", "color": "#00FF00", "location": "Moscow, Russia" },
  { "name": "Rosneft", "sector": "Energy", "color": "#00FF00", "location": "Moscow, Russia" },
  { "name": "Lukoil", "sector": "Energy", "color": "#00FF00", "location": "Moscow, Russia" },
  { "name": "Saudi Aramco", "sector": "Energy", "color": "#00FF00", "location": "Dhahran, Saudi Arabia" },
  { "name": "PetroChina", "sector": "Energy", "color": "#00FF00", "location": "Beijing, China" },
  { "name": "Sinopec", "sector": "Energy", "color": "#00FF00", "location": "Beijing, China" },
  { "name": "CNOOC", "sector": "Energy", "color": "#00FF00", "location": "Beijing, China" },
  { "name": "Pemex", "sector": "Energy", "color": "#00FF00", "location": "Mexico City, Mexico" },
  { "name": "Petrobras", "sector": "Energy", "color": "#00FF00", "location": "Rio de Janeiro, Brazil" },
  { "name": "Sonatrach", "sector": "Energy", "color": "#00FF00", "location": "Algiers, Algeria" },
  { "name": "National Iranian Oil Company", "sector": "Energy", "color": "#00FF00", "location": "Tehran, Iran" },
  { "name": "Marathon Petroleum", "sector": "Energy", "color": "#00FF00", "location": "Findlay, Ohio, USA" },
  { "name": "Goldman Sachs", "sector": "Financial", "color": "#FFA500", "location": "New York, New York, USA" },
  { "name": "Morgan Stanley", "sector": "Financial", "color": "#FFA500", "location": "New York, New York, USA" },
  { "name": "Bank of America", "sector": "Financial", "color": "#FFA500", "location": "Charlotte, North Carolina, USA" },
  { "name": "Citigroup", "sector": "Financial", "color": "#FFA500", "location": "New York, New York, USA" },
  { "name": "Sberbank", "sector": "Financial", "color": "#FFA500", "location": "Moscow, Russia" },
  { "name": "VTB Bank", "sector": "Financial", "color": "#FFA500", "location": "Moscow, Russia" },

  { "name": "Industrial and Commercial Bank of China", "sector": "Financial", "color": "#3182bd", "location": "Beijing, China" },
  { "name": "China Construction Bank", "sector": "Financial", "color": "#3182bd", "location": "Beijing, China" },
  { "name": "Agricultural Bank of China", "sector": "Financial", "color": "#3182bd", "location": "Beijing, China" },
  { "name": "Huawei", "sector": "Technology", "color": "#6baed6", "location": "Shenzhen, China" },
  { "name": "Alibaba", "sector": "Technology", "color": "#6baed6", "location": "Hangzhou, China" },
  { "name": "Tencent", "sector": "Technology", "color": "#6baed6", "location": "Shenzhen, China" },
  { "name": "Baidu", "sector": "Technology", "color": "#6baed6", "location": "Beijing, China" },
  { "name": "Yandex", "sector": "Technology", "color": "#6baed6", "location": "Moscow, Russia" },
  { "name": "Mail.Ru Group", "sector": "Technology", "color": "#6baed6", "location": "Moscow, Russia" },
  { "name": "SAP", "sector": "Technology", "color": "#6baed6", "location": "Walldorf, Germany" },
  { "name": "Siemens", "sector": "Technology", "color": "#6baed6", "location": "Munich, Germany" },
  { "name": "Ericsson", "sector": "Technology", "color": "#6baed6", "location": "Stockholm, Sweden" },
  { "name": "Nokia", "sector": "Technology", "color": "#6baed6", "location": "Espoo, Finland" },
  { "name": "Nike", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Beaverton, Oregon, USA" },
  { "name": "Colgate-Palmolive", "sector": "Consumer Goods", "color": "#a1d99b", "location": "New York, New York, USA" },
  { "name": "Unilever", "sector": "Consumer Goods", "color": "#a1d99b", "location": "London, United Kingdom & Rotterdam, Netherlands" },
  { "name": "Nestlé", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Vevey, Switzerland" },
  { "name": "P&G Europe", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Cincinnati, Ohio, USA" },
  { "name": "Estée Lauder", "sector": "Consumer Goods", "color": "#a1d99b", "location": "New York, New York, USA" },
  { "name": "PepsiCo Europe", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Purchase, New York, USA" },
  { "name": "Adidas", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Herzogenaurach, Germany" },
  { "name": "L'Oréal", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Clichy, France" },
  { "name": "Reckitt Benckiser", "sector": "Consumer Goods", "color": "#a1d99b", "location": "Slough, United Kingdom" },
  { "name": "Marriott International", "sector": "Hospitality", "color": "#fc9272", "location": "Bethesda, Maryland, USA" },
  { "name": "Hilton Worldwide", "sector": "Hospitality", "color": "#fc9272", "location": "McLean, Virginia, USA" },
  { "name": "Accor", "sector": "Hospitality", "color": "#fc9272", "location": "Issy-les-Moulineaux, France" },
  { "name": "InterContinental Hotels", "sector": "Hospitality", "color": "#fc9272", "location": "Denham, United Kingdom" },
  { "name": "Wyndham Destinations", "sector": "Hospitality", "color": "#fc9272", "location": "Orlando, Florida, USA" },
  { "name": "Choice Hotels", "sector": "Hospitality", "color": "#fc9272", "location": "Rockville, Maryland, USA" },
  { "name": "Best Western", "sector": "Hospitality", "color": "#fc9272", "location": "Phoenix, Arizona, USA" },
  { "name": "Hyatt Hotels", "sector": "Hospitality", "color": "#fc9272", "location": "Chicago, Illinois, USA" },
  { "name": "Radisson Hotel Group", "sector": "Hospitality", "color": "#fc9272", "location": "Minnetonka, Minnesota, USA" },
  { "name": "Starwood Hotels", "sector": "Hospitality", "color": "#fc9272", "location": "Stamford, Connecticut, USA" },
  { "name": "Roche", "sector": "Healthcare", "color": "#bcbddc", "location": "Basel, Switzerland" }

  
]
const myGraph = new Graph('canvasContainer');
myGraph.drawGraph(companiesData);














//--------------------------EJEMPLO QUE FUNCIONA -------------------------------------
// // Crear la clase Graph
// class Graph {
//   constructor(containerId) {
//     this.ForceGraph3D = window.ForceGraph3D.default || window.ForceGraph3D;
//     this.graph = this.ForceGraph3D()(document.getElementById(containerId));
//   }

//   // Generar los nodos
//   generateNodes(n) {
//     let nodes = [];
//     for (let i = 1; i <= n; i++) {
//       nodes.push({ "id": "Node " + i });
//     }
//     return nodes;
//   }

//   // Generar los enlaces
//   generateLinks(nodes) {
//     let links = [];
//     for (let i = 0; i < nodes.length; i++) {
//       for (let j = i + 1; j < nodes.length; j++) {
//         links.push({ "source": nodes[i].id, "target": nodes[j].id });
//       }
//     }
//     return links;
//   }

//   // Crear los datos del gráfico
//   createGraphData(nodes, links) {
//     return {
//       "nodes": nodes,
//       "links": links
//     };
//   }

//   // Configurar y dibujar el gráfico
//   drawGraph(nodesNumber) {
//     const nodes = this.generateNodes(nodesNumber);
//     const links = this.generateLinks(nodes);
//     const graphData = this.createGraphData(nodes, links);

//     this.graph.graphData(graphData)
//       .nodeLabel('id')
//       .nodeAutoColorBy('id');
//   }
// }

// // Uso
// const myGraph = new Graph('canvasContainer');
// myGraph.drawGraph(30);  // Dibuja un gráfico con 30 nodos



//----------------EJEMPLO CON OBSEI----------------------------------------------------------

// import { newsData } from '../graphql/schema.js';

// // Crear la clase Graph
// class Graph {
//   constructor(containerId) {
//     this.ForceGraph3D = window.ForceGraph3D.default || window.ForceGraph3D;
//     this.graph = this.ForceGraph3D()(document.getElementById(containerId));
//   }

//   // Generar los enlaces
//   generateLinks(news) {
//     let links = [];
//     for (let i = 0; i < news.length; i++) {
//       for (let j = i + 1; j < news.length; j++) {
//         links.push({ "source": news[i].id, "target": news[j].id });
//       }
//     }
//     return links;
//   }

//   // Crear los datos del gráfico
//   createGraphData(news, links) {
//     return {
//       "nodes": news,
//       "links": links
//     };
//   }

//   // Configurar y dibujar el gráfico
//   drawGraph(news) {
//     const links = this.generateLinks(news);
//     const graphData = this.createGraphData(news, links);

//     this.graph.graphData(graphData)
//       .nodeLabel('title') // ahora los nodos son noticias, así que usamos 'title' en lugar de 'id'
//       .nodeAutoColorBy('id');
//   }
// }

// // Uso
// const myGraph = new Graph('canvasContainer');
// myGraph.drawGraph(newsData);  // Dibuja un gráfico con las noticias
