# 3. Class Diagrams

These diagrams detail the structural design, applying visibility indicators (`+` public, `-` private, `#` protected) and correct UML relationship notations (`-->` association, `o--` aggregation, `*--` composition, `..>` dependency, `<|--` inheritance).

## 3.1 Backend AI Engine (Domain Model)

```mermaid
classDiagram
    class OptimizationRequest {
        +float P_yc
        +float n_yc
        +float u_total
        +float L_h
        +String load_type
        +dict standards
    }
    
    class AbstractResult {
        <<abstract>>
        +float a_w
        +int z1
        +int z2
    }
    
    class GearResult {
        +float m
        +float sigma_H
        +float sigma_F
        +String material
    }
    
    class ChainResult {
        +float pitch
        +float F_t
        +float F_r
    }
    
    AbstractResult <|-- GearResult
    AbstractResult <|-- ChainResult
    
    class State {
        +float P_dc
        +float n_dc
        +float L_h
        +float u_total
        +discretize() int
    }
    
    class Action {
        +String material
        +float psi_ba
        +decode() dict
    }
    
    class AIEngine {
        -dict q_table
        -float learning_rate
        -float discount_factor
        +discretize_state(P: float, n: float, u: float, L: float) State
        +get_best_action(s: State) Action
        +calculate_physics(a: Action) GearResult
        #update_q_value(s: State, a: Action, r: float) void
    }
    
    AIEngine ..> OptimizationRequest : <<use>>
    AIEngine --> State : creates
    AIEngine --> Action : creates
    AIEngine ..> GearResult : <<creates>>
    AIEngine ..> ChainResult : <<creates>>
```

## 3.2 Frontend Architecture (Component Classes)

```mermaid
classDiagram
    class App {
        +Session userSession
        +render() void
    }
    
    class AuthScreen {
        +login(credentials) void
        +register(userData) void
    }
    
    class ModuleProjects {
        -List~Project~ projects
        +fetchProjects() void
        +createProject(name: String) void
        +deleteProject(id: String) void
    }
    
    class ProjectWorkspace {
        -Project currentProject
        +deleteScheme(id: String) void
        +openOptimizer() void
    }
    
    class ModuleOptimizer {
        -OptimizationRequest formData
        +runAI() void
        -validateData() boolean
    }
    
    class SchemeReport {
        +renderTables(result: GearResult) void
        +exportData() PDF
    }

    App *-- AuthScreen : contains
    App *-- ModuleProjects : contains
    ModuleProjects *-- ProjectWorkspace : manages
    ProjectWorkspace *-- ModuleOptimizer : manages
    ProjectWorkspace *-- SchemeReport : manages
```
