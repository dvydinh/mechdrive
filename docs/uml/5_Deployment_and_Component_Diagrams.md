# 5. Deployment and Component Diagrams

Applying UML standard deployment artifacts (`<<artifact>>`), hardware/execution nodes (`<<device>>`, `<<execution environment>>`), and software components (`<<component>>`) with associated protocols and dependencies.

## 5.1 System Deployment & Component View

```mermaid
flowchart TB
    subgraph Client [<<device>> Client Device]
        Browser[<<execution environment>> Web Browser]
    end
    
    subgraph Vercel [<<execution environment>> Vercel Serverless]
        UI_Comp[<<component>> Next.js React Frontend]
        Auth_Comp[<<component>> Supabase Auth SDK]
        
        UI_Comp -->|<<use>>| Auth_Comp
    end
    
    subgraph Railway [<<execution environment>> Railway Container]
        API_Comp[<<component>> FastAPI Optimization Engine]
        QTable[<<artifact>> Q-Table Model Weights]
        
        API_Comp -.->|<<manifest>>| QTable
    end
    
    subgraph Supabase [<<device>> Supabase Managed Infrastructure]
        DB_Comp[<<component>> PostgreSQL Database]
        Storage[<<artifact>> Relational Data]
        
        DB_Comp -.->|<<manifest>>| Storage
    end
    
    Browser -- "<<protocol>> HTTP/REST" --> UI_Comp
    UI_Comp -- "<<protocol>> HTTPS/JSON" --> API_Comp
    UI_Comp -- "<<protocol>> WebSocket/HTTPS" --> Auth_Comp
    API_Comp -- "<<protocol>> TCP/IP" --> DB_Comp
    Auth_Comp -- "<<protocol>> TCP/IP" --> DB_Comp
```
