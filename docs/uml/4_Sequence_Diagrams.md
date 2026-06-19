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
    participant API as api:FastAPIEngine
    participant DB as db:Supabase

    Guest->>UI: inputCredentials(email, password, userName)
    activate UI
    
    UI->>API: POST /users/register(userData)
    activate API
    
    API->>DB: auth.sign_up(email, password)
    activate DB
    DB-->>API: User object
    deactivate DB
    
    API->>DB: insert("USER", userData)
    activate DB
    DB-->>API: UserRecord
    deactivate DB
    
    API-->>UI: UserResponse
    deactivate API
    
    UI-->>Guest: Registration Success
    deactivate UI
```

## 4.3 Project Deletion Sequence

```mermaid
sequenceDiagram
    actor Eng as :MechanicalEngineer
    participant UI as ui:ModuleProjects
    participant API as api:FastAPIEngine
    participant DB as db:Supabase

    Eng->>UI: clickDeleteIcon(projectID)
    activate UI
    
    UI->>API: DELETE /projects/{project_id}
    activate API
    
    API->>DB: delete("PROJECT", projectID)
    activate DB
    DB-->>API: success
    deactivate DB
    
    API-->>UI: Status 200
    deactivate API
    
    UI->>UI: removeProjectFromState(projectID)
    UI-->>Eng: Updated Dashboard View
    deactivate UI
```
