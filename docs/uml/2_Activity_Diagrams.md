# 2. Activity Diagrams

This document details the Activity diagrams for the **MechDrive Studio** system, illustrating the flow of logic and operations.

## 2.1 Authentication Flow

```mermaid
flowchart TD
    classDef startEnd fill:#000,stroke:#000,color:#fff;
    classDef decision fill:#fff,stroke:#000,shape:diamond;

    Start(( )):::startEnd
    End((( ))):::startEnd
    
    subgraph User_Lane [Guest / User]
        A1(Choose Login, Register, or Reset)
        A6(Click Link in Email)
        A8(Enter New Password)
    end
    
    subgraph UI_Lane [AuthScreen]
        D1{"Action?"}:::decision
        A2(Submit Credentials)
        A4(Submit Email for Reset)
        A7(Show Update Password Form)
        A9(Call updateUser API)
    end
    
    subgraph Supabase_Lane [Supabase Auth]
        A3(Create User & Send Confirm Email)
        A5(Send Reset Link)
        A10(Update Password in DB)
        A11(Authenticate & Return Session)
    end
    
    Start --> A1
    A1 --> D1
    
    D1 -->|Register| A2
    D1 -->|Login| A2
    D1 -->|Forgot Password| A4
    
    A2 -->|Sign Up| A3
    A2 -->|Sign In| A11
    A4 --> A5
    
    A3 --> End
    A5 --> A6
    A11 --> End
    
    A6 --> A7
    A7 --> A8
    A8 --> A9
    A9 --> A10
    A10 --> End
```

## 2.2 AI Optimization Flow

```mermaid
flowchart TD
    classDef startEnd fill:#000,stroke:#000,color:#fff;
    classDef decision fill:#fff,stroke:#000,shape:diamond;

    Start(( )):::startEnd
    End((( ))):::startEnd
    
    subgraph User_Lane [Mechanical Engineer]
        A1(Input P_yc, n_yc, u_total, L_h)
        A8(Review AI Suggestion)
        A9(Approve & Continue to Report)
    end
    
    subgraph UI_Lane [Frontend Client]
        A2(Validate Input Data)
        D1{" "}:::decision
        A3(Display Validation Error)
        A7(Save Results directly to Supabase)
    end
    
    subgraph AI_Lane [FastAPI Engine]
        A4(Discretize Input to State Key)
        A5(Lookup Q-Table from RAM/JSON)
        D2{" "}:::decision
        A6(Run gear_design + chain_design)
    end
    
    Start --> A1
    A1 --> A2
    A2 --> D1
    
    D1 -->|"[Invalid Data]"| A3
    A3 --> A1
    
    D1 -->|"[Valid Data]"| A4
    A4 --> A5
    A5 --> D2
    
    D2 -->|"[State Key Not Found]"| A3
    
    D2 -->|"[State Key Found]"| A6
    A6 --> A7
    A7 --> A8
    A8 --> A9
    A9 --> End
```
