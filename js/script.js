// 1. Tema: a escolha vale para todas as páginas do portfólio.
const botaoTema = document.getElementById("botao-tema");
const chaveTema = "tema-portfolio-luis";
const abertoComoArquivo = window.location.protocol === "file:";
const linksInternos = document.querySelectorAll('a[href$=".html"], a[href*=".html#"]');

function aplicarTema(tema) {
    if (tema === "escuro") {
        document.body.classList.remove("tema-claro");
        botaoTema.textContent = "Tema claro";
    } else {
        document.body.classList.add("tema-claro");
        botaoTema.textContent = "Tema escuro";
    }

    // Em file://, o navegador pode guardar preferências separadas para cada HTML.
    if (abertoComoArquivo) {
        for (const link of linksInternos) {
            const destino = new URL(link.href);
            destino.searchParams.set("tema", tema);
            link.href = destino.href;
        }
    }
}

const temaNaUrl = new URLSearchParams(window.location.search).get("tema");
let temaInicial = window.history.state?.tema || temaNaUrl;

try {
    if (!temaInicial) {
        temaInicial = localStorage.getItem(chaveTema);
    }
} catch {
    // A troca de tema continua disponível sem acesso ao armazenamento.
}

if (temaInicial === "claro") {
    aplicarTema("claro");
} else {
    aplicarTema("escuro");
}

botaoTema.addEventListener("click", function () {
    let tema;

    if (document.body.classList.contains("tema-claro")) {
        tema = "escuro";
    } else {
        tema = "claro";
    }

    aplicarTema(tema);

    try {
        localStorage.setItem(chaveTema, tema);
    } catch {
        // Os links ainda carregam a escolha na navegação local.
    }

    if (abertoComoArquivo) {
        // Guarda a escolha desta visita sem recarregar a página.
        window.history.replaceState({ tema }, "");
    }
});

