# IPVA 1% SP - Movimento Apartidário de Iniciativa Popular

Este projeto é a interface digital do movimento pela redução da alíquota do IPVA em São Paulo de 4% para 1%.
O site foi refatorado para utilizar tecnologias modernas e boas práticas de engenharia de software (SOLID).

## 🌐 Acesso ao Site
**[https://ipva1sp.com.br](https://ipva1sp.com.br)**

## 🚀 Arquitetura e Tecnologias

O projeto migrou de um site estático para uma aplicação **Single Page Application (SPA)** moderna:

- **Linguagem**: TypeScript (Strict Mode)
- **Framework**: Vite (Build & Dev Server)
- **Estilo**: TailwindCSS (Utility-First)
- **Gráficos**: Chart.js (Dashboard Interativo)
- **Testes**: Vitest (Testes Unitários)

### Estrutura do Projeto (SOLID)

O código foi reorganizado seguindo princípios de responsabilidade única:

- **`src/services/`**: Camada de lógica de negócios pura.
  - `CalculatorService.ts`: Regras de cálculo da "Taxa Invisível", Markup e Economia.
  - `DeputyService.ts`: Gestão da lista de deputados e filtros de busca.
  - `AnalyticsService.ts`: Integração com Google Analytics e CounterAPI.

- **`src/components/`**: Camada de Interface do Usuário.
  - `CalculatorUI.ts`: Manipulação do DOM e eventos do dashboard.
  - `DeputiesList.ts`: Renderização da lista virtualizada e ações em massa.
  - `ImpactSection.ts`: Contadores em tempo real.

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (v18+)

### Desenvolvimento Local
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173`

### Executando Testes
Para validar as regras de negócio (cálculos e lógica de deputados):
```bash
npm run test
```

## 📦 Build e Deploy

### Gerar Versão de Produção
```bash
npm run build
```
Isso criará a pasta `dist/` com os arquivos otimizados.

### Deploy (FTP)
Utilize o script simplificado para subir a pasta `dist` para o servidor:
```powershell
./env/deploy_simple.ps1
```

O script lida automaticamente com a conexão FTP e upload dos arquivos necessários.

---
*Projeto independente pela liberdade econômica de quem produz.*
