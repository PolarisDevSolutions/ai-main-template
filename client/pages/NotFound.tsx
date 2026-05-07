import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Seo from '@site/components/Seo';
import Layout from '@site/components/layout/Layout';
import { Button } from '@site/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <Seo
        title="404 - Page Not Found"
        description="The page you are looking for does not exist."
        noindex={true}
      />
      
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="font-grotesk text-[clamp(4rem,10vw,120px)] font-light text-brand-accent mb-4">
            404
          </h1>
          <p className="font-manrope text-[28px] text-white mb-4">
            Oops! Page not found
          </p>
          <p className="font-manrope text-[18px] text-white/70 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-brand-accent text-black font-manrope text-[20px] px-8 py-6 h-auto hover:bg-brand-accent/90">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
