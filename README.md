# Agend.ai — Landing page de validação

![Identidade visual do Agend.ai](./logo-full-dark.svg)

**Protótipo front-end · Startup Weekend Fortaleza 2026 · HTML, CSS e JavaScript**

Uma landing page criada para apresentar e explorar o interesse em uma proposta de organização pessoal com **rotina flexível**, interface simples e elementos de gamificação.

> **Estado do projeto:** protótipo de apresentação e pesquisa de interesse. Este repositório **não contém um aplicativo de agenda completo, integração ativa com IA, WhatsApp ou pagamentos**.

## Contexto

O Agend.ai foi uma proposta trabalhada em equipe durante o **Startup Weekend Fortaleza 2026**, evento de empreendedorismo com tempo limitado para explorar um problema, estruturar uma solução e apresentar um protótipo.

A hipótese de produto era oferecer uma experiência de organização que se ajustasse aos imprevistos do cotidiano, em vez de depender de uma agenda rígida. A landing page foi construída para **comunicar essa proposta** e simular uma parte da experiência, **não para demonstrar demanda validada ou um serviço pronto para uso**.

Este repositório registra a entrega de front-end dessa experiência. A proposta de produto foi desenvolvida em equipe; o código aqui publicado documenta a landing page.

## O que foi implementado

| Recurso | Implementação | Situação |
| --- | --- | --- |
| Apresentação do conceito | Seções informativas, identidade visual e navegação | Funcional |
| Layout responsivo | Estilos adaptados para diferentes larguras de tela | Implementado |
| Demonstração de tarefas | Checkboxes, progresso e pontuação atualizados no navegador | Interativo, demonstrativo |
| Simulação de imprevisto | Botão que altera visualmente o horário de uma tarefa | Interativo, **não automático** |
| Planos Free e Premium | Comparação de duas hipóteses de oferta e fluxo de escolha | Demonstrativo, sem cobrança |
| Lista de espera | Formulário opcional com integração prevista via Formspree | **Depende de configuração externa** |
| Medição de interesse | Eventos de clique preparados para Google Analytics 4, com consentimento | **Depende de configuração externa** |
| Acesso a protótipo externo | QR Code e link de navegação para outro protótipo | Link externo; protótipo não hospedado aqui |
| Informações de privacidade | Página explicativa e aviso de consentimento para análise | Texto provisório; exige revisão antes de coletar dados |

Os recursos demonstrativos usam JavaScript no navegador. **A interface não salva tarefas nem reorganiza uma agenda real.**

## Tecnologias

- **HTML5:** estrutura semântica e navegação da página.
- **CSS3:** layout, identidade visual, responsividade e estados de interface.
- **JavaScript (vanilla):** interações, demonstração de tarefas, seleção de planos e comportamento do formulário.
- **Git e GitHub:** versionamento e organização dos arquivos.
- **GitHub Pages:** opção de publicação como site estático, sem servidor de aplicação.

**Integrações opcionais:** Google Analytics 4 (eventos com consentimento) e Formspree (envio da lista de espera). Os respectivos identificadores **não estão configurados** no repositório.

Não há framework front-end, backend, banco de dados, integração com modelo de linguagem ou automação de WhatsApp neste código.

## Estrutura do repositório

```text
agendai-landing/
├── index.html           # Página principal e apresentação dos planos
├── style.css            # Estilização e responsividade
├── app.js               # Interatividade da demonstração e navegação
├── reserva.html         # Tela de interesse / lista de espera
├── reserva.js           # Validação e envio opcional do formulário
├── analytics.js         # Medição de eventos mediante consentimento
├── config.js            # Configurações públicas das integrações
├── privacidade.html     # Informações provisórias de privacidade
├── admin.html           # Orientações para consultar serviços externos
├── *.svg                # Elementos gráficos, logos e QR Code
└── README_PUBLICAR.md   # Instruções de publicação e configuração
```

> `admin.html` **não é um painel administrativo com autenticação ou métricas próprias**. É uma página de orientação sobre o uso dos serviços externos.

## Como executar

O projeto é estático: **não exige `npm install`, build ou banco de dados**.

```bash
git clone https://github.com/Luan-Sz/agendai-landing.git
cd agendai-landing
```

Abra o arquivo `index.html` em um navegador. Se preferir servir os arquivos por HTTP e tiver Python instalado, execute:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. No Windows, `py -m http.server 8000` também pode funcionar.

### Configuração opcional

O arquivo `config.js` contém dois campos públicos:

- `ga4MeasurementId`: identificador de medição do Google Analytics 4;
- `formspreeEndpoint`: endereço público de um formulário do Formspree.

Com os campos vazios, **a análise de cliques não é enviada e a lista de espera não aceita inscrições**. A página informa essa limitação ao visitante.

Antes de habilitar coleta de informações reais, é necessário revisar `privacidade.html`, definir contato e procedimentos de tratamento de dados e testar o fluxo de consentimento.

**Nunca publique senhas, chaves privadas ou tokens secretos no `config.js`**: todo o código de um site estático fica acessível ao navegador.

Consulte [README_PUBLICAR.md](./README_PUBLICAR.md) para as instruções de publicação no GitHub Pages e de configuração das integrações.

## Escopo e limitações

Este trabalho foi feito como **experimento de prototipação**, não como produto comercial em produção. Em particular:

- A adaptação da rotina é uma simulação visual; **não há IA ou reagendamento inteligente**.
- O uso pelo WhatsApp é uma **proposta futura**, não uma integração implementada.
- Preços e limites de tokens são **hipóteses de pesquisa**, sem contratação ou cobrança.
- O projeto não possui autenticação, persistência de tarefas, backend ou dashboard de métricas.
- Não há resultados de negócio ou indicadores de validação publicados neste repositório.

## Aprendizados e possibilidades de evolução

A entrega permitiu exercitar **construção rápida de interfaces**, estados interativos com JavaScript, comunicação transparente do estágio de um produto e colaboração em um contexto de prazo curto.

Possíveis evoluções, caso o projeto seja retomado: testes de interface e acessibilidade, revisão da documentação de privacidade, configuração e validação das métricas, entrevistas com usuários e **apenas depois** decisões sobre integrações e arquitetura de uma aplicação funcional.

---

**Contexto:** Startup Weekend Fortaleza · novembro de 2026  
**Repositório mantido por:** [Luan Rafael](https://github.com/Luan-Sz)

*O código demonstra uma entrega de front-end. Não representa um sistema de IA funcional nem comprova validação comercial da ideia.*
