import { loginPath } from '$lib';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
  if (!event?.locals?.session) {
    return redirect(302, loginPath());
  }
  await auth.invalidateSession(event.locals.session.id);
  event.cookies.delete(auth.sessionCookieName, { path: '/' });

  return redirect(302, loginPath());
};
