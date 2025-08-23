import MetricPill from '../components/MetricPill';
import TinySparkline from '../components/TinySparkline';
import DataTable from '../components/DataTable';

const Analytics = () => {
  // Sample data
  const wpmData = [40, 55, 48, 62, 70, 68, 75, 80, 78, 82, 85, 87];
  const sessionData = [
    ['2023-05-15', 'Quick Test', '80', '98%'],
    ['2023-05-14', 'Paragraph', '75', '96%'],
    ['2023-05-13', 'Quick Test', '78', '97%'],
    ['2023-05-12', 'Drill', '72', '94%'],
    ['2023-05-11', 'Quick Test', '70', '95%'],
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold mb-4">Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricPill label="Sessions" value="42" />
          <MetricPill label="Day Streak" value="12" />
          <MetricPill label="Best WPM" value="87" />
        </div>
        
        <div className="glass-card p-4 mb-6">
          <h3 className="font-semibold mb-3">Progress Over Time</h3>
          <TinySparkline data={wpmData} className="text-teal-400" />
        </div>
        
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3">Session History</h3>
          <DataTable 
            headers={['Date', 'Mode', 'WPM', 'Accuracy']} 
            data={sessionData} 
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;