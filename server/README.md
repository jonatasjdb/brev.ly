bre.vly — URL Shortener API

API para gerenciamento de encurtamento de URLs desenvolvida com TypeScript, Fastify, Drizzle ORM e PostgreSQL, estruturada com separação clara entre domínio e infraestrutura.

📐 Arquitetura

O projeto foi organizado seguindo princípios de separação de responsabilidades e isolamento de regras de negócio.

src/
├── app/ # Casos de uso (regras de negócio)
│ └── functions/
├── infra/
│ ├── db/ # Configuração Drizzle, schemas e migrations
│ ├── http/ # Rotas e bootstrap do Fastify
│ └── storage/ # Integração com Cloudflare R2
├── test/ # Setup e Factories
└── env.ts # Validação tipada de variáveis ambiente

Decisão arquitetural
• A camada app não depende de Fastify.
• A camada HTTP apenas orquestra entrada e saída.
• Regras de negócio são testáveis isoladamente.
• Infraestrutura pode ser substituída sem impactar o domínio.

🚀 Funcionalidades
• Criação de link encurtado com validação
• Prevenção de duplicidade (shortUrl unique index)
• Deleção de link
• Resolução de URL original via shortUrl
• Incremento de contagem de acessos
• Listagem paginada
• Exportação de CSV
• Upload para Cloudflare R2 com nome único

🔐 Identidade da Entidade

O id foi utilizado como identificador principal do recurso.

Motivação:
• Representa identidade imutável
• Mantém consistência REST
• Evita acoplamento com atributo de domínio (shortUrl)
• Permite futura alteração de regras da URL encurtada sem impactar endpoints administrativos

🗄 Banco de Dados
• PostgreSQL
• Drizzle ORM
• Migrations versionadas
• Índice único em short_url
• UUID como chave primária

Script obrigatório:

`pnpm run db:migrate`

📤 Exportação de CSV

A exportação foi implementada com foco em performance:
• Geração estruturada dos dados
• Nome único baseado em identificador aleatório
• Upload para Cloudflare R2
• Retorno da URL pública
• Separação da lógica de storage da regra de negócio

Campos exportados:
• original_url
• short_url
• access_count
• created_at

🧪 Testes

Testes unitários cobrindo os principais casos de uso:
• Criação
• Duplicidade
• Listagem
• Incremento
• Exportação

Execução:

`pnpm run test`
Ambiente de teste isolado via .env.test.

⚙️ Variáveis de Ambiente

Arquivo .env.example:

```
PORT=
DATABASE_URL=

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

🐳 Docker

Dockerfile multi-stage com:
• Separação de dependências e build
• Instalação com --frozen-lockfile
• Execução como usuário não-root
• Imagem leve baseada em Alpine

Build:
`docker build -t brevly-api ./server`

Run:

```docker run -p 3333:3333 \
  -e DATABASE_URL=... \
  brevly-api
```

🧠 Considerações Técnicas
• Camada HTTP desacoplada do domínio
• Erros de negócio explícitos (AlreadyExists, NotFound)
• Consistência no padrão de identificação por id
• Migrations independentes de integrações externas
• CI configurado para execução automática de testes

▶ Como executar localmente

```
pnpm install
pnpm run db:migrate
pnpm run dev
```

Feito por Jônatas Dias
