# 5. Deployment and Component Diagrams

This document details the Deployment and Component diagrams for the **MechDrive Studio** system's infrastructure.

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
    
    subgraph Render [<<execution environment>> Render Container]
        API_Comp[<<component>> FastAPI Optimization Engine]
        QTable[<<artifact>> Q-Table JSON]
        
        API_Comp -.->|<<manifest>>| QTable
    end
    
    subgraph Supabase [<<device>> Supabase Managed Infrastructure]
        DB_Comp[<<component>> PostgreSQL Database]
        Storage[<<artifact>> Relational Data]
        
        DB_Comp -.->|<<manifest>>| Storage
    end
    
    Browser -- "<<protocol>> HTTPS" --> UI_Comp
    UI_Comp -- "<<protocol>> HTTPS/JSON" --> API_Comp
    UI_Comp -- "<<protocol>> HTTPS" --> DB_Comp
    Auth_Comp -- "<<protocol>> HTTPS" --> DB_Comp
```
