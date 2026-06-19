# 4. Sequence Diagrams

This document details the Sequence diagrams for the **MechDrive Studio** system, illustrating object interactions over time.

## 4.1 AI Optimization & Save Sequence

```mermaid
sequenceDiagram
    actor Eng as :MechanicalEngineer
    participant UI as ui:ModuleOptimizer
    participant API as api:FastAPIEngine
    participant DB as db:Supabase

    Eng->>UI: inputParams(P_yc, n_yc, u_total, L_h)
    activate UI
    UI->>UI: validateData(params)
    
    alt [Invalid Data]
        UI-->>Eng: Error Message
    else [Valid Data]
        UI->>API: POST /ai/optimize-design(params)
        activate API
        
        API->>API: discretize(P_yc, n_yc, u_total, L_h)
        API->>API: Q_TABLE.get(state_key)
        API->>API: gear_design(ai_seeds)
        API->>API: chain_design(ai_seeds)
        
        API-->>UI: AIResponse(optimal_action, physics_details)
        deactivate API
        
        UI->>DB: upsert("TRANSMISSION", gearData)
        activate DB
        DB-->>UI: OK
        deactivate DB
        
        UI->>DB: upsert("GEAR_TRANS", gearResult)
        activate DB
        DB-->>UI: OK
        deactivate DB
        
        UI->>DB: upsert("CHAIN_TRANS", chainResult)
        activate DB
        DB-->>UI: OK
        deactivate DB
        
        UI-->>Eng: Display AI Suggestion & Physics Results
    end
    deactivate UI
```

## 4.2 User Registration Sequence

```mermaid
sequenceDiagram
    actor Guest as :Guest
    participant UI as ui:AuthScreen
    participant Auth as auth:SupabaseAuth
    participant DB as db:Supabase

    Guest->>UI: inputCredentials(email, password, userName)
    activate UI
    
    UI->>Auth: signUp(email, password, metadata)
    activate Auth
    Auth-->>UI: User object
    deactivate Auth
    
    UI->>DB: upsert("USER_ACCOUNT", userData)
    activate DB
    DB-->>UI: OK
    deactivate DB
    
    UI-->>Guest: Success + Check Email for Confirmation
    deactivate UI
```

## 4.3 Reset Password Sequence

```mermaid
sequenceDiagram
    actor Guest as :Guest
    participant UI as ui:AuthScreen
    participant Auth as auth:SupabaseAuth

    Guest->>UI: clickForgotPassword()
    activate UI
    
    Guest->>UI: inputEmail(email)
    UI->>Auth: resetPasswordForEmail(email)
    activate Auth
    Auth-->>UI: OK
    deactivate Auth
    
    UI-->>Guest: Check Email for Reset Link
    deactivate UI
```

## 4.4 Project Deletion Sequence

```mermaid
sequenceDiagram
    actor Eng as :MechanicalEngineer
    participant UI as ui:ModuleProjects
    participant DB as db:Supabase

    Eng->>UI: clickDeleteIcon(projectID)
    activate UI
    
    UI->>DB: delete("GEAR_TRANS", projectID)
    activate DB
    DB-->>UI: OK
    deactivate DB
    
    UI->>DB: delete("CHAIN_TRANS", projectID)
    activate DB
    DB-->>UI: OK
    deactivate DB
    
    UI->>DB: delete("TRANSMISSION", projectID)
    activate DB
    DB-->>UI: OK
    deactivate DB
    
    UI->>DB: delete("DESIGN_SCHEME", projectID)
    activate DB
    DB-->>UI: OK
    deactivate DB
    
    UI->>DB: delete("PROJECT", projectID)
    activate DB
    DB-->>UI: OK
    deactivate DB
    
    UI->>UI: removeProjectFromState(projectID)
    UI-->>Eng: Updated Dashboard View
    deactivate UI
```
