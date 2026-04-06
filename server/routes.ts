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

  // ── Events ──────────────────────────────────────────────────────────────────
  app.get("/api/events", (_req, res) => {
    try { res.json(storage.getAllEventsWithTasks()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/events", (req, res) => {
    try { res.status(201).json(storage.createEvent(insertEventSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/events/:id", (req, res) => {
    try {
      const r = storage.updateEvent(+req.params.id, insertEventSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/events/:id", (req, res) => {
    storage.deleteEvent(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Tasks ────────────────────────────────────────────────────────────────────
  app.post("/api/events/:eventId/tasks", (req, res) => {
    try { res.status(201).json(storage.createTask(insertTaskSchema.parse({ ...req.body, eventId: +req.params.eventId }))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/tasks/:id", (req, res) => {
    try {
      const r = storage.updateTask(+req.params.id, insertTaskSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/tasks/:id", (req, res) => {
    storage.deleteTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Books ────────────────────────────────────────────────────────────────────
  app.get("/api/books", (_req, res) => {
    try { res.json(storage.getAllBooksWithSessions()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/books", (req, res) => {
    try { res.status(201).json(storage.createBook(insertBookSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/books/:id", (req, res) => {
    try {
      const r = storage.updateBook(+req.params.id, insertBookSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/books/:id", (req, res) => {
    storage.deleteBook(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Reading Sessions ──────────────────────────────────────────────────────────
  app.get("/api/reading-sessions", (_req, res) => {
    try { res.json(storage.getAllReadingSessions()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/reading-sessions", (req, res) => {
    try { res.status(201).json(storage.createReadingSession(insertReadingSessionSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/reading-sessions/:id", (req, res) => {
    try {
      const r = storage.updateReadingSession(+req.params.id, insertReadingSessionSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/reading-sessions/:id", (req, res) => {
    storage.deleteReadingSession(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Workout Templates ─────────────────────────────────────────────────────────
  app.get("/api/workout-templates", (_req, res) => {
    try { res.json(storage.getAllWorkoutTemplates()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/workout-templates", (req, res) => {
    try { res.status(201).json(storage.createWorkoutTemplate(insertWorkoutTemplateSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/workout-templates/:id", (req, res) => {
    try {
      const r = storage.updateWorkoutTemplate(+req.params.id, insertWorkoutTemplateSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/workout-templates/:id", (req, res) => {
    storage.deleteWorkoutTemplate(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Workout Logs ──────────────────────────────────────────────────────────────
  app.get("/api/workout-logs", (_req, res) => {
    try { res.json(storage.getAllWorkoutLogs()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/workout-logs", (req, res) => {
    try { res.status(201).json(storage.createWorkoutLog(insertWorkoutLogSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/workout-logs/:id", (req, res) => {
    try {
      const r = storage.updateWorkoutLog(+req.params.id, insertWorkoutLogSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/workout-logs/:id", (req, res) => {
    storage.deleteWorkoutLog(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Goals ─────────────────────────────────────────────────────────────────────
  app.get("/api/goals", (_req, res) => {
    try { res.json(storage.getAllGoalsWithProjects()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/goals", (req, res) => {
    try { res.status(201).json(storage.createGoal(insertGoalSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/goals/:id", (req, res) => {
    try {
      const r = storage.updateGoal(+req.params.id, insertGoalSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/goals/:id", (req, res) => {
    storage.deleteGoal(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Goal Tasks (legacy) ──────────────────────────────────────────────────────
  app.post("/api/goals/:goalId/tasks", (req, res) => {
    try { res.status(201).json(storage.createGoalTask(insertGoalTaskSchema.parse({ ...req.body, goalId: +req.params.goalId }))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/goal-tasks/:id", (req, res) => {
    try {
      const r = storage.updateGoalTask(+req.params.id, insertGoalTaskSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/goal-tasks/:id", (req, res) => {
    storage.deleteGoalTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Projects ──────────────────────────────────────────────────────────────────
  app.post("/api/goals/:goalId/projects", (req, res) => {
    try { res.status(201).json(storage.createProject(insertProjectSchema.parse({ ...req.body, goalId: +req.params.goalId }))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/projects/:id", (req, res) => {
    try {
      const r = storage.updateProject(+req.params.id, insertProjectSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/projects/:id", (req, res) => {
    storage.deleteProject(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Project Tasks ─────────────────────────────────────────────────────────────
  app.post("/api/projects/:projectId/tasks", (req, res) => {
    try { res.status(201).json(storage.createProjectTask(insertProjectTaskSchema.parse({ ...req.body, projectId: +req.params.projectId }))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/project-tasks/:id", (req, res) => {
    try {
      const r = storage.updateProjectTask(+req.params.id, insertProjectTaskSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/project-tasks/:id", (req, res) => {
    storage.deleteProjectTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Standalone Projects (no goal) ────────────────────────────────────────────
  app.get("/api/projects/standalone", (_req, res) => {
    try { res.json(storage.getStandaloneProjects()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/projects/standalone", (req, res) => {
    try { res.status(201).json(storage.createProject(insertProjectSchema.parse({ ...req.body, goalId: null }))); }
    catch (e) { handleError(res, e); }
  });

  // ── General Tasks ─────────────────────────────────────────────────────────────
  app.get("/api/general-tasks", (_req, res) => {
    try { res.json(storage.getAllGeneralTasks()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/general-tasks", (req, res) => {
    try { res.status(201).json(storage.createGeneralTask(insertGeneralTaskSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/general-tasks/:id", (req, res) => {
    try {
      const r = storage.updateGeneralTask(+req.params.id, insertGeneralTaskSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/general-tasks/:id", (req, res) => {
    storage.deleteGeneralTask(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Relationship Groups ───────────────────────────────────────────────────────
  app.get("/api/groups", (_req, res) => {
    try { res.json(storage.getAllGroups()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/groups", (req, res) => {
    try { res.status(201).json(storage.createGroup(insertRelationshipGroupSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/groups/:id", (req, res) => {
    try {
      const r = storage.updateGroup(+req.params.id, insertRelationshipGroupSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/groups/:id", (req, res) => {
    storage.deleteGroup(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── People ────────────────────────────────────────────────────────────────────
  app.get("/api/people", (_req, res) => {
    try { res.json(storage.getAllPeople()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/people", (req, res) => {
    try {
      const person = storage.createPerson(insertPersonSchema.parse(req.body));
      // Auto-create a yearly recurring birthday event if birthday provided
      if (person.birthday) {
        const name = [person.firstName, person.lastName].filter(Boolean).join(" ");
        const event = storage.createEvent({
          title: `${name}'s Birthday`,
          date: person.birthday,
          endDate: null,
          category: "birthday",
          recurring: "yearly",
          description: null,
          color: null,
        });
        storage.updatePerson(person.id, { birthdayEventId: event.id });
        person.birthdayEventId = event.id;
      }
      res.status(201).json(person);
    } catch (e) { handleError(res, e); }
  });
  app.patch("/api/people/:id", (req, res) => {
    try {
      const data = insertPersonSchema.partial().parse(req.body);
      const existing = storage.getAllPeople().find(p => p.id === +req.params.id);
      if (!existing) return res.status(404).json({ error: "Not found" });

      // If birthday changed, update the linked event
      if (data.birthday !== undefined && data.birthday !== existing.birthday) {
        const name = [data.firstName ?? existing.firstName, data.lastName ?? existing.lastName].filter(Boolean).join(" ");
        if (existing.birthdayEventId) {
          // Update existing event
          storage.updateEvent(existing.birthdayEventId, {
            title: `${name}'s Birthday`,
            date: data.birthday || existing.birthday || "",
            recurring: "yearly",
          });
        } else if (data.birthday) {
          // Create new event
          const event = storage.createEvent({
            title: `${name}'s Birthday`,
            date: data.birthday,
            endDate: null,
            category: "birthday",
            recurring: "yearly",
            description: null,
            color: null,
          });
          data.birthdayEventId = event.id;
        }
      }

      const r = storage.updatePerson(+req.params.id, data);
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/people/:id", (req, res) => {
    storage.deletePerson(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // Link spouse bidirectionally in one atomic call
  app.post("/api/people/:id/link-spouse", (req, res) => {
    try {
      const id = +req.params.id;
      const { spouseId } = req.body as { spouseId: number | null };

      // Get current person to find old spouse (for unlinking)
      const current = storage.getAllPeople().find(p => p.id === id);
      if (!current) return res.status(404).json({ error: "Not found" });

      // Unlink old spouse if changing
      if (current.spouseId && current.spouseId !== spouseId) {
        storage.updatePerson(current.spouseId, { spouseId: null });
      }

      // Link both directions
      storage.updatePerson(id, { spouseId: spouseId ?? null });
      if (spouseId) {
        // Unlink new spouse's old spouse first
        const newSpouse = storage.getAllPeople().find(p => p.id === spouseId);
        if (newSpouse?.spouseId && newSpouse.spouseId !== id) {
          storage.updatePerson(newSpouse.spouseId, { spouseId: null });
        }
        storage.updatePerson(spouseId, { spouseId: id });
      }

      res.json({ ok: true });
    } catch (e) { handleError(res, e); }
  });

  // ── Recipes ────────────────────────────────────────────────────────────────
  app.get("/api/recipes", (_req, res) => {
    try { res.json(storage.getAllRecipes()); } catch (e) { handleError(res, e); }
  });
  app.post("/api/recipes", (req, res) => {
    try { res.status(201).json(storage.createRecipe(insertRecipeSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.patch("/api/recipes/:id", (req, res) => {
    try {
      const r = storage.updateRecipe(+req.params.id, insertRecipeSchema.partial().parse(req.body));
      r ? res.json(r) : res.status(404).json({ error: "Not found" });
    } catch (e) { handleError(res, e); }
  });
  app.delete("/api/recipes/:id", (req, res) => {
    storage.deleteRecipe(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Week Plan ───────────────────────────────────────────────────────────────
  app.get("/api/week-plan/:weekStart", (req, res) => {
    try { res.json(storage.getWeekPlan(req.params.weekStart)); } catch (e) { handleError(res, e); }
  });
  app.post("/api/week-plan", (req, res) => {
    try { res.status(201).json(storage.assignRecipe(insertWeekPlanSchema.parse(req.body))); }
    catch (e) { handleError(res, e); }
  });
  app.delete("/api/week-plan/:id", (req, res) => {
    storage.removeWeekAssignment(+req.params.id) ? res.json({ ok: true }) : res.status(404).json({ error: "Not found" });
  });

  // ── Grocery Checks ──────────────────────────────────────────────────────────
  app.get("/api/grocery-checks/:weekStart", (req, res) => {
    try { res.json(storage.getGroceryChecks(req.params.weekStart)); } catch (e) { handleError(res, e); }
  });
  app.patch("/api/grocery-checks", (req, res) => {
    try {
      const { weekStart, itemKey, checked } = req.body;
      res.json(storage.upsertGroceryCheck(weekStart, itemKey, checked));
    } catch (e) { handleError(res, e); }
  });
}