import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
    events, tasks, recipes, weekPlan, groceryChecks, books, readingSessions,
    workoutTemplates, workoutLogs, goals, goalTasks, projects, projectTasks,
    generalTasks, relationshipGroups, people,
} from "@shared/schema";
import type {
    InsertEvent, Event, InsertTask, Task, EventWithTasks,
    InsertRecipe, Recipe, InsertWeekPlan, WeekPlan, InsertGroceryCheck, GroceryCheck,
    InsertBook, Book, BookWithSessions,
    InsertReadingSession, ReadingSession,
    InsertWorkoutTemplate, WorkoutTemplate,
    InsertWorkoutLog, WorkoutLog,
    InsertGoal, Goal, GoalWithTasks, GoalWithProjects,
    InsertGoalTask, GoalTask,
    InsertProject, Project, ProjectWithTasks,
    InsertProjectTask, ProjectTask,
    InsertGeneralTask, GeneralTask,
    InsertRelationshipGroup, RelationshipGroup,
    InsertPerson, Person, PersonWithSpouse,
} from "@shared/schema";
import { eq, asc, desc, isNull } from "drizzle-orm";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

// — Events ——————————————————————————————————————————————————
export async function getAllEventsWithTasks(): Promise<EventWithTasks[]> {
    const evts = await db.select().from(events).orderBy(asc(events.date));
    const tsks = await db.select().from(tasks);
    return evts.map((e) => ({
          ...e,
          tasks: tsks.filter((t) => t.eventId === e.id),
    }));
}
export async function getEvent(id: number): Promise<Event | undefined> {
    const rows = await db.select().from(events).where(eq(events.id, id));
    return rows[0];
}
export async function createEvent(data: InsertEvent): Promise<Event> {
    const rows = await db.insert(events).values(data).returning();
    return rows[0];
}
export async function updateEvent(id: number, data: Partial<InsertEvent>): Promise<Event | undefined> {
    const rows = await db.update(events).set(data).where(eq(events.id, id)).returning();
    return rows[0];
}
export async function deleteEvent(id: number): Promise<boolean> {
    const rows = await db.delete(events).where(eq(events.id, id)).returning();
    return rows.length > 0;
}

// — Tasks ——————————————————————————————————————————————————
export async function getTasksForEvent(eventId: number): Promise<Task[]> {
    return db.select().from(tasks).where(eq(tasks.eventId, eventId)).orderBy(asc(tasks.sortOrder));
}
export async function createTask(data: InsertTask): Promise<Task> {
    const rows = await db.insert(tasks).values(data).returning();
    return rows[0];
}
export async function updateTask(id: number, data: Partial<InsertTask>): Promise<Task | undefined> {
    const rows = await db.update(tasks).set(data).where(eq(tasks.id, id)).returning();
    return rows[0];
}
export async function deleteTask(id: number): Promise<boolean> {
    const rows = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return rows.length > 0;
}

// — Books ——————————————————————————————————————————————————
export async function getAllBooks(): Promise<Book[]> {
    return db.select().from(books).orderBy(asc(books.sortOrder));
}
export async function getBook(id: number): Promise<Book | undefined> {
    const rows = await db.select().from(books).where(eq(books.id, id));
    return rows[0];
}
export async function getBookWithSessions(id: number): Promise<BookWithSessions | undefined> {
    const book = await getBook(id);
    if (!book) return undefined;
    const sessions = await db.select().from(readingSessions).where(eq(readingSessions.bookId, id)).orderBy(desc(readingSessions.date));
    return { ...book, sessions };
}
export async function createBook(data: InsertBook): Promise<Book> {
    const rows = await db.insert(books).values(data).returning();
    return rows[0];
}
export async function updateBook(id: number, data: Partial<InsertBook>): Promise<Book | undefined> {
    const rows = await db.update(books).set(data).where(eq(books.id, id)).returning();
    return rows[0];
}
export async function deleteBook(id: number): Promise<boolean> {
    const rows = await db.delete(books).where(eq(books.id, id)).returning();
    return rows.length > 0;
}

// — Reading Sessions ——————————————————————————————————————
export async function getReadingSessionsForBook(bookId: number): Promise<ReadingSession[]> {
    return db.select().from(readingSessions).where(eq(readingSessions.bookId, bookId)).orderBy(desc(readingSessions.date));
}
export async function createReadingSession(data: InsertReadingSession): Promise<ReadingSession> {
    const rows = await db.insert(readingSessions).values(data).returning();
    return rows[0];
}
export async function updateReadingSession(id: number, data: Partial<InsertReadingSession>): Promise<ReadingSession | undefined> {
    const rows = await db.update(readingSessions).set(data).where(eq(readingSessions.id, id)).returning();
    return rows[0];
}
export async function deleteReadingSession(id: number): Promise<boolean> {
    const rows = await db.delete(readingSessions).where(eq(readingSessions.id, id)).returning();
    return rows.length > 0;
}

