# 1. Use Case Diagrams

This document details the Use Case diagrams for MechDrive Studio, strictly adhering to UML standards with properly identified actors, relationships (`<<include>>`, `<<extend>>`), and system boundaries.

## 1.1 General System Use Cases

```mermaid
flowchart LR
    Guest((Guest))
    Engineer((Mechanical Engineer))
    
    Engineer -->|<<inherits>>| Guest
    
    subgraph MechDrive Studio
        UC1([Register Account])
        UC2([Login to System])
        UC3([Manage Projects])
        UC4([Input Parameters])
        UC5([Optimize Design])
        UC6([Export Report])
        UC7([Lookup Standards])
        
        UC1 .->|<<extend>>| UC2
        UC5 ..->|<<include>>| UC4
        UC6 ..->|<<extend>>| UC5
    end
    
    Guest --> UC1
    Guest --> UC2
    Engineer --> UC3
    Engineer --> UC5
    Engineer --> UC7
```
