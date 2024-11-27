import ListingForm from '../tractorsAddingForm/page';
import Performance from '../../components/Performance';
import Inquiries from '../../components/Inquiries';
import SalesData from '../../components/SalesData';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-3xl font-semibold mb-6">Seller Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="col-span-1">
          <ListingForm />
        </div>
        <div className="col-span-1">
          <Performance />
          <Inquiries />
          <SalesData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

