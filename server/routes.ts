import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import {
    insertEventSchema, insertTaskSchema,
    insertBookSchema, insertReadingSessionSchema,
    insertWorkoutTemplateSchema, insertWorkoutLogSchema,
    insertGoalSchema, insertGoalTaskSchema,
    insertProjectSchema, insertProjectTaskSchema,
    insertGeneralTaskSchema,
    insertRelationshipGroupSchema, insertPersonSchema,
    insertRecipeSchema, insertWeekPlanSchema, insertGroceryCheckSchema,
} from "@shared/schema";
import { z } from "zod";

function handleError(res: any, e: unknown) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: String(e) });
}

export function registerRoutes(_httpServer: ReturnType<typeof createServer>, app: Express) {

  // — Events —————————————————————————————————————————————
  app.get("/api/events", async (_req, res) => {
        try { res.json(await storage.getAllEventsWithTasks()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/events", async (req, res) => {
          try { res.status(201).json(await storage.createEvent(insertEventSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/events/:id", async (req, res) => {
          try {
                  const r = await storage.updateEvent(+req.params.id, insertEventSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/events/:id", async (req, res) => {
          try {
                  await storage.deleteEvent(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Tasks ——————————————————————————————————————————————
  app.post("/api/tasks", async (req, res) => {
        try { res.status(201).json(await storage.createTask(insertTaskSchema.parse(req.body))); }
        catch (e) { handleError(res, e); }
  });
    app.patch("/api/tasks/:id", async (req, res) => {
          try {
                  const r = await storage.updateTask(+req.params.id, insertTaskSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/tasks/:id", async (req, res) => {
          try {
                  await storage.deleteTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Books ——————————————————————————————————————————————
  app.get("/api/books", async (_req, res) => {
        try { res.json(await storage.getAllBooks()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/books", async (req, res) => {
          try { res.status(201).json(await storage.createBook(insertBookSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/books/:id", async (req, res) => {
          try {
                  const r = await storage.updateBook(+req.params.id, insertBookSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/books/:id", async (req, res) => {
          try {
                  await storage.deleteBook(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Reading Sessions ——————————————————————————————————
  app.get("/api/reading-sessions", async (_req, res) => {
        try { res.json(await storage.getAllReadingSessions()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/reading-sessions", async (req, res) => {
          try { res.status(201).json(await storage.createReadingSession(insertReadingSessionSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/reading-sessions/:id", async (req, res) => {
          try {
                  const r = await storage.updateReadingSession(+req.params.id, insertReadingSessionSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/reading-sessions/:id", async (req, res) => {
          try {
                  await storage.deleteReadingSession(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Workout Templates ——————————————————————————————————
  app.get("/api/workout-templates", async (_req, res) => {
        try { res.json(await storage.getAllWorkoutTemplates()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/workout-templates", async (req, res) => {
          try { res.status(201).json(await storage.createWorkoutTemplate(insertWorkoutTemplateSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/workout-templates/:id", async (req, res) => {
          try {
                  const r = await storage.updateWorkoutTemplate(+req.params.id, insertWorkoutTemplateSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/workout-templates/:id", async (req, res) => {
          try {
                  await storage.deleteWorkoutTemplate(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Workout Logs ——————————————————————————————————————
  app.get("/api/workout-logs", async (_req, res) => {
        try { res.json(await storage.getAllWorkoutLogs()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/workout-logs", async (req, res) => {
          try { res.status(201).json(await storage.createWorkoutLog(insertWorkoutLogSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/workout-logs/:id", async (req, res) => {
          try {
                  const r = await storage.updateWorkoutLog(+req.params.id, insertWorkoutLogSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/workout-logs/:id", async (req, res) => {
          try {
                  await storage.deleteWorkoutLog(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Goals ——————————————————————————————————————————————
  app.get("/api/goals", async (_req, res) => {
        try { res.json(await storage.getAllGoalsWithProjects()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/goals", async (req, res) => {
          try { res.status(201).json(await storage.createGoal(insertGoalSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/goals/:id", async (req, res) => {
          try {
                  const r = await storage.updateGoal(+req.params.id, insertGoalSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/goals/:id", async (req, res) => {
          try {
                  await storage.deleteGoal(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Goal Tasks (legacy) ————————————————————————————————
  app.post("/api/goal-tasks", async (req, res) => {
        try { res.status(201).json(await storage.createGoalTask(insertGoalTaskSchema.parse(req.body))); }
        catch (e) { handleError(res, e); }
  });
    app.patch("/api/goal-tasks/:id", async (req, res) => {
          try {
                  const r = await storage.updateGoalTask(+req.params.id, insertGoalTaskSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/goal-tasks/:id", async (req, res) => {
          try {
                  await storage.deleteGoalTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Projects ——————————————————————————————————————————
  app.get("/api/projects", async (_req, res) => {
        try { res.json(await storage.getStandaloneProjects()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/projects", async (req, res) => {
          try { res.status(201).json(await storage.createProject(insertProjectSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/projects/:id", async (req, res) => {
          try {
                  const r = await storage.updateProject(+req.params.id, insertProjectSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/projects/:id", async (req, res) => {
          try {
                  await storage.deleteProject(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Project Tasks ——————————————————————————————————————
  app.post("/api/project-tasks", async (req, res) => {
        try { res.status(201).json(await storage.createProjectTask(insertProjectTaskSchema.parse(req.body))); }
        catch (e) { handleError(res, e); }
  });
    app.patch("/api/project-tasks/:id", async (req, res) => {
          try {
                  const r = await storage.updateProjectTask(+req.params.id, insertProjectTaskSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/project-tasks/:id", async (req, res) => {
          try {
                  await storage.deleteProjectTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — General Tasks ——————————————————————————————————————
  app.get("/api/general-tasks", async (_req, res) => {
        try { res.json(await storage.getAllGeneralTasks()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/general-tasks", async (req, res) => {
          try { res.status(201).json(await storage.createGeneralTask(insertGeneralTaskSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/general-tasks/:id", async (req, res) => {
          try {
                  const r = await storage.updateGeneralTask(+req.params.id, insertGeneralTaskSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/general-tasks/:id", async (req, res) => {
          try {
                  await storage.deleteGeneralTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Recipes ————————————————————————————————————————————
  app.get("/api/recipes", async (_req, res) => {
        try { res.json(await storage.getAllRecipes()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/recipes", async (req, res) => {
          try { res.status(201).json(await storage.createRecipe(insertRecipeSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/recipes/:id", async (req, res) => {
          try {
                  const r = await storage.updateRecipe(+req.params.id, insertRecipeSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/recipes/:id", async (req, res) => {
          try {
                  await storage.deleteRecipe(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Week Plan ——————————————————————————————————————————
  app.get("/api/week-plan/:weekStart", async (req, res) => {
        try { res.json(await storage.getWeekPlan(req.params.weekStart)); } catch (e) { handleError(res, e); }
  });
    app.post("/api/week-plan", async (req, res) => {
          try { res.status(201).json(await storage.setWeekPlanItem(insertWeekPlanSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.delete("/api/week-plan/:id", async (req, res) => {
          try {
                  await storage.deleteWeekPlanItem(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — Grocery Checks ——————————————————————————————————————
  app.get("/api/grocery-checks/:weekStart", async (req, res) => {
        try { res.json(await storage.getGroceryChecks(req.params.weekStart)); } catch (e) { handleError(res, e); }
  });
    app.patch("/api/grocery-checks", async (req, res) => {
          try {
                  const { weekStart, itemKey, checked } = req.body;
                  res.json(await storage.setGroceryCheck({ weekStart, itemKey, checked }));
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/grocery-checks/:weekStart", async (req, res) => {
          try { await storage.clearGroceryChecks(req.params.weekStart); res.json({ ok: true }); }
          catch (e) { handleError(res, e); }
    });

  // — Relationship Groups —————————————————————————————————
  app.get("/api/relationship-groups", async (_req, res) => {
        try { res.json(await storage.getAllRelationshipGroups()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/relationship-groups", async (req, res) => {
          try { res.status(201).json(await storage.createRelationshipGroup(insertRelationshipGroupSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/relationship-groups/:id", async (req, res) => {
          try {
                  const r = await storage.updateRelationshipGroup(+req.params.id, insertRelationshipGroupSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/relationship-groups/:id", async (req, res) => {
          try {
                  await storage.deleteRelationshipGroup(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  // — People —————————————————————————————————————————————
  app.get("/api/people", async (_req, res) => {
        try { res.json(await storage.getAllPeople()); } catch (e) { handleError(res, e); }
  });
    app.post("/api/people", async (req, res) => {
          try { res.status(201).json(await storage.createPerson(insertPersonSchema.parse(req.body))); }
          catch (e) { handleError(res, e); }
    });
    app.patch("/api/people/:id", async (req, res) => {
          try {
                  const r = await storage.updatePerson(+req.params.id, insertPersonSchema.partial().parse(req.body));
                  r ? res.json(r) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });
    app.delete("/api/people/:id", async (req, res) => {
          try {
                  await storage.deletePerson(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
          } catch (e) { handleError(res, e); }
    });

  return _httpServer;
}
