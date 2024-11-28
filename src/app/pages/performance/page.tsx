import Performance from '../../components/Performance';
import Layout from '@/app/components/main/layout';

const PerformanceSection = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-600">Seller Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Layout>
           <Performance />
        </Layout>
        
      </div>
    </div>
  );
};

export default PerformanceSection;