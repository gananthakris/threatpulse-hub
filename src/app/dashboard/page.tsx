import { redirect } from 'next/navigation';
import { getServerUser } from '@/utils/server-auth';

// Server Component - runs on the server
export default async function DashboardPage() {
  // Layer 2: Server-side auth check (authoritative)
  const user = await getServerUser();
  
  if (!user) {
    // This shouldn't happen if middleware is working, but it's a safety net
    redirect('/authentication/sign-in');
  }
  
  // Now we can fetch user-specific data securely on the server
  // Example: const dashboardData = await fetchUserDashboard(user.userId);
  
  return (
    <div className="dashboard-container">
      <h1>Protected Dashboard</h1>
      <div className="user-info">
        <h2>Welcome, {user.name || user.email}!</h2>
        <p>User ID: {user.userId}</p>
        <p>Email: {user.email}</p>
      </div>
      
      <div className="auth-layers-info" style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>🔐 Auth Protection Layers Active:</h3>
        <ul>
          <li>✅ Layer 1: Edge middleware prevented unauthenticated access</li>
          <li>✅ Layer 2: Server component verified authentication</li>
          <li>✅ Layer 3: Client-side AuthProvider maintains session state</li>
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
          This page is protected by multiple layers of authentication. 
          The middleware blocks at the edge, server components verify on the backend, 
          and the client maintains the session for smooth navigation.
        </p>
      </div>
    </div>
  );
}