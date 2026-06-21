# Mechdrive studio: a Q-learning integrated platform for mechanical drive design

Live access: https://mechdrive.vercel.app/

**Abstract.** Mechdrive studio is a web-based engineering platform dedicated to the calculation, design, and optimization of mechanical drive systems, specifically mixing drum drives. The project bridges traditional mechanical design theory with artificial intelligence. By applying the tabular Q-learning reinforcement learning algorithm, the platform automatically analyzes dynamic input parameters to recommend optimal material configurations and transmission ratios. This reduces manual trial-and-error loops and mitigates human calculation errors.

## System overview and architecture
The mechanical calculation sequence adheres to standard engineering design processes. Traditional design requires rigorous manual calculation across multiple phases, including electric motor selection, transmission ratio distribution, chain drive design, and gear drive design. This project introduces an AI-driven approach to automate the gear drive optimization phase, ensuring that selected materials and geometries satisfy both stress limits and volumetric constraints. 

To achieve this, the system operates on a microservices architecture to ensure high cohesion and low coupling between the interface, the calculation engine, and the database. The frontend is developed using React and Next.js, providing an interface for engineers to input design parameters and view calculated reports, with state management and routing handled natively within the framework. The backend is powered by FastAPI, utilizing Pydantic data models for strict input validation. It exposes API endpoints that interface with the frontend and execute the Q-learning engine. Database operations and authentication are delegated to Supabase, which securely stores user workspaces and standard engineering lookup tables.

## Mathematical model and deployment
The core optimization module employs tabular Q-learning to simulate the decision-making process of a mechanical engineer. The environment state is defined by discretizing continuous dynamic inputs to prevent state-space explosion, factoring in electric motor power, rotational speed, total service life, total transmission ratio, and load type. For the action space, the AI selects the optimal pair of material grades—which determines mechanical properties such as hardness and allowable stresses—alongside the coefficient of gear width relative to the center distance. 

The reward function is formulated to encourage compactness while strictly enforcing mechanical endurance limits. The base reward evaluates geometric optimality by being inversely proportional to the center distance. A heavy penalty is applied if the calculated actual working contact stress or bending stress violates the material's allowable limits. During offline training, the Q-table is updated using the Bellman equation. In production, the backend utilizes the pre-trained Q-table to exploit the highest Q-value corresponding to the current state, ensuring deterministic optimal outputs.

The application is deployed across two main components. For the backend AI microservice, Python 3.9 or higher is required. Users can navigate to the backend directory, install the requirements, and start the server:

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

For the frontend web client, Node.js 18 or higher is required. After configuring the environment variables for Supabase, dependencies are installed and the development server is started:

```bash
cd frontend
npm install
npm run dev
```

## Project team and references
The project was realized by the following team members:

| Student ID | Full name | Role & responsibilities |
| --- | --- | --- |
| 2352286 | Dinh Nguy Nguyet Ha | Requirement specification, use case analysis, and system testing |
| 2352171 | Duong Le Nhat Duy | Database architecture design, SQL schema, and Supabase security policies |
| 2352715 | Tran Thien Loc | Frontend development, UI/UX design, and API integration |
| 2353350 | Dinh Doan Vy | Backend API development, Q-learning algorithm implementation, and standard data digitization |

Theoretical foundations and algorithms are based on standard mechanical engineering principles, notably "Tinh toan thiet ke he dan dong co khi" by Trinh Chat & Le Van Uyen (2006, Vietnam Education Publishing House). The reinforcement learning implementation relies on the foundational Q-learning concepts introduced by Watkins & Dayan (1992, Machine learning, 8(3)) and the broader framework established by Sutton & Barto (2018, Reinforcement learning: An introduction, MIT press).
