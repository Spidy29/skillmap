# 🚀 ASCEND
> **The Intelligence Layer for Your Career Growth**

ASCEND is an AI-powered platform that autonomously decodes your professional DNA, identifies precise skill gaps against industry benchmarks, and architects a hyper-personalized roadmap to your dream role.

<img src="/logo.png" width="100" alt="ASCEND Logo" />

---

## 🏆 Built for Tambo Hackathon - "The UI Strikes Back"
This project demonstrates the power of **Tambo AI's Generative UI** capabilities.

### 📋 Tambo Integration Checklist

| Feature | Status | Location |
|---------|--------|----------|
| TamboProvider | ✅ Done | `src/app/chat/page.tsx` |
| Generative Components | ✅ 4 Components | `src/components/generative/` |
| Local Tools | ✅ 3 Tools | `src/lib/tambo.ts` |
| MCP Support | ✅ Configured | `src/components/tambo/mcp-config-modal.tsx` |
| UI Kit | ✅ Full | `src/components/tambo/` |

---

## 🧩 Tambo Components (Generative UI)

These components are registered with Tambo and AI decides when to render them:

### 1. `SkillTree` — Skills Overview
**File:** `src/components/generative/SkillTree.tsx`
- Shows all user skills organized by category
- Displays skill levels and importance for target role
- Visual skill landscape overview

### 2. `SkillGapCard` — Single Skill Gap Focus
**File:** `src/components/generative/SkillGapCard.tsx`
- Highlights a specific missing/weak skill
- Shows priority level and time estimate
- Includes learning resources

### 3. `LearningPath` — Step-by-Step Roadmap
**File:** `src/components/generative/LearningPath.tsx`
- Learning roadmap for a specific skill
- Types: Theory → Practice → Project → Assessment
- Progress tracking with completion status

### 4. `ProgressMeter` — Career Readiness
**File:** `src/components/generative/ProgressMeter.tsx`
- Overall career readiness visualization
- Category breakdowns and trends
- Next milestone tracking

---

## 🔧 Tambo Local Tools

These run in the browser and are available to the AI:

### 1. `analyzeResume`
**Purpose:** Analyzes resume text to extract skills, experience level
**Input:** `resumeText` (string)
**Output:** `extractedSkills`, `yearsOfExperience`, `currentLevel`

### 2. `getJobRequirements`
**Purpose:** Gets required skills for a target job role
**Input:** `targetRole` (string), `location` (optional)
**Output:** `role`, `requiredSkills`, `averageSalary`, `demandLevel`

### 3. `getLearningResources`
**Purpose:** Gets learning resources for a specific skill
**Input:** `skill` (string), `level` (beginner/intermediate/advanced)
**Output:** `skill`, `resources[]`, `estimatedTime`

---

## 📁 Project Structure

```
skillmap/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── chat/
│   │   │   └── page.tsx      # 🎯 Main chat with TamboProvider
│   │   └── interactables/
│   │       └── page.tsx      # Interactable components demo
│   ├── components/
│   │   ├── generative/       # 🎯 Tambo Generative Components
│   │   │   ├── SkillTree.tsx
│   │   │   ├── SkillGapCard.tsx
│   │   │   ├── LearningPath.tsx
│   │   │   ├── ProgressMeter.tsx
│   │   │   └── index.ts
│   │   ├── tambo/            # 🎯 Tambo UI Kit
│   │   │   ├── message-thread-full.tsx
│   │   │   ├── message-input.tsx
│   │   │   ├── thread-history.tsx
│   │   │   ├── mcp-config-modal.tsx
│   │   │   └── ...
│   │   └── ui/               # Custom UI components
│   └── lib/
│       └── tambo.ts          # 🎯 Tools & Components Registration
├── .env.local                # NEXT_PUBLIC_TAMBO_API_KEY
└── package.json
```

---

## ✨ Key Features

### 1. **Deep Analysis 🧠**
Drop your resume or describe your background. Our engine constructs a comprehensive skills graph and benchmarks you against the top 1% of your target field.

### 2. **Strategic Visualization 🗺️**
See the gap. Know the path. Interactive maps visualize the exact delta between your current capabilities and your goal, identifying high-leverage skills with the highest ROI.

### 3. **Precision Execution ⚡**
No fluff. Receive a curated, step-by-step curriculum with time-boxed milestones. Track your velocity and validate your skills as you ascend.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **AI Core:** **Tambo AI** `@tambo-ai/react@0.70.0`
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Schema Validation:** Zod

---

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ascend-skillmap.git
    cd ascend-skillmap
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Add Tambo API Key**
    ```bash
    # Create .env.local file
    NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing Prompts for Demo

Try these prompts in the chat to see Tambo in action:

```
1. "I'm a React developer with 2 years experience. I want to become an SDE-2"
   → Triggers: analyzeResume + SkillTree or SkillGapCard

2. "Show me my skill gaps for a Full-Stack Developer role"
   → Triggers: getJobRequirements + SkillGapCard

3. "Create a learning path for Docker"
   → Triggers: getLearningResources + LearningPath

4. "How ready am I for a DevOps Engineer position?"
   → Triggers: ProgressMeter

5. "Analyze my background: I know JavaScript, HTML, CSS, Git"
   → Triggers: SkillTree with current skills
```

---

## 🎯 Hackathon Judging Criteria

| Criteria | How ASCEND Addresses It |
|----------|------------------------|
| **Best Use Case of Tambo** | Generative UI for career coaching - AI decides components |
| **Technical Implementation** | 4 components, 3 tools, full Tambo SDK integration |
| **Creativity & Originality** | Unique skill gap visualization + personalized paths |
| **Aesthetics & UX** | Premium dark theme, smooth animations, intuitive chat |
| **Potential Impact** | Solves real problem - career growth navigation |

---

## 📹 Demo Recording

> ⚠️ **TODO:** Record a demo video showing:
> - Landing page
> - Chat interaction with AI
> - AI rendering components dynamically
> - Tool calls in action

---

## ❤️ Crafted By

**Arjun Sharma**
- [Portfolio](https://heyarjun.me)
- [GitHub](https://github.com/Start-sys)

*Built for The UI Strikes Back Hackathon 2026*

---

## 📚 Tambo Resources

- [Tambo Docs](https://docs.tambo.ai)
- [Tambo GitHub](https://github.com/tambo-ai/tambo)
- [Quickstart Guide](https://docs.tambo.ai/quickstart)