// — Workout Templates ——————————————————————————————————————
export async function getAllWorkoutTemplates(): Promise<WorkoutTemplate[]> {
    return db.select().from(workoutTemplates).orderBy(asc(workoutTemplates.name));
}
export async function getWorkoutTemplate(id: number): Promise<WorkoutTemplate | undefined> {
    const rows = await db.select().from(workoutTemplates).where(eq(workoutTemplates.id, id));
    return rows[0];
}
export async function createWorkoutTemplate(data: InsertWorkoutTemplate): Promise<WorkoutTemplate> {
    const rows = await db.insert(workoutTemplates).values(data).returning();
    return rows[0];
}
export async function updateWorkoutTemplate(id: number, data: Partial<InsertWorkoutTemplate>): Promise<WorkoutTemplate | undefined> {
    const rows = await db.update(workoutTemplates).set(data).where(eq(workoutTemplates.id, id)).returning();
    return rows[0];
}
export async function deleteWorkoutTemplate(id: number): Promise<boolean> {
    const rows = await db.delete(workoutTemplates).where(eq(workoutTemplates.id, id)).returning();
    return rows.length > 0;
}

// — Workout Logs ——————————————————————————————————————————
export async function getAllWorkoutLogs(): Promise<WorkoutLog[]> {
    return db.select().from(workoutLogs).orderBy(desc(workoutLogs.date));
}
export async function getWorkoutLog(id: number): Promise<WorkoutLog | undefined> {
    const rows = await db.select().from(workoutLogs).where(eq(workoutLogs.id, id));
    return rows[0];
}
export async function createWorkoutLog(data: InsertWorkoutLog): Promise<WorkoutLog> {
    const rows = await db.insert(workoutLogs).values(data).returning();
    return rows[0];
}
export async function updateWorkoutLog(id: number, data: Partial<InsertWorkoutLog>): Promise<WorkoutLog | undefined> {
    const rows = await db.update(workoutLogs).set(data).where(eq(workoutLogs.id, id)).returning();
    return rows[0];
}
export async function deleteWorkoutLog(id: number): Promise<boolean> {
    const rows = await db.delete(workoutLogs).where(eq(workoutLogs.id, id)).returning();
    return rows.length > 0;
}

// — Goals ——————————————————————————————————————————————————
export async function getAllGoalsWithProjects(): Promise<GoalWithProjects[]> {
    const gs = await db.select().from(goals);
    const ps = await db.select().from(projects);
    const pts = await db.select().from(projectTasks);
    return gs.map((g) => ({
          ...g,
          projects: ps
            .filter((p) => p.goalId === g.id)
            .map((p) => ({ ...p, tasks: pts.filter((t) => t.projectId === p.id) })),
    }));
}
export async function getAllGoalsWithTasks(): Promise<GoalWithTasks[]> {
    const gs = await db.select().from(goals);
    const gts = await db.select().from(goalTasks);
    return gs.map((g) => ({
          ...g,
          tasks: gts.filter((t) => t.goalId === g.id),
    }));
}
export async function createGoal(data: InsertGoal): Promise<Goal> {
    const rows = await db.insert(goals).values(data).returning();
    return rows[0];
}
export async function updateGoal(id: number, data: Partial<InsertGoal>): Promise<Goal | undefined> {
    const rows = await db.update(goals).set(data).where(eq(goals.id, id)).returning();
    return rows[0];
}
export async function deleteGoal(id: number): Promise<boolean> {
    const rows = await db.delete(goals).where(eq(goals.id, id)).returning();
    return rows.length > 0;
}

// — Goal Tasks (legacy) ————————————————————————————————————
export async function createGoalTask(data: InsertGoalTask): Promise<GoalTask> {
    const rows = await db.insert(goalTasks).values(data).returning();
    return rows[0];
}
export async function updateGoalTask(id: number, data: Partial<InsertGoalTask>): Promise<GoalTask | undefined> {
    const rows = await db.update(goalTasks).set(data).where(eq(goalTasks.id, id)).returning();
    return rows[0];
}
export async function deleteGoalTask(id: number): Promise<boolean> {
    const rows = await db.delete(goalTasks).where(eq(goalTasks.id, id)).returning();
    return rows.length > 0;
}

