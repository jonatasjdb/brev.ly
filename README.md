# bre.vly — URL Shortener

## Server

API para gerenciamento de encurtamento de URLs desenvolvida com TypeScript, Fastify, Drizzle ORM e PostgreSQL, estruturada com separação clara entre domínio e infraestrutura.

### Arquitetura

O projeto foi organizado seguindo princípios de separação de responsabilidades e isolamento de regras de negócio.

```
src/
├── app/ # Casos de uso (regras de negócio)
│ └── functions/
├── infra/
│ ├── db/ # Configuração Drizzle, schemas e migrations
│ ├── http/ # Rotas e bootstrap do Fastify
│ └── storage/ # Integração com Cloudflare R2
├── test/ # Setup e Factories
└── env.ts # Validação tipada de variáveis ambiente
```

Decisão arquitetural
• A camada app não depende de Fastify.
• A camada HTTP apenas orquestra entrada e saída.
• Regras de negócio são testáveis isoladamente.
• Infraestrutura pode ser substituída sem impactar o domínio.

### Funcionalidades

• Criação de link encurtado com validação
• Prevenção de duplicidade (shortUrl unique index)
• Deleção de link
• Resolução de URL original via shortUrl
• Incremento de contagem de acessos
• Listagem paginada
• Exportação de CSV
• Upload para Cloudflare R2 com nome único

### Banco de Dados

• PostgreSQL
• Drizzle ORM
• Migrations versionadas
• Índice único em short_url
• UUID como chave primária

Script obrigatório:

```
pnpm run db:migrate
```

### Exportação de CSV

A exportação foi implementada com foco em performance:
• Geração estruturada dos dados
• Nome único baseado em identificador aleatório
• Upload para Cloudflare R2
• Retorno da URL pública
• Separação da lógica de storage da regra de negócio

Campos exportados:
• id
• original_url
• short_url
• access_count
• created_at

### Testes

Testes unitários cobrindo os principais casos de uso:
• Criação
• Duplicidade
• Listagem
• Incremento
• Exportação

Execução:

```
pnpm run test
```

Ambiente de teste isolado via .env.test.

### Variáveis de Ambiente

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

### Docker

Dockerfile multi-stage com:
• Separação de dependências e build
• Instalação com --frozen-lockfile
• Execução como usuário não-root
• Imagem leve baseada em Alpine

Build:

```
docker build -t brevly-api ./server
```

Run:

```
docker run -p 3333:3333 \
-e DATABASE_URL=... \
brevly-api
```
Local:
```
• docker-compose -d
```


### Considerações Técnicas

• Camada HTTP desacoplada do domínio
• Erros de negócio explícitos (AlreadyExists, NotFound)
• Consistência no padrão de identificação por id
• Migrations independentes de integrações externas
• CI configurado para execução automática de testes

### Configuração

    1.	Instale as dependências:

```
pnpm install
```

    2.	Configure seu .env baseado no .env.example.
    3.  Rode o compose:
```
docker-compose -d
```
    4. Rode as migrations:
```
pnpm run db:migrate
```
    5.	Rode o servidor de desenvolvimento:

```
pnpm run dev
```

    6.	Acesse http://localhost:3333 (ou a porta definida no .env).
    7.  Especifique a porta utilizada no backend no arquivo .env

### Observação

    •	Todos os scripts mencionados do backend precisarão ser acessados dentro da pasta server.

## Web

Este é o frontend do projeto, construído com React 19, Vite, TypeScript e estilizado com TailwindCSS. O projeto utiliza Zustand para gerenciamento de estado e integrações com APIs no diretório services.

### Estrutura de pastas

```
web/
├─ src/
│  ├─ assets/           # Imagens, logos e outros recursos estáticos
│  ├─ components/       # Componentes React reutilizáveis
│  │  └─ ui/            # Componentes de UI (botões, inputs, etc.)
│  ├─ hooks/            # Hooks personalizados
│  ├─ lib/              # Bibliotecas auxiliares
│  ├─ pages/            # Páginas principais
│  ├─ services/         # Serviços que fazem chamadas HTTP
│  └─ store/            # Zustand stores para gerenciamento de estado
├─ .env.example         # Variáveis de ambiente de exemplo
├─ tsconfig.json        # Configuração TypeScript
└─ vite.config.ts       # Configuração do Vite
```

### Dependências principais

    •	React e React DOM
    •	React Router DOM para roteamento
    •	TailwindCSS para estilização
    •	Zustand para gerenciamento de estado global
    •	Sonner para notificações toast
    •	tailwind-variants para criação de componentes estilizados

### Configuração

    1.	Instale as dependências:

```
pnpm install
```

    2.	Configure seu .env baseado no .env.example.
    3.	Rode o servidor de desenvolvimento:

```
pnpm dev
```

    4.	Acesse http://localhost:5173 (ou a porta definida no .env).
    5.  Especifique a porta utilizada no backend no arquivo .env

### Observações

    •	Todos os scripts mencionados do frontend precisarão ser acessados dentro da pasta web.
    •	Todas as páginas estão dentro de src/pages.
    •	Componentes compartilhados e hooks estão separados para facilitar reutilização.
    •	O Zustand é usado para gerenciar links e atualizar automaticamente a UI sem precisar de reload.
    •	Para trabalhar com variáveis de ambiente, crie o arquivo .env com suas chaves e URLs.
