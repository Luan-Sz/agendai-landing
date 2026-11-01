# Agenda.ai — versão para GitHub Pages (SEM Python)

Esta pasta contém a landing page ESTÁTICA. O `server.py` e o banco SQLite da versão local não funcionam no GitHub Pages.

## Publicar sem terminal/Git

1. Crie um repositório no GitHub, por exemplo `agendai-landing` (no plano gratuito, público).
2. Entre no repositório → **Add file** → **Upload files**.
3. Envie os arquivos da **raiz desta pasta**, inclusive `index.html`, `style.css`, `app.js`, `config.js`, `analytics.js`, `reserva.html`, `reserva.js` e os `.svg`. NÃO envie a pasta como uma única subpasta.
4. Clique **Commit changes**.
5. Entre em **Settings → Pages → Build and deployment → Deploy from a branch**.
6. Escolha `main` e `/(root)` → **Save**.
7. Aguarde a publicação e veja o endereço exibido em **Settings → Pages**.

O endereço normalmente terá o formato: `https://SEU_USUARIO.github.io/agendai-landing/`.

## Manter o experimento funcionando

**A seleção de um plano** abre `reserva.html?plano=free`, `standard` ou `premium`.

**Cliques agregados**: crie uma propriedade Google Analytics 4, adicione um fluxo Web, pegue o ID `G-XXXXXXXXXX` e preencha `ga4MeasurementId` no `config.js`. Após permitir a medição, os cliques em planos são registrados como evento personalizado `plano_escolhido`, com parâmetro `plano`. Os números não são exibidos publicamente na landing. Dados do GA4 podem demorar para aparecer nos relatórios e não substituem cliques confirmados no backend.

**Lista de espera**: crie um formulário em https://formspree.io/, obtenha o endereço público `https://formspree.io/f/SEU_ID` e preencha `formspreeEndpoint` no `config.js`. A página só exibe inscrição confirmada após o serviço aceitar o envio. Antes da configuração, a inscrição fica desabilitada e explica o motivo.

**Painel Admin**: o endereço `/admin.html` apenas orienta sobre onde consultar os dados de GA4 e Formspree. Não é possível usar o painel Python/SQLite antigo no GitHub Pages.

## Privacidade

- Atualize `privacidade.html` com contato verdadeiro do grupo e informações corretas de processamento antes de coletar e-mails reais.
- Não coloque nenhuma senha, credencial, token de serviço secreto ou banco de dados no repositório.
- A medição GA4 foi configurada para iniciar somente após consentimento do visitante.

## Testar localmente (sem Python server.py)

No VS Code, abra esta pasta e execute `py -m http.server 8000` no terminal. O site abrirá em `http://localhost:8000/`.

## Observações

Esta versão preserva o visual mais recente, os três planos e a demo de gamificação. Não inclui backend e **não** possui contagem pública em tempo real. Não use GitHub Pages como serviço para processar pagamentos ou hospedar aplicativo SaaS em produção.
