# 📐 Arquitetura do Projeto (Backend)

Este projeto segue os princípios da **Clean Architecture**, promovendo separação de responsabilidades, testabilidade, manutenção facilitada e escalabilidade.

---


## 🧠 Camadas

| Camada        | Responsabilidade                                                                 |
|---------------|----------------------------------------------------------------------------------|
| `domain`      | Define as entidades do sistema e as interfaces dos repositórios                  |
| `application` | Contém os casos de uso (Use Cases), regras de negócio e validações              |
| `infra`       | Implementações concretas de repositórios, banco de dados, controllers, rotas     |


---

## 🧰 Ferramentas

- **Node.js + Express**
- **TypeScript**
- **Supabase** como banco de dados (PostgreSQL)
- **Evolution API** para integração com WhatsApp
- **Stripe** para pagamentos

---
