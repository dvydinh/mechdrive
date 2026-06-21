# Mechdrive studio: a Q-learning integrated platform for mechanical drive design

Live access: https://mechdrive.vercel.app/

## Abstract
Mechdrive studio is a web-based engineering platform dedicated to the calculation, design, and optimization of mechanical drive systems, specifically mixing drum drives. The project bridges traditional mechanical design theory with artificial intelligence. By applying the tabular Q-learning reinforcement learning algorithm, the platform automatically analyzes dynamic input parameters to recommend optimal material configurations and transmission ratios. This reduces manual trial-and-error loops and mitigates human calculation errors.

## 1. Introduction
The mechanical calculation sequence adheres to standard engineering design processes. Traditional design requires rigorous manual calculation across multiple phases, including electric motor selection, transmission ratio distribution, chain drive design, and gear drive design. This project introduces an AI-driven approach to automate the gear drive optimization phase, ensuring that selected materials and geometries satisfy both stress limits and volumetric constraints. 

## 2. System architecture
The system operates on a microservices architecture to ensure high cohesion and low coupling between the interface, the calculation engine, and the database.

The frontend is developed using React and Next.js, providing an interface for engineers to input design parameters and view calculated reports. State management and routing are handled natively within the framework. 

The backend is powered by FastAPI, utilizing Pydantic data models for strict input validation. It exposes API endpoints that interface with the frontend and execute the Q-learning engine. Database operations and authentication are delegated to Supabase, which stores user workspaces and standard engineering lookup tables.

## 3. Mathematical model and Q-learning formulation
The optimization module employs tabular Q-learning to simulate the decision-making process of a mechanical engineer.

### 3.1. State space
The environment state is defined by discretizing continuous dynamic inputs to prevent state-space explosion. The input variables include electric motor power, rotational speed, total service life, total transmission ratio, and load type.

### 3.2. Action space
An action represents a combination of critical design choices. The AI selects the optimal pair of material grades, which determines mechanical properties such as hardness and allowable stresses, alongside the coefficient of gear width relative to the center distance.

### 3.3. Reward function
The reward function encourages compactness while strictly enforcing mechanical endurance limits. The base reward evaluates geometric optimality by being inversely proportional to the center distance. A heavy penalty is applied if the calculated actual working contact stress or bending stress violates the material's allowable limits.

### 3.4. Update rule
During offline training, the Q-table is updated using the Bellman equation. In production, the backend utilizes the pre-trained Q-table to exploit the highest Q-value corresponding to the current state, ensuring deterministic optimal outputs.

## 4. Implementation and deployment

The application is deployed across two main components. 

For the backend AI microservice, Python 3.9 or higher is required. Navigate to the backend directory, install the requirements, and start the Uvicorn server:
```bash
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

For the frontend web client, Node.js 18 or higher is required. Configure the environment variables for Supabase, then install dependencies and start the development server:
```bash
cd frontend
npm install
npm run dev
```

## 5. Project team
- Dinh Nguy Nguyet Ha (2352286): Requirement specification, use case analysis, and system testing.
- Duong Le Nhat Duy (2352171): Database architecture design, SQL schema, and Supabase security policies.
- Tran Thien Loc (2352715): Frontend development, UI/UX design, and API integration.
- Dinh Doan Vy (2353350): Backend API development, Q-learning algorithm implementation, and standard data digitization.

## 6. References
1. Trinh Chat & Le Van Uyen (2006). Tinh toan thiet ke he dan dong co khi. Vietnam Education Publishing House.
2. Watkins, C. J., & Dayan, P. (1992). Q-learning. Machine learning, 8(3), 279-292.
3. Sutton, R. S., & Barto, A. G. (2018). Reinforcement learning: An introduction. MIT press.