// 2. Projetos: cada objeto alimenta uma cópia do modelo de projetos.html.
const projetos = [
    {
        id: "radar",
        titulo: "Radar de Licitações Ambientais",
        problema: "Na Progaia Engenharia, eu procurava editais de meio ambiente e engenharia e acompanhava os prazos de cada oportunidade. Desenvolvi o Radar e coloquei a ferramenta em uso no setor para automatizar a busca no PNCP e organizar a triagem.",
        stack: ["Python", "API REST", "JSON", "SQLite", "pandas", "Excel"],
        resultado: "A equipe consulta prazos e links dos editais na planilha, registra quais oportunidades já captou e decide de quais licitações participar.",
        descricao: "O Radar valida o arquivo de configuração antes da coleta. Se uma consulta esgotar as tentativas, o programa identifica a planilha como parcial e permite retomar a busca do ponto em que ela parou.",
        etapas: [
            {
                titulo: "Coleta no PNCP",
                texto: "Consulta propostas abertas nas 27 UFs, por modalidade. Os parâmetros da busca ficam em um arquivo JSON."
            },
            {
                titulo: "Triagem e histórico",
                texto: "Usa palavras-chave com pesos e regras de contexto para priorizar os editais. Registra novas oportunidades e alterações no SQLite."
            },
            {
                titulo: "Acompanhamento no Excel",
                texto: "Gera uma planilha diária com abas para oportunidades em aberto, novidades, atualizações e acompanhamento. Preserva as marcações da equipe."
            }
        ],
        repositorio: "https://github.com/Luisgoncalves12/Radar-de-Licitacoes-ambientais",
        capturas: [
            {
                caminho: "../img/radar-em-aberto.png",
                alt: "Aba Em Aberto com editais, dias restantes e prazos de envio das propostas",
                legenda: "Aba Em Aberto, com prazos das propostas e marcações de captação."
            },
            {
                caminho: "../img/radar-situacao-editais.png",
                alt: "Colunas da planilha com fonte orçamentária, pontuação, situação e termos encontrados",
                legenda: "Situação dos editais, fontes orçamentárias e termos identificados na busca."
            },
            {
                caminho: "../img/radar-triagem.png",
                alt: "Detalhe da planilha com prioridades e descrições dos editais",
                legenda: "Detalhe da triagem, com destaque para prioridades como DNIT."
            },
            {
                caminho: "../img/radar-motivo-desinteresse.png",
                alt: "Planilha do Radar com a lista de motivos de desinteresse aberta",
                legenda: "Lista de motivos de desinteresse na planilha do Radar."
            },
            {
                caminho: "../img/radar-validacao-json.png",
                alt: "Código em Python que lê o JSON de configuração e trata erros de leitura",
                legenda: "Leitura e validação da configuração antes da coleta."
            },
            {
                caminho: "../img/radar-modulos.png",
                alt: "Arquivos Python do Radar separados em módulos de coleta, classificação, banco e planilhas",
                legenda: "Organização do código do Radar em módulos."
            },
            {
                caminho: "../img/radar-planilhas-parciais.png",
                alt: "Pasta com planilhas datadas, incluindo arquivos de coletas parciais",
                legenda: "As coletas incompletas ficam identificadas no nome da planilha."
            }
        ]
    },
    {
        id: "gasolina",
        titulo: "Monitoramento de preços da gasolina",
        problema: "Queria acompanhar a variação dos preços da gasolina em Brasília com dados da ANP.",
        stack: ["Python", "pandas", "SQLite", "smtplib", "ETL", "Git"],
        resultado: "Histórico de preços e um alerta por e-mail que mostra o período comparado, a variação e os preços mínimo e máximo.",
        descricao: "O programa lê o CSV da ANP, filtra e limpa os registros de gasolina do Distrito Federal e calcula estatísticas por data da coleta. Salva os resultados em SQLite com controle de duplicatas. A regra de envio usa 2% de variação semanal como limite.",
        repositorio: "https://github.com/Luisgoncalves12/gasolina-em-tempo-real",
        capturas: [
            {
                caminho: "../img/gasolina-capa.png",
                alt: "Arte do monitor de gasolina com uma bomba de combustível e a ilustração de um alerta por e-mail",
                legenda: "Arte de apresentação do monitor de preços da gasolina."
            },
            {
                caminho: "../img/gasolina-base-anp.png",
                alt: "Tabela da ANP com preços de combustíveis de postos em diferentes estados",
                legenda: "Base original da ANP antes do filtro por localidade e combustível."
            },
            {
                caminho: "../img/gasolina-base-brasilia.png",
                alt: "Tabela filtrada com preços de gasolina comum e aditivada em postos de Brasília",
                legenda: "Registros de Brasília após o filtro, antes do cálculo dos preços por dia."
            },
            {
                caminho: "../img/gasolina-precos-diarios.png",
                alt: "Tabela do projeto com data da coleta, preços médio, mínimo e máximo e quantidade de postos",
                legenda: "Resultado do agrupamento dos preços por data da coleta."
            },
            {
                caminho: "../img/gasolina-alerta-email.png",
                alt: "E-mail do monitor com preços de duas coletas, variação de 0,18% e valores mínimo e máximo",
                legenda: "Exemplo de e-mail do monitor, com a comparação entre duas coletas."
            }
        ]
    },
    {
        id: "gatito",
        titulo: "Dashboard Gatito Petshop",
        problema: "No curso Power BI Desktop da Alura, usei dados fictícios de um petshop para praticar a criação de indicadores de vendas.",
        stack: ["Power BI"],
        resultado: "Painel interativo com indicadores de faturamento e vendas, com uma versão para celular.",
        descricao: "O relatório mostra a evolução do faturamento e um ranking por bairro. Os filtros por marca e período atualizam os gráficos em conjunto. Também montei uma versão para celular com os principais indicadores.",
        capturas: [
            {
                caminho: "../img/gatito-desktop.png",
                alt: "Dashboard Gatito Petshop no Power BI com indicadores, gráficos de faturamento e filtro de categoria",
                legenda: "Visão geral do painel no computador."
            },
            {
                caminho: "../img/gatito-mobile-indicadores.png",
                alt: "Versão para celular com faturamento, quantidade de vendas, média de pets e filtros",
                legenda: "Versão para celular com indicadores de vendas e filtros de marca e período."
            },
            {
                caminho: "../img/gatito-mobile-genero-bairro.png",
                alt: "Versão para celular com gráfico de faturamento por gênero e ranking por bairro",
                legenda: "Faturamento por gênero e por bairro na versão para celular."
            },
            {
                caminho: "../img/gatito-mobile-categoria-faturamento.png",
                alt: "Versão para celular com categorias de produtos e gráfico de faturamento ao longo do tempo",
                legenda: "Categorias de produtos e evolução do faturamento na versão para celular."
            }
        ]
    },
    {
        id: "echoes",
        titulo: "Echoes of Corruption",
        problema: "Criei um RPG de terminal para praticar como organizar o código de um jogo e salvar o progresso do personagem.",
        stack: ["Python", "SQLite"],
        resultado: "Um jogo com combate por turnos, campanha com múltiplos finais e progresso salvo localmente.",
        descricao: "Separei o combate, os dados do mundo e o armazenamento em módulos. As escolhas do jogador alteram os níveis de moral e corrupção, que influenciam o desfecho da campanha.",
        repositorio: "https://github.com/Luisgoncalves12/echoes-of-corruption",
        capturas: [
            {
                caminho: "../img/echoes-capa.png",
                alt: "Ilustração das áreas da campanha de Echoes of Corruption, da vila inicial ao castelo final",
                legenda: "Ilustração do mundo e dos caminhos da campanha."
            },
            {
                caminho: "../img/echoes-combate.png",
                alt: "Arte com uma representação do combate por turnos no terminal e dos módulos do jogo",
                legenda: "Arte de apresentação do combate e da estrutura do projeto."
            }
        ]
    }
];

