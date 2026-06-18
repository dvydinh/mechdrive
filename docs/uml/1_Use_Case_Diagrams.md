# 1. Use Case Diagrams

This document provides detailed Use Case Diagrams for the **MechDrive Studio** system.
To strictly follow UML theory:
- **System Boundary**: Represented by a `subgraph` containing all use cases.
- **Actors**: Primary actors (users) are placed on the left. Secondary actors (external systems/APIs) are placed on the right.
- **Stick Figures**: Mermaid doesn't natively support stick figure drawing in flowcharts, so we use the `🧍` emoji for human actors and server/robot emojis for external systems to visually distinguish them.
- **Granularity**: The diagrams are separated into 3 detailed subsystems based on the thesis specification (`DO_AN_DA_NGANH_SPEC.md`).

## 1.1 User & Workspace Management Subsystem

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Guest" as guest
actor "Mechanical Engineer" as eng

package "User & Workspace Management" {
  usecase "Register Account" as UC1
  usecase "Login" as UC2
  usecase "Manage Workspaces" as UC3
  usecase "Create Project" as UC3_1
  usecase "Delete Project" as UC3_2
  usecase "View Dashboard" as UC4
}

actor "Supabase Auth & DB" as supa << System >>

guest --> UC1
guest --> UC2
eng --> UC3
eng --> UC4

UC3_1 .> UC3 : <<extend>>
UC3_2 .> UC3 : <<extend>>
UC3 ..> UC2 : <<include>>

UC1 --> supa
UC2 --> supa
UC3 --> supa
UC4 --> supa
@enduml
```

## 1.2 Mechanical Calculation Engine Subsystem (Core)

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Mechanical Engineer" as eng

package "Calculation Engine" {
  usecase "Design Motor" as UC5
  usecase "Design Chain Drive" as UC6
  usecase "Design Gear Drive" as UC7
  usecase "Sync Parallel Convergence" as UC8
  usecase "Lookup Standard Data" as UC9
}

actor "Supabase (Lookup Tables)" as db << System >>

eng --> UC5
eng --> UC6
eng --> UC7
eng --> UC9

UC6 ..> UC8 : <<include>>
UC7 ..> UC8 : <<include>>

UC5 --> db
UC6 --> db
UC7 --> db
UC9 --> db
@enduml
```

## 1.3 AI Tools & Reporting Subsystem

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor "Mechanical Engineer" as eng

package "AI Tools & Reporting" {
  usecase "Extract Parameters via OCR/NER" as UC10
  usecase "Suggest Parameters via Random Forest" as UC11
  usecase "Optimize Design via Genetic Algorithm" as UC12
  usecase "Generate Technical Report" as UC13
  usecase "Export Report to PDF/DOCX" as UC14
}

actor "Supabase Storage (ML Models)" as store << System >>
actor "Claude API (LLM)" as claude << System >>

eng --> UC10
eng --> UC11
eng --> UC12
eng --> UC13

UC14 .> UC13 : <<extend>>

UC11 --> store
UC13 --> claude
@enduml
```
