# ceramica_lufiorentino# Argila Estúdio — Site institucional

Site estático (HTML + CSS + JS puro, sem frameworks) pronto para publicar.

## Estrutura de arquivos
```
ceramicas-site/
├── index.html
├── css/style.css
├── js/script.js
└── README.md
```

## 1. Personalização antes de publicar

| O que trocar | Onde |
|---|---|
| Nome do estúdio / da artesã | `index.html` — buscar por "Argila Estúdio" e "Ana" |
| Número de WhatsApp | `js/script.js` — variável `WHATSAPP_NUMERO` |
| Mensagem padrão do WhatsApp | `js/script.js` — variável `WHATSAPP_MENSAGEM` |
| Fotos reais das peças | `index.html` — substituir os blocos `<svg class="piece-art">` por `<img src="img/nome-da-foto.jpg" alt="...">` dentro de cada `.piece` |
| Foto do ateliê/artesã | `index.html`, seção "História" — mesmo processo, trocar o SVG por `<img>` |
| Link do Instagram | `index.html`, rodapé — `href="https://instagram.com/seu.usuario"` |

Dica: coloque as fotos reais dentro da pasta `img/` (crie a pasta) e use caminhos como `img/vaso-terra.jpg`. Fotos com fundo neutro e boa luz natural funcionam melhor na vitrine.

## 2. Como testar localmente
Basta abrir o arquivo `index.html` duas vezes no navegador (duplo clique) ou, se tiver Python instalado:
```
python3 -m http.server 8000
```
e acessar `http://localhost:8000`.

## 3. Configuração de domínio e hospedagem

Passo a passo geral (válido para a maioria dos provedores brasileiros, como Hostinger, HostGator ou Registro.br + Vercel/Netlify):

1. **Registrar o domínio** (ex: `argilaestudio.com.br`) em um registrador — Registro.br para `.com.br`, ou GoDaddy/Namecheap para `.com`.
2. **Escolher a hospedagem**:
   - *Mais simples e gratuita*: [Netlify](https://netlify.com) ou [Vercel](https://vercel.com) — basta arrastar a pasta do site para o painel.
   - *Hospedagem tradicional*: Hostinger, HostGator etc. — enviar os arquivos via FTP ou gerenciador de arquivos do painel (cPanel), dentro da pasta `public_html`.
3. **Apontar o domínio para a hospedagem**: no painel do registrador, alterar os **DNS/Nameservers** para os fornecidos pela hospedagem escolhida (cada provedor informa os seus na documentação, geralmente algo como `ns1.hospedagem.com` e `ns2.hospedagem.com`).
4. Aguardar a propagação do DNS (pode levar de alguns minutos até 24h).

## 4. Certificado SSL (https://)

A maioria das hospedagens atuais oferece SSL grátis (Let's Encrypt):
- **Netlify/Vercel**: o SSL é ativado automaticamente, sem nenhuma configuração.
- **Hostinger/HostGator/cPanel**: procurar por "SSL" ou "Let's Encrypt" no painel e clicar em "Ativar" para o domínio — geralmente leva poucos minutos para entrar em vigor.
- Depois de ativado, confirme que o site abre com `https://` (e não `http://`) e, se possível, ative o redirecionamento automático de `http` para `https` nas configurações da hospedagem.

Qualquer dúvida nessa etapa, o suporte da hospedagem escolhida costuma resolver rapidamente via chat.