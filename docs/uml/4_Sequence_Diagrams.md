# 4. Sequence Diagrams

These sequence diagrams strictly follow UML guidelines:
- Method signatures as messages (directed to the receiving object)
- Proper use of lifelines and activation boxes
- Synchronous/asynchronous arrows
- Fragment operators (`alt` for alternatives, `opt` for optional, `loop` for iterations).

## 4.1 AI Optimization & Project Save Sequence

```mermaid
sequenceDiagram
    actor Eng as :MechanicalEngineer
    participant UI as ui:ModuleOptimizer
    participant API as api:AIEngine
    participant DB as db:SupabaseDB

    Eng->>UI: clickOptimizeBtn(formData)
    activate UI
    UI->>UI: validateData(formData)
    
    alt [not isValid]
        UI-->>Eng: renderValidationError()
    else [isValid]
        UI->>API: processOptimization(request)
        activate API
        API->>API: discretize_state(P_yc, n_yc)
        
        loop [until valid action found]
            API->>API: get_best_action(state)
            API->>API: calculate_physics(action)
        end
        
        API-->>UI: return DesignResult
        deactivate API
        
        UI->>UI: updateUIState(DesignResult)
        UI-->>Eng: displayReportTables()
        
        opt [user clicks save]
            Eng->>UI: clickSaveProject()
            UI->>DB: insert("DESIGN_SCHEME", schemaData)
            activate DB
            DB-->>UI: 201 Created
            deactivate DB
            UI-->>Eng: renderSuccessToast()
        end
    end
    deactivate UI
```

## 4.2 Project Deletion Sequence

```mermaid
sequenceDiagram
    actor Eng as :MechanicalEngineer
    participant UI as ui:ModuleProjects
    participant DB as db:SupabaseDB

    Eng->>UI: clickDeleteIcon(projectID)
    activate UI
    
    UI->>DB: delete("GEAR_TRANS", projectID)
    activate DB
    DB-->>UI: return status 200
    deactivate DB
    
    UI->>DB: delete("CHAIN_TRANS", projectID)
    activate DB
    DB-->>UI: return status 200
    deactivate DB
    
    UI->>DB: delete("DESIGN_SCHEME", projectID)
    activate DB
    DB-->>UI: return status 200
    deactivate DB
    
    UI->>DB: delete("PROJECT", projectID)
    activate DB
    DB-->>UI: return success
    deactivate DB
    
    UI->>UI: removeProjectFromState(projectID)
    UI-->>Eng: hideProjectFromView()
    deactivate UI
```