// — Projects ——————————————————————————————————————————————
async function getProjectsWithTasks(ps: typeof projects.$inferSelect[]): Promise<ProjectWithTasks[]> {
    const pts = await db.select().from(projectTasks);
    return ps.map((p) => ({ ...p, tasks: pts.filter((t) => t.projectId === p.id) }));
}
export async function getProjectsForGoal(goalId: number): Promise<ProjectWithTasks[]> {
    const ps = await db.select().from(projects).where(eq(projects.goalId, goalId)).orderBy(asc(projects.sortOrder));
    return getProjectsWithTasks(ps);
}
export async function getStandaloneProjects(): Promise<ProjectWithTasks[]> {
    const ps = await db.select().from(projects).where(isNull(projects.goalId)).orderBy(asc(projects.sortOrder));
    return getProjectsWithTasks(ps);
}
export async function createProject(data: InsertProject): Promise<Project> {
    const rows = await db.insert(projects).values(data).returning();
    return rows[0];
}
export async function updateProject(id: number, data: Partial<InsertProject>): Promise<Project | undefined> {
    const rows = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return rows[0];
}
export async function deleteProject(id: number): Promise<boolean> {
    const rows = await db.delete(projects).where(eq(projects.id, id)).returning();
    return rows.length > 0;
}

// — Project Tasks ——————————————————————————————————————————
export async function createProjectTask(data: InsertProjectTask): Promise<ProjectTask> {
    const rows = await db.insert(projectTasks).values(data).returning();
    return rows[0];
}
export async function updateProjectTask(id: number, data: Partial<InsertProjectTask>): Promise<ProjectTask | undefined> {
    const rows = await db.update(projectTasks).set(data).where(eq(projectTasks.id, id)).returning();
    return rows[0];
}
export async function deleteProjectTask(id: number): Promise<boolean> {
    const rows = await db.delete(projectTasks).where(eq(projectTasks.id, id)).returning();
    return rows.length > 0;
}

// — General Tasks ——————————————————————————————————————————
export async function getAllGeneralTasks(): Promise<GeneralTask[]> {
    return db.select().from(generalTasks).orderBy(asc(generalTasks.sortOrder));
}
export async function createGeneralTask(data: InsertGeneralTask): Promise<GeneralTask> {
    const rows = await db.insert(generalTasks).values(data).returning();
    return rows[0];
}
export async function updateGeneralTask(id: number, data: Partial<InsertGeneralTask>): Promise<GeneralTask | undefined> {
    const rows = await db.update(generalTasks).set(data).where(eq(generalTasks.id, id)).returning();
    return rows[0];
}
export async function deleteGeneralTask(id: number): Promise<boolean> {
    const rows = await db.delete(generalTasks).where(eq(generalTasks.id, id)).returning();
    return rows.length > 0;
}

// — Recipes ————————————————————————————————————————————————
export async function getAllRecipes(): Promise<Recipe[]> {
    return db.select().from(recipes).orderBy(asc(recipes.name));
}
export async function createRecipe(data: InsertRecipe): Promise<Recipe> {
    const rows = await db.insert(recipes).values(data).returning();
    return rows[0];
}
export async function updateRecipe(id: number, data: Partial<InsertRecipe>): Promise<Recipe | undefined> {
    const rows = await db.update(recipes).set(data).where(eq(recipes.id, id)).returning();
    return rows[0];
}
export async function deleteRecipe(id: number): Promise<boolean> {
    const rows = await db.delete(recipes).where(eq(recipes.id, id)).returning();
    return rows.length > 0;
}

// — Week Plan ——————————————————————————————————————————————
export async function getWeekPlan(weekStart: string): Promise<WeekPlan[]> {
    return db.select().from(weekPlan).where(eq(weekPlan.weekStart, weekStart));
}
export async function setWeekPlanItem(data: InsertWeekPlan): Promise<WeekPlan> {
    const rows = await db.insert(weekPlan).values(data).returning();
    return rows[0];
}
export async function deleteWeekPlanItem(id: number): Promise<boolean> {
    const rows = await db.delete(weekPlan).where(eq(weekPlan.id, id)).returning();
    return rows.length > 0;
}