function mostrarProjetos(lista) {
    const modelo = document.getElementById("modelo-projeto");

    for (const projeto of projetos) {
        const card = modelo.content.cloneNode(true);
        const artigo = card.querySelector(".projeto");
        const resultado = card.querySelector(".projeto-resultado");
        const tecnologias = card.querySelector(".projeto-stack");
        const botao = card.querySelector(".botao-detalhes");
        const detalhes = card.querySelector(".projeto-detalhes");
        const descricao = card.querySelector(".projeto-descricao");
        const link = card.querySelector(".projeto-link");

        artigo.id = projeto.id;
        card.querySelector(".projeto-titulo").textContent = projeto.titulo;
        card.querySelector(".projeto-problema").textContent = projeto.problema;

        for (const item of projeto.stack) {
            const tecnologia = document.createElement("li");
            tecnologia.textContent = item;
            tecnologias.append(tecnologia);
        }

        const rotulo = document.createElement("strong");
        rotulo.textContent = "Resultado: ";
        resultado.append(rotulo, projeto.resultado);

        if (projeto.repositorio) {
            link.href = projeto.repositorio;
            link.classList.remove("oculto");
        }

        if (projeto.etapas) {
            artigo.classList.add("projeto-principal");
            link.classList.add("botao", "botao-primario");
            card.querySelector(".projeto-fluxo").classList.remove("oculto");
            const etapas = card.querySelector(".projeto-etapas");

            for (const etapa of projeto.etapas) {
                const item = document.createElement("li");
                const titulo = document.createElement("strong");
                const texto = document.createElement("p");
                titulo.textContent = etapa.titulo;
                texto.textContent = etapa.texto;
                item.append(titulo, texto);
                etapas.append(item);
            }
        }

        detalhes.id = "detalhes-" + projeto.id;
        botao.setAttribute("aria-controls", detalhes.id);
        botao.addEventListener("click", function () {
            if (detalhes.classList.contains("oculto")) {
                descricao.textContent = projeto.descricao;
                detalhes.classList.remove("oculto");
                botao.setAttribute("aria-expanded", "true");
                botao.textContent = "Ocultar detalhes";
            } else {
                detalhes.classList.add("oculto");
                botao.setAttribute("aria-expanded", "false");
                botao.textContent = "Ver detalhes";
            }
        });

        if (projeto.capturas.length > 0) {
            montarGaleria(card, projeto);
        }

        lista.append(card);
    }
}

