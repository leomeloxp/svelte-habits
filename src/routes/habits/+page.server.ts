import { loginPath } from '$lib';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, loginPath());
  }

  const userId = event.locals.user.id;

  try {
    const habits = await db.select().from(table.habit).where(eq(table.habit.userId, userId));

    return {
      habits
    };
  } catch (error) {
    console.error('Error fetching habits:', error);
    return {
      habits: []
    };
  }
};

export const actions: Actions = {
  createHabit: async (event) => {
    if (!event.locals.user) {
      return fail(401, { message: 'Unauthorized' });
    }

    const userId = event.locals.user.id;
    const formData = await event.request.formData();
    const name = formData.get('name');

    try {
      await db.insert(table.habit).values({ id: uuid(), name, userId, createdAt: new Date() });
    } catch (e) {
      console.error('Error creating habit:', e);
      return fail(500, { message: 'An error has occurred' });
    }

    return {
      success: true
    };
  }
};
