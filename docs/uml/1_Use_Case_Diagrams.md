# 1. Use Case Diagrams

This document provides detailed Use Case Diagrams for the **MechDrive Studio** system.
To strictly follow UML theory:
- **System Boundary**: Represented by a `subgraph` containing all use cases.
- **Actors**: Primary actors (users) are placed on the left. Secondary actors (external systems/APIs) are placed on the right.
- **Stick Figures**: Mermaid doesn't natively support stick figure drawing in flowcharts, so we use the `🧍` emoji for human actors and server/robot emojis for external systems to visually distinguish them.
- **Granularity**: The diagrams are separated into 3 detailed subsystems based on the thesis specification (`DO_AN_DA_NGANH_SPEC.md`).

## 1.1 User & Workspace Management Subsystem

```mermaid
flowchart LR
    %% Primary Actors
    Guest("🧍 Guest")
    Engineer("🧍 Mechanical Engineer")
    
    %% System Boundary
    subgraph MechDrive_User_Management [System Boundary: User & Workspace Management]
        direction TB
        UC1([Register Account])
        UC2([Login])
        UC3([Manage Workspaces])
        UC3_1([Create Project])
        UC3_2([Delete Project])
        UC4([View Dashboard])
        
        UC3_1 .->|<<extend>>| UC3
        UC3_2 .->|<<extend>>| UC3
        UC3 ..->|<<include>>| UC2
    end
    
    %% Secondary Actors
    Supabase("🗄️ Supabase Auth & DB")
    
    %% Relationships
    Guest --> UC1
    Guest --> UC2
    Engineer --> UC3
    Engineer --> UC4
    
    UC1 --> Supabase
    UC2 --> Supabase
    UC3 --> Supabase
    UC4 --> Supabase
```

## 1.2 Mechanical Calculation Engine Subsystem (Core)

```mermaid
flowchart LR
    %% Primary Actors
    Engineer("🧍 Mechanical Engineer")
    
    %% System Boundary
    subgraph MechDrive_Calc_Engine [System Boundary: Calculation Engine]
        direction TB
        UC5([Design Motor])
        UC6([Design Chain Drive])
        UC7([Design Gear Drive])
        UC8([Sync Parallel Convergence])
        UC9([Lookup Standard Data])
        
        UC6 ..->|<<include>>| UC8
        UC7 ..->|<<include>>| UC8
    end
    
    %% Secondary Actors
    SupabaseDB("🗄️ Supabase (Lookup Tables)")
    
    %% Relationships
    Engineer --> UC5
    Engineer --> UC6
    Engineer --> UC7
    Engineer --> UC9
    
    UC5 --> SupabaseDB
    UC6 --> SupabaseDB
    UC7 --> SupabaseDB
    UC9 --> SupabaseDB
```

## 1.3 AI Tools & Reporting Subsystem

```mermaid
flowchart LR
    %% Primary Actors
    Engineer("🧍 Mechanical Engineer")
    
    %% System Boundary
    subgraph MechDrive_AI_Reporting [System Boundary: AI Tools & Reporting]
        direction TB
        UC10([Extract Parameters via OCR/NER])
        UC11([Suggest Parameters via Random Forest])
        UC12([Optimize Design via Genetic Algorithm])
        UC13([Generate Technical Report])
        UC14([Export Report to PDF/DOCX])
        
        UC14 .->|<<extend>>| UC13
    end
    
    %% Secondary Actors
    SupabaseStorage("🗄️ Supabase Storage (ML Models)")
    ClaudeAPI("🤖 Claude API (LLM)")
    
    %% Relationships
    Engineer --> UC10
    Engineer --> UC11
    Engineer --> UC12
    Engineer --> UC13
    
    UC11 --> SupabaseStorage
    UC13 --> ClaudeAPI
```
