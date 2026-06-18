# 2. Activity Diagrams

These diagrams follow standard UML Activity Diagram conventions: 
- Rounded rectangles for actions
- Diamonds for decision nodes (empty inside, conditions placed on outgoing edges)
- Solid circles for start states and encircled solid circles for final states
- Swimlanes (partitions) for role separation to indicate responsibility.

## 2.1 AI Optimization Flow

```mermaid
flowchart TD
    classDef startEnd fill:#000,stroke:#000,color:#fff;
    classDef decision fill:#fff,stroke:#000,shape:diamond;

    Start(( )):::startEnd
    End((( ))):::startEnd
    
    subgraph User_Lane [Mechanical Engineer]
        A1(Input Parameters)
        A8(Review AI Recommendation)
        A9(Confirm & Save Design)
    end
    
    subgraph UI_Lane [Frontend Client]
        A2(Validate Input Data)
        D1{" "}:::decision
        A3(Display Validation Error)
        A7(Render Specification Tables)
    end
    
    subgraph AI_Lane [FastAPI Engine]
        A4(Discretize Input to State)
        A5(Lookup Action A from Q-Table)
        A6(Calculate Mechanical Stresses)
        D2{" "}:::decision
        A10(Penalize & Explore New Action)
    end
    
    Start --> A1
    A1 --> A2
    A2 --> D1
    
    D1 -->|"[Invalid Data]"| A3
    A3 --> A1
    
    D1 -->|"[Valid Data]"| A4
    A4 --> A5
    A5 --> A6
    A6 --> D2
    
    D2 -->|"[Sigma > Allowable]"| A10
    A10 --> A5
    
    D2 -->|"[Sigma <= Allowable]"| A7
    A7 --> A8
    A8 --> A9
    A9 --> End
```
