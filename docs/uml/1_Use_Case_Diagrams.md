# 1. Use Case Diagrams


---

## 1.1 User & Workspace Management Subsystem

*This subsystem covers the authentication and workspace initialization process. Users can register and log in, which invokes Supabase Auth, and manage their workspaces, which can be extended by creating or deleting specific engineering projects.*
<div align="center">
  <img src="uc_user.svg" alt="User & Workspace Management Subsystem">
  <br>
  <em>Figure 1.1: Use Case Diagram for User & Workspace Management</em>
</div>

---

## 1.2 Mechanical Calculation Engine Subsystem (Core)

*The core calculation engine allows the User to design motor, chain, and gear drives. The system pulls standard empirical data from Supabase. Complex sub-tasks like calculating sprocket teeth or checking gear stress are modularized via `<<include>>` or `<<extend>>` relationships.*

<div align="center">
  <img src="uc_calc.svg" alt="Mechanical Calculation Engine Subsystem">
  <br>
  <em>Figure 1.2: Use Case Diagram for Mechanical Calculation Engine</em>
</div>

---

## 1.3 AI Tools & Reporting Subsystem

*This module highlights the AI Optimizer, which utilizes Q-Learning (Reinforcement Learning) to pre-evaluate the project's state space. It recommends the optimal material and predicts initial gear parameters (z1, psi_ba) early in the process to prevent mechanical failures and manual recalculation loops.*

<div align="center">
  <img src="uc_ai.svg" alt="AI Tools & Reporting Subsystem">
  <br>
  <em>Figure 1.3: Use Case Diagram for AI Tools & Reporting</em>
</div> 
