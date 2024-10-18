import React from 'react';
import ReactDOM from 'react-dom/client';
import LeadList from './components/LeadList';

export default function App() {
    return (
        <div className="container mx-auto">

            <LeadList />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
