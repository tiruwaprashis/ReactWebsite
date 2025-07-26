import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Card, Statistic, Table } from 'antd'; // assuming you are using Ant Design

const Dashboard = () => {
  const { currentUser } = useAuth();

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Activity', dataIndex: 'activity', key: 'activity' },
    { title: 'User', dataIndex: 'user', key: 'user' },
  ];

  const dataSource = [
    { key: '1', date: '2023-05-05', activity: 'New student registered', user: 'Admin' },
    { key: '2', date: '2023-05-04', activity: 'Payment received', user: 'John Doe' },
    { key: '3', date: '2023-05-03', activity: 'New course added', user: 'Admin' },
    { key: '4', date: '2023-05-02', activity: 'Attendance marked', user: 'Teacher' },
  ];

  const backgroundStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '1rem'
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={backgroundStyle}>
      <div style={contentStyle} className="dashboard p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Active Academy ERP</h2>
        <p className="mb-6">
          Hello, <strong>{currentUser?.username}</strong>! You are logged in as <strong>{currentUser?.role}</strong>.
        </p>

        <div className="stats-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <Statistic title="Total Students" value={124} />
          </Card>
          <Card>
            <Statistic title="Active Courses" value={8} />
          </Card>
          <Card>
            <Statistic title="Today's Attendance" value={87} suffix="%" precision={2} />
          </Card>
          <Card>
            <Statistic title="Pending Fees" value={12} />
          </Card>
        </div>

        <div className="recent-activity">
          <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;