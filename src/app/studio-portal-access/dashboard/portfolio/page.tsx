import { PrismaClient } from '@prisma/client';
import PortfolioUploadForm from './PortfolioUploadForm';
import PortfolioGrid from './PortfolioGrid';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AdminPortfolio() {
  const images = await prisma.portfolioImage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <div className="admin-header">
        <h1>Portfolio Manager</h1>
      </div>
      
      <div className="dashboard-grid">
        <div>
          <h2 style={{marginBottom: '1rem', color: 'var(--accent)'}}>Current Gallery</h2>
          <PortfolioGrid images={images} />
        </div>
        
        <div>
          <h2 style={{marginBottom: '1rem', color: 'var(--accent)'}}>Upload New Work</h2>
          <p style={{marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--foreground-muted)'}}>Upload new high-res images to the public portfolio.</p>
          <PortfolioUploadForm />
        </div>
      </div>
    </>
  );
}