// — Grocery Checks ——————————————————————————————————————————
export async function getGroceryChecks(weekStart: string): Promise<GroceryCheck[]> {
    return db.select().from(groceryChecks).where(eq(groceryChecks.weekStart, weekStart));
}
export async function setGroceryCheck(data: InsertGroceryCheck): Promise<GroceryCheck> {
    const rows = await db.insert(groceryChecks).values(data).returning();
    return rows[0];
}
export async function clearGroceryChecks(weekStart: string): Promise<void> {
    await db.delete(groceryChecks).where(eq(groceryChecks.weekStart, weekStart));
}

// — Relationship Groups —————————————————————————————————————
export async function getAllRelationshipGroups(): Promise<RelationshipGroup[]> {
    return db.select().from(relationshipGroups).orderBy(asc(relationshipGroups.sortOrder));
}
export async function createRelationshipGroup(data: InsertRelationshipGroup): Promise<RelationshipGroup> {
    const rows = await db.insert(relationshipGroups).values(data).returning();
    return rows[0];
}
export async function updateRelationshipGroup(id: number, data: Partial<InsertRelationshipGroup>): Promise<RelationshipGroup | undefined> {
    const rows = await db.update(relationshipGroups).set(data).where(eq(relationshipGroups.id, id)).returning();
    return rows[0];
}
export async function deleteRelationshipGroup(id: number): Promise<boolean> {
    // Ungroup people belonging to this group
  await db.update(people).set({ groupId: null }).where(eq(people.groupId, id));
    const rows = await db.delete(relationshipGroups).where(eq(relationshipGroups.id, id)).returning();
    return rows.length > 0;
}

// — People —————————————————————————————————————————————————
export async function getAllPeople(): Promise<PersonWithSpouse[]> {
    const ps = await db.select().from(people).orderBy(asc(people.sortOrder));
    // Attach spouse details
  return ps.map((p) => ({
        ...p,
        spouse: p.spouseId ? (ps.find((s) => s.id === p.spouseId) ?? null) : null,
  }));
}
export async function createPerson(data: InsertPerson): Promise<Person> {
    const rows = await db.insert(people).values(data).returning();
    return rows[0];
}
export async function updatePerson(id: number, data: Partial<InsertPerson>): Promise<Person | undefined> {
    const rows = await db.update(people).set(data).where(eq(people.id, id)).returning();
    return rows[0];
}
export async function deletePerson(id: number): Promise<boolean> {
    // Remove spouse links pointing to this person
  await db.update(people).set({ spouseId: null }).where(eq(people.spouseId, id));
    // Delete linked birthday event if any
  const person = await db.select().from(people).where(eq(people.id, id));
    if (person[0]?.birthdayEventId) {
          await db.delete(tasks).where(eq(tasks.eventId, person[0].birthdayEventId));
          await db.delete(events).where(eq(events.id, person[0].birthdayEventId));
    }
    const rows = await db.delete(people).where(eq(people.id, id)).returning();
    return rows.length > 0;
}

// Re-export storage object for backward compatibility with routes.ts
export const storage = {
    getAllEventsWithTasks,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getTasksForEvent,
    createTask,
    updateTask,
    deleteTask,
    getAllBooks,
    getBook,
    getBookWithSessions,
    createBook,
    updateBook,
    deleteBook,
    getReadingSessionsForBook,
    createReadingSession,
    updateReadingSession,
    deleteReadingSession,
    getAllWorkoutTemplates,
    getWorkoutTemplate,
    createWorkoutTemplate,
    updateWorkoutTemplate,
    deleteWorkoutTemplate,
    getAllWorkoutLogs,
    getWorkoutLog,
    createWorkoutLog,
    updateWorkoutLog,
    deleteWorkoutLog,
    getAllGoalsWithProjects,
    getAllGoalsWithTasks,
    createGoal,
    updateGoal,
    deleteGoal,
    createGoalTask,
    updateGoalTask,
    deleteGoalTask,
    getProjectsForGoal,
    getStandaloneProjects,
    createProject,
    updateProject,
    deleteProject,
    createProjectTask,
    updateProjectTask,
    deleteProjectTask,
    getAllGeneralTasks,
    createGeneralTask,
    updateGeneralTask,
    deleteGeneralTask,
    getAllRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getWeekPlan,
    setWeekPlanItem,
    deleteWeekPlanItem,
    getGroceryChecks,
    setGroceryCheck,
    clearGroceryChecks,
    getAllRelationshipGroups,
    createRelationshipGroup,
    updateRelationshipGroup,
    deleteRelationshipGroup,
    getAllPeople,
    createPerson,
    updatePerson,
    deletePerson,
};
