import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRightLeft, Plus, Loader2, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { useUserRole } from '@/hooks/useUserRole';

interface Stats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  redirects: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const { isAdmin } = useUserRole();
  useEffect(() => {
    fetchStats();
  }, []);

  const triggerDeploy = async () => {
    if (!window.confirm('Da li želite da pokrenete novi Netlify deploy?')) {
      return;
    }

    setIsDeploying(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error('Niste prijavljeni. Osvežite stranicu i pokušajte ponovo.');
      }

      const response = await fetch('/.netlify/functions/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Deploy nije mogao da bude pokrenut.');
      }

      toast.success('Netlify deploy je pokrenut. Objavljivanje obično traje nekoliko minuta.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Deploy nije mogao da bude pokrenut.');
    } finally {
      setIsDeploying(false);
    }
  };

  const fetchStats = async () => {
    const [pagesResult, redirectsResult] = await Promise.all([
      supabase.from('pages').select('status'),
      supabase.from('redirects').select('id', { count: 'exact' }),
    ]);

    const pages = pagesResult.data || [];
    const publishedPages = pages.filter(p => p.status === 'published').length;
    const draftPages = pages.filter(p => p.status === 'draft').length;

    setStats({
      totalPages: pages.length,
      publishedPages,
      draftPages,
      redirects: redirectsResult.count || 0,
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the CMS admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalPages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Published</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats?.publishedPages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats?.draftPages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Redirects</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.redirects}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for managing your site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/pages/new">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Page
              </Button>
            </Link>
            <Link to="/admin/pages">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Manage Pages
              </Button>
            </Link>
            <Link to="/admin/redirects">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Manage Redirects
              </Button>
            </Link>
            {isAdmin && (
              <Button
                type="button"
                className="w-full justify-start bg-slate-900 text-white hover:bg-slate-800"
                onClick={triggerDeploy}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Rocket className="mr-2 h-4 w-4" />
                )}
                {isDeploying ? 'Pokretanje deploy-a...' : 'Objavi izmene na sajtu'}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Info</CardTitle>
            <CardDescription>How content management works</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>
              Use the sidebar to manage pages, posts, redirects, and site settings.
            </p>
            <p className="text-amber-600">
              Note: Only pages and posts with "Published" status will appear on the live site.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
