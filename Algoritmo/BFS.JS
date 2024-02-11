//OBJETOS USADOS PARA BFS
/* let objetos = [
    {
      pacienteId: 1,
      ligação: [3, 11],
      pacienteName: "Victor Mesquita",
    },
    {
      pacienteId: 2,
      ligação: [3,10,5],
      pacienteName: "João Silva",
    },
    {
      pacienteId: 3,
      ligação: [1,2,6],
      pacienteName: "Maria Souza",
    },
    {
      pacienteId: 4,
      ligação: [11,7,12],
      pacienteName: "Carlos Santos",
    },
    {
      pacienteId: 5,
      ligação: [2],
      pacienteName: "Ana Oliveira",
    },
    {
      pacienteId: 6,
      ligação: [3,8,9,13],
      pacienteName: "Pedro Lima",
    },
    {
      pacienteId: 7,
      ligação: [4],
      pacienteName: "Pedro Lima",
    },
    {
      pacienteId: 8,
      ligação: [6],
      pacienteName: "Pedro Lima",
    },
    {
      pacienteId: 9,
      ligação: [6,13],
      pacienteName: "Pedro Lima",
    },
    {
      pacienteId: 10,
      ligação: [2],
      pacienteName: "Pedro Lima",
    },
    {
      pacienteId: 11,
      ligação: [1,4,13],
      pacienteName: "Pedro Lima",
    },
    {
      pacienteId: 12,
      ligação: [4],
      pacienteName: "Pedro Lima",
    },
    {
      pacienteId: 13,
      ligação: [11,6,9],
      pacienteName: "Pedro Lima",
    },
  ]; */

//FUNÇÃO QUE VAI CRIAR OS NODES DE ACORDO COM O MODEL
/* function createNodesFromObjects(objList) {
    let nodes = {};

    // Cria um nó para cada objeto e armazena no objeto nodes
    for (let obj of objList) {
      let id = obj.pacienteId;
      nodes[id] = new Node(id);
    }

    // Adiciona os vizinhos adjacentes a cada nó
    for (let obj of objList) {
      let id = obj.pacienteId;
      let neighbors = obj.ligação;

      for (let neighborId of neighbors) {
        if (nodes[neighborId]) {
          nodes[id].adjacents.push(nodes[neighborId]);
        }
      }
    }

    // Retorna a lista de nós criados
    return Object.values(nodes);
  } */

// Classe para representar um nó no grafo
/* class Node {
    constructor(value) {
      this.value = value;
      this.adjacents = [];
      this.visited = false;
    }
  } */

// Função para realizar a busca em largura no grafo
/* function bfs(startNode, targetValue) {
    // Inicializa a fila e insere o nó inicial
    let queue = [];
    queue.push(startNode);

    // Inicializa o contador de etapas
    let steps = 0;
    let caminho = [];

    // Enquanto a fila não estiver vazia
    while (queue.length > 0) {
        // Retira o primeiro elemento da fila
        let currentNode = queue.shift();

        // Verifica se o nó já foi visitado
        if (!currentNode.visited) {
            // Marca o nó como visitado
            currentNode.visited = true;

            // Incrementa o contador de etapas
            caminho.push(currentNode.value + "->");
            steps++;

            // Verifica se encontramos o valor alvo
            if (currentNode.value === targetValue) {
                return { node: currentNode, steps: steps, caminho: caminho };
            }

            // Adiciona todos os nós adjacentes não visitados à fila
            for (let adjacentNode of currentNode.adjacents) {
                if (!adjacentNode.visited) {
                    queue.push(adjacentNode);
                }
            }
        }
    }

    // Se o valor alvo não for encontrado, retorna null
    return { node: null, steps: steps };
} */

//CHAMADA NA FUNÇÃO DE BUSCA QUE VAMOS USAR NO INPUT
/* 
    e.preventDefault();
    
    let nodes = createNodesFromObjects(objetos);
    console.log(nodes);

    let result = bfs(nodes[0], 9);

    if (result !== null) {
    console.log("Nó encontrado:", result);
    console.log("A distância é:", result.steps);
    console.log("O caminho é:", result.caminho.join("") + "Fim");
  } else {
    console.log("Valor não encontrado!");
  }
*/