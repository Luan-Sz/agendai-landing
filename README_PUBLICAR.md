# Publicação e configuração — Agend.ai

Este documento é um **guia operacional** da landing page estática. Para apresentação do projeto, recursos e limitações, consulte o [README principal](./README.md).

## Publicar no GitHub Pages

O projeto usa apenas HTML, CSS e JavaScript. Não há etapa de compilação nem servidor de backend.

1. No repositório do GitHub, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main`, pasta `/(root)`, e salve.
4. Aguarde o GitHub disponibilizar o endereço do site em **Pages**.
5. Confirme se `index.html`, `reserva.html` e os arquivos SVG carregam corretamente.

Se o Pages já estiver configurado, alterações enviadas à branch publicada são implantadas pelo fluxo de publicação do GitHub.

**Atenção:** GitHub Pages publica arquivos estáticos. Ele não executa Python, SQLite, Java, Node.js como servidor, nem serviços de IA no backend.

## Executar localmente

É possível abrir `index.html` diretamente no navegador. Como alternativa, se Python estiver instalado:

```bash
python -m http.server 8000
```

No Windows, você pode usar `py -m http.server 8000`. Acesse `http://localhost:8000/`.

## Planos e lista de espera

Existem **somente dois planos demonstrativos**: `free` e `premium`. O botão de cada plano leva a:

- `reserva.html?plano=free`
- `reserva.html?plano=premium`

**Não há pagamento.** Preços e franquias de tokens são hipóteses de validação.

O formulário só recebe cadastros se um endpoint válido do **Formspree** estiver configurado em `config.js`. Com o campo vazio, o envio permanece desabilitado e a página explica a indisponibilidade. Antes de coletar e-mails de usuários reais, revise a página `privacidade.html` e defina o responsável pelos dados e o canal de contato.

## Medição de interesse

O código prevê o Google Analytics 4 (GA4) como integração **opcional**.

1. Crie uma propriedade e um fluxo Web no GA4.
2. Adicione o ID de medição (formato `G-XXXXXXXXXX`) em `config.js`.
3. Verifique o aviso de consentimento e aceite ou recusa antes de validar a coleta.
4. O evento configurado para escolha de plano é `plano_escolhido`, com o parâmetro `plano`.

Com o ID vazio, **nenhuma medição GA4 é iniciada**. O código não dispõe de métricas próprias no servidor. Mesmo configurado, o GA4 só recebe eventos quando o visitante consente e não deve ser tratado como um banco de conversões confirmadas.

## Página administrativa

`admin.html` **não é um painel com login, banco ou relatórios internos**. A página informa que as métricas devem ser consultadas no GA4 e as inscrições, no Formspree, caso esses serviços sejam configurados.

## Segurança e privacidade

- `config.js` é público: **não insira senhas, tokens privados ou credenciais**.
- Revise o aviso de privacidade, contatos responsáveis e procedimentos de exclusão antes da coleta real.
- Não utilize a página estática para processar pagamentos ou armazenar informações confidenciais.
- Teste o fluxo de consentimento de análise e o formulário antes de divulgar a página como pesquisa ativa.

## Checklist antes de compartilhar

- [ ] Layout e navegação funcionando no celular e computador
- [ ] Botões Free e Premium abrindo a opção correta
- [ ] Simulação de tarefas e de imprevisto funcionando
- [ ] Link externo do QR Code verificado
- [ ] Avisos de funcionalidade demonstrativa visíveis
- [ ] Se houver coleta real: Formspree, GA4, consentimento e privacidade revisados

**Limite do protótipo:** este repositório não implementa agenda persistente, IA generativa, integração com WhatsApp, pagamentos ou backend.