// 3. Galeria: um índice indica a captura exibida em cada projeto.
function montarGaleria(card, projeto) {
    const visual = card.querySelector(".projeto-visual");
    const imagem = visual.querySelector("img");
    const legenda = visual.querySelector(".captura-legenda");
    const link = visual.querySelector(".captura-link");
    const navegacao = visual.querySelector(".galeria-navegacao");
    let indice = 0;

    function exibirCaptura() {
        const captura = projeto.capturas[indice];
        imagem.src = captura.caminho;
        imagem.alt = captura.alt;
        link.href = captura.caminho;
        legenda.textContent = captura.legenda;

        if (projeto.capturas.length > 1) {
            legenda.textContent = (indice + 1) + " de " + projeto.capturas.length + " · " + captura.legenda;
        }
    }

    function trocarCaptura(direcao) {
        indice = indice + direcao;

        if (indice < 0) {
            indice = projeto.capturas.length - 1;
        } else if (indice >= projeto.capturas.length) {
            indice = 0;
        }

        exibirCaptura();
    }

    exibirCaptura();
    visual.classList.remove("oculto");

    if (projeto.capturas.length > 1) {
        const anterior = navegacao.querySelector(".galeria-anterior");
        const proxima = navegacao.querySelector(".galeria-proxima");
        imagem.id = "captura-" + projeto.id;
        navegacao.setAttribute("aria-label", "Imagens de " + projeto.titulo);
        anterior.setAttribute("aria-controls", imagem.id);
        proxima.setAttribute("aria-controls", imagem.id);
        navegacao.classList.remove("oculto");

        anterior.addEventListener("click", function () {
            trocarCaptura(-1);
        });

        proxima.addEventListener("click", function () {
            trocarCaptura(1);
        });
    }
}

const listaProjetos = document.getElementById("lista-projetos");

if (listaProjetos) {
    mostrarProjetos(listaProjetos);

    // Os atalhos do início apontam para artigos criados acima.
    const destino = document.getElementById(window.location.hash.slice(1));
    if (destino) {
        destino.scrollIntoView();
    }
}

// 4. Formulário: verifica os campos apenas na página Contato.
const formulario = document.getElementById("formulario");

if (formulario) {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
    const retorno = document.getElementById("retorno-formulario");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        nome.removeAttribute("aria-invalid");
        email.removeAttribute("aria-invalid");
        mensagem.removeAttribute("aria-invalid");

        const endereco = email.value.trim();
        let campoComErro;

        if (nome.value.trim() === "") {
            retorno.textContent = "Informe seu nome.";
            campoComErro = nome;
        } else if (endereco === "") {
            retorno.textContent = "Informe seu e-mail.";
            campoComErro = email;
        } else if (!email.validity.valid || !endereco.includes("@") || endereco.lastIndexOf(".") <= endereco.indexOf("@")) {
            retorno.textContent = "Informe um e-mail válido, como nome@exemplo.com.";
            campoComErro = email;
        } else if (mensagem.value.trim() === "") {
            retorno.textContent = "Escreva sua mensagem.";
            campoComErro = mensagem;
        } else {
            retorno.textContent = "Campos validados. Para falar comigo, use o link de e-mail.";
        }

        if (campoComErro) {
            campoComErro.setAttribute("aria-invalid", "true");
            campoComErro.focus();
        }
    });

    document.getElementById("validar-formulario").disabled = false;
}
