import { cookies } from 'next/headers';

export interface ServerUser {
  userId: string;
  email?: string;
  name?: string;
  attributes?: Record<string, unknown>;
}

export async function getServerUser(): Promise<ServerUser | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('tp_session');
    if (!session?.value) return null;

    const parsed = JSON.parse(decodeURIComponent(session.value));
    return {
      userId: parsed.userId || parsed.email || 'demo-user',
      email: parsed.email,
      name: parsed.name,
    };
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getServerUser();
  return !!user;
}

export async function getAuthSession() {
  const user = await getServerUser();
  return user ? { user } : null;
}

export async function hasRole(_role: string): Promise<boolean> {
  return !!(await getServerUser());
}
