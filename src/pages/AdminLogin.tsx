
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simple password hashing check (in production, use proper bcrypt)
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !adminUser) {
        toast.error('Utilizator sau parolă incorectă');
        setIsLoading(false);
        return;
      }

      // For demo purposes, we'll use a simple check
      // In production, you should use proper password hashing
      if (password === 'admin123') {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminUsername', username);
        toast.success('Autentificare reușită!');
        navigate('/admin-dashboard');
      } else {
        toast.error('Utilizator sau parolă incorectă');
      }
    } catch (error) {
      toast.error('Eroare la autentificare');
      console.error('Login error:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Dashboard Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Utilizator
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Parolă
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Se autentifică...' : 'Login'}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Utilizator demo: admin | Parolă demo: admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
