import { loginPath } from '$lib';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { isAfter } from 'date-fns';
import { and, asc, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, loginPath());
  }

  const userId = event.locals.user.id;
  const habitId = event.params.id;

  try {
    const habitsPromise = db.select().from(table.habit).where(eq(table.habit.id, habitId));
    const habitEventsPromise = db
      .select()
      .from(table.habitEvent)
      .where(and(eq(table.habitEvent.userId, userId), eq(table.habitEvent.habitId, habitId)))
      .limit(20)
      .orderBy(asc(table.habitEvent.createdAt));

    const [[habit], habitEvents = []] = await Promise.all([habitsPromise, habitEventsPromise]);

    if (!habit) {
      return fail(404, { message: 'Habit not found' });
    }

    return {
      habit,
      habitEvents
    };
  } catch (error) {
    console.error('Error fetching habits:', error);
    return fail(500, { message: 'An error has occurred' });
  }
};

export const actions: Actions = {
  createHabitEvent: async (event) => {
    if (!event.locals.user) {
      return fail(401, { message: 'Unauthorized' });
    }

    const userId = event.locals.user.id;
    const habitId = event.params.id;
    const formData = await event.request.formData();
    const createdAtString = formData.get('createdAt') as string | undefined;
    const createdAt = new Date(createdAtString || Date.now());

    if (isAfter(createdAt, new Date())) {
      return fail(400, { message: 'Cannot create a habit event in the future' });
    }

    try {
      await db.insert(table.habitEvent).values({ id: uuid(), habitId, userId, createdAt });
    } catch (e) {
      console.error('Error creating habit:', e);
      return fail(500, { message: 'An error has occurred' });
    }

    return {
      success: true
    };
  }
};
