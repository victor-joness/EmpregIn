import React, { useEffect, useState } from "react";

import "./Algoritm.css";

import { useSelector } from "react-redux";

import NavBar from "../../Components/NavBar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Algoritm = (props) => {
  document.title = "Algoritmo | EmpregIn";

  const user = useSelector((state) => state.user);

  return (
    <div className="algoritmo-container">
      <NavBar />
      <div className="algoritmo-layout">
        <h1 className="title-page">Algoritmo de Busca em Largura (BFS)</h1>
        <p className="text">
          O algoritmo de busca em largura (BFS, do inglês Breadth-First Search)
          é uma técnica fundamental utilizada em teoria dos grafos para explorar
          ou realizar buscas através de grafos, que são estruturas compostas por
          vértices (ou nós) e arestas (conexões entre os nós). Este algoritmo é
          amplamente utilizado em diversas aplicações, como redes de
          computadores, inteligência artificial, análise de redes sociais e
          problemas de otimização.
        </p>
        <h2 className="subtitle-page">Como Funciona o BFS?</h2>
        <p className="text">
          O BFS opera de maneira sistemática, explorando todos os vértices de um
          grafo que estão a uma mesma distância de um vértice inicial antes de
          prosseguir para os vértices mais distantes. A ideia principal é
          explorar o grafo camada por camada, começando pelo vértice inicial e
          expandindo para todos os vértices conectados a ele.
        </p>
        <h3 className="subtitle-h3-page">
          Aqui está um resumo do funcionamento do BFS:
        </h3>
        <p className="text-h3">
          Escolha do Vértice Inicial: O algoritmo começa por escolher um vértice
          inicial, de onde a busca será iniciada.
        </p>
        <p className="text-h3">
          Estrutura de Dados Utilizada: O BFS utiliza uma fila (queue) para
          gerenciar a ordem em que os vértices são visitados. Inicialmente, o
          vértice inicial é colocado na fila.
        </p>
        <h3 className="subtitle-h3-page">Exploração dos Vértices:</h3>
        <p className="text-h3">
          O algoritmo retira um vértice da fila, o que significa que ele está
          sendo explorado. Em seguida, ele verifica todos os vértices adjacentes
          a esse vértice, ou seja, aqueles que estão conectados diretamente a
          ele por uma aresta.
        </p>
        <p className="text-h3">
          Se um vértice adjacente ainda não foi visitado, ele é marcado como
          visitado e adicionado à fila para exploração futura. Repetição: Esse
          processo de retirar vértices da fila, explorar seus adjacentes e
          adicionar os não visitados à fila continua até que a fila esteja
          vazia. Quando a fila esvazia, significa que todos os vértices
          conectados ao vértice inicial foram explorados.
        </p>
        <div className="box-gif">
          <img
            src="Images\Gif_Busca_Em_Largura.gif"
            alt="Gif de Busca em Largura"
          />
          <span className="text-demonstration-img">
            Gif para Demonstrar a Busca em Largura
          </span>
        </div>
        <h2 className="subtitle-page">Características do BFS</h2>
        <p className="text-h3">
          Busca em Largura: Como o nome sugere, o BFS explora o grafo em termos
          de largura, visitando todos os vértices em um determinado nível de
          profundidade antes de prosseguir para o próximo nível.
        </p>
        <p className="text-h3">
          Distância Mínima: O BFS é particularmente útil para encontrar o
          caminho mais curto em um grafo não ponderado (onde todas as arestas
          têm o mesmo peso). A primeira vez que um vértice é visitado, ele é
          alcançado pelo caminho mais curto possível a partir do vértice
          inicial.
        </p>
        <p className="text-h3">
          Completo e Ótimo: Se o grafo é finito e não cíclico, o BFS garantirá
          que todos os vértices acessíveis sejam visitados, sendo, portanto,
          completo. Além disso, ele encontra o caminho mais curto, tornando-o
          ótimo nesse sentido.
        </p>
        <h2 className="subtitle-page">Ideia do Algoritmo no Nosso Projeto</h2>
        <p className="text">
          Imagine uma plataforma de rede social, como o Facebook ou LinkedIn,
          onde a empresa deseja sugerir novas conexões para os usuários com base
          em amigos em comum ou em sua rede próxima. O algoritmo BFS pode ser
          utilizado para determinar quais pessoas estão a uma ou duas conexões
          de distância, o que aumenta a probabilidade de uma recomendação
          relevante.
        </p>
        <h3 className="subtitle-h3-page">Cenário</h3>
        <ul>
          <li>
            Suponha que cada usuário seja representado por um nó (ou vértice) e
            cada conexão de amizade seja representada por uma aresta.
          </li>
          <li>
            O objetivo é sugerir amigos de "amigos de amigos", ou seja, pessoas
            que estão a dois graus de separação do usuário, ou simplesmente
            facilitar a busca nessa nivelação.
          </li>
        </ul>
        <h3 className="subtitle-h3-page">
          Funcionamento do BFS neste contexto:
        </h3>
        <ol>
          <li>
            Vértice Inicial: O BFS começa com o nó que representa o usuário
            (chamado de "Usuário A").
          </li>
          <li>
            Exploração em Camadas:
            <ul>
              <li>
                O BFS vai primeiramente explorar todos os amigos diretos do
                Usuário A (amigos no primeiro grau de separação).
              </li>
              <li>
                Em seguida, o BFS explora os amigos desses amigos (amigos de
                segundo grau de separação), que são potenciais sugestões de
                novas conexões para o Usuário A.
              </li>
            </ul>
          </li>
          <li>
            Marcação de Visitados: Para evitar repetir ou considerar amigos já
            existentes, o BFS marca todos os amigos diretos do Usuário A como
            "visitados" e só adiciona à lista de sugestões os amigos dos amigos
            que ainda não estão conectados diretamente ao Usuário A.
          </li>
          <li>
            Por fim, o Usuário A poderá verificar o perfil de uma pessoa de 2º
            grau de conexão ou mais, ou seja, amigos de amigos já existentes, e
            decidir se deseja adicioná-la à sua lista de amigos ou apenas
            analisar o perfil dessa pessoa.
          </li>
        </ol>
        <div className="box-imgs">
          <div className="box-img">
            <img
              src="Images\Exemplo_BFS_Rede_Social.png"
              alt="Exemplo de Contato Entre Pessoas"
            />
            <span className="text-demonstration-img">
              Uma Imagem para Exemplificar como Funciona o Algoritmo Conectando
              Pessoas
            </span>
          </div>
          <div className="box-img">
            <img
              src="Images\Exemplo_BFS_Rede_Social2.png"
              alt="Outro Exemplo de Contato Entre Pessoas"
            />
            <span className="text-demonstration-img">
              Outra Imagem com Mesmo Objetivo de Apresentar a Ideia
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Algoritm;
