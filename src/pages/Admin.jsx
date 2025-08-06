import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    Filter,
    Eye,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Download,
    RefreshCw,
    UserCheck,
    Clock,
    AlertCircle
} from 'lucide-react';

const Admin = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [filterBy, setFilterBy] = useState('all');

    // Mock API data - replace with your actual API call
    const mockData = [
        {
            "_id": "68934738bac01af17c2bd983",
            "firstName": "Aditya",
            "lastName": "Gupta",
            "street": "dadas",
            "street2": "",
            "city": "Varanasi",
            "state": "UP",
            "zip": "221010",
            "email": "adityagupta1112004vns@gmail.com",
            "phone": "8081260600",
            "comments": "",
            "volunteeringPrefs": {
                "T-Shirts": "Would love to!",
                "Ticket Sales": "Would like to.",
                "Raffle Ticket Sales": "Wouldn't mind helping.",
                "Traffic/ Parking": "Wouldn't mind helping.",
                "Clean-Up/ Grounds": "Wouldn't mind helping."
            },
            "shiftPrefs": {
                "Best time for me.": "8am-1pm",
                "Not Available": "6pm-11pm"
            },
            "createdAt": "2025-08-06T12:14:48.605Z",
            "updatedAt": "2025-08-06T12:14:48.605Z",
            "__v": 0
        },
        {
            "_id": "68934e06079f1344e21ba80c",
            "firstName": "Rahul ",
            "lastName": "Jaiker",
            "street": "New Delhi",
            "street2": "",
            "city": "New Delhi",
            "state": "New Delhi",
            "zip": "4565",
            "email": "aditya2.230101008@iiitbh.ac.in",
            "phone": "8081260600",
            "comments": "",
            "volunteeringPrefs": {
                "T-Shirts": "Would love to!",
                "Ticket Sales": "Would like to.",
                "Raffle Ticket Sales": "Wouldn't mind helping.",
                "Traffic/ Parking": "Wouldn't mind helping.",
                "Clean-Up/ Grounds": "Wouldn't mind helping."
            },
            "shiftPrefs": {
                "Best time for me.": "8am-1pm",
                "Not Available": "6pm-11pm"
            },
            "createdAt": "2025-08-06T12:43:50.686Z",
            "updatedAt": "2025-08-06T12:43:50.686Z",
            "__v": 0
        }
    ];

    const fetchVolunteers = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://bkp-backend-assignment.onrender.com/api/volunteer');
            const data = await response.json();
            setTimeout(() => {
                setVolunteers(data);
                setFilteredVolunteers(data);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching volunteers:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    // Search and filter functionality
    useEffect(() => {
        let filtered = volunteers;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(volunteer =>
                `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                volunteer.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (filterBy !== 'all') {
            filtered = filtered.filter(volunteer =>
                Object.entries(volunteer.volunteeringPrefs).some(([key, value]) =>
                    key === filterBy && value === "Would love to!"
                )
            );
        }

        setFilteredVolunteers(filtered);
    }, [searchTerm, filterBy, volunteers]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPreferenceColor = (preference) => {
        const colors = {
            "Would love to!": "bg-green-100 text-green-800",
            "Would like to.": "bg-blue-100 text-blue-800",
            "Wouldn't mind helping.": "bg-yellow-100 text-yellow-800",
            "Not this area": "bg-gray-100 text-gray-800"
        };
        return colors[preference] || "bg-gray-100 text-gray-800";
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'City', 'State', 'Registration Date'];
        const csvContent = [
            headers.join(','),
            ...filteredVolunteers.map(v =>
                `"${v.firstName} ${v.lastName}","${v.email}","${v.phone}","${v.city}","${v.state}","${formatDate(v.createdAt)}"`
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'volunteers.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading volunteer data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Volunteer Management</h1>
                                <p className="text-gray-600">Manage and review volunteer registrations</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={fetchVolunteers}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Refresh</span>
                            </button>
                            <button
                                onClick={exportToCSV}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export CSV</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Volunteers</p>
                                <p className="text-2xl font-bold text-gray-900">{volunteers.length}</p>
                            </div>
                            <UserCheck className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Filters</p>
                                <p className="text-2xl font-bold text-gray-900">{filteredVolunteers.length}</p>
                            </div>
                            <Filter className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Recent (24h)</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {volunteers.filter(v =>
                                        new Date(v.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                                    ).length}
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">High Interest</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {volunteers.filter(v =>
                                        Object.values(v.volunteeringPrefs).includes("Would love to!")
                                    ).length}
                                </p>
                            </div>
                            <AlertCircle className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search volunteers by name, email, or city..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="T-Shirts">T-Shirts</option>
                                <option value="Ticket Sales">Ticket Sales</option>
                                <option value="Raffle Ticket Sales">Raffle Ticket Sales</option>
                                <option value="Traffic/ Parking">Traffic/Parking</option>
                                <option value="Clean-Up/ Grounds">Clean-Up/Grounds</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Volunteers Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Volunteer
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Top Preference
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Preferred Shift
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registered
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredVolunteers.map((volunteer) => {
                                    const topPreference = Object.entries(volunteer.volunteeringPrefs)
                                        .find(([_, value]) => value === "Would love to!") ||
                                        Object.entries(volunteer.volunteeringPrefs)[0];

                                    return (
                                        <tr key={volunteer._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                            {volunteer.firstName.charAt(0)}{volunteer.lastName.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {volunteer.firstName} {volunteer.lastName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <div className="flex items-center mb-1">
                                                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                                                        {volunteer.email}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Phone className="w-3 h-3 mr-1 text-gray-400" />
                                                        {volunteer.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                                                    {volunteer.city}, {volunteer.state}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPreferenceColor(topPreference[1])}`}>
                                                    {topPreference[0]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                                                    {volunteer.shiftPrefs["Best time for me."] || 'Not specified'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(volunteer.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => setSelectedVolunteer(volunteer)}
                                                    className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>View</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredVolunteers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No volunteers found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Volunteer Detail Modal */}
            {selectedVolunteer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {selectedVolunteer.firstName} {selectedVolunteer.lastName}
                                </h3>
                                <button
                                    onClick={() => setSelectedVolunteer(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Contact Information */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium">{selectedVolunteer.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-medium">{selectedVolunteer.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Address</h4>
                                <div className="text-sm text-gray-700">
                                    <p>{selectedVolunteer.street}</p>
                                    {selectedVolunteer.street2 && <p>{selectedVolunteer.street2}</p>}
                                    <p>{selectedVolunteer.city}, {selectedVolunteer.state} {selectedVolunteer.zip}</p>
                                </div>
                            </div>

                            {/* Volunteering Preferences */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Volunteering Preferences</h4>
                                <div className="space-y-2">
                                    {Object.entries(selectedVolunteer.volunteeringPrefs).map(([category, preference]) => (
                                        <div key={category} className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">{category}</span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getPreferenceColor(preference)}`}>
                                                {preference}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shift Preferences */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Shift Preferences</h4>
                                <div className="space-y-2">
                                    {Object.entries(selectedVolunteer.shiftPrefs).map(([type, shift]) => (
                                        <div key={type} className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">{type}</span>
                                            <span className="text-sm font-medium text-gray-900">{shift}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Comments */}
                            {selectedVolunteer.comments && (
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">Comments</h4>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                        {selectedVolunteer.comments}
                                    </p>
                                </div>
                            )}

                            {/* Registration Date */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Registration Details</h4>
                                <div className="text-sm text-gray-600">
                                    <p>Registered: {formatDate(selectedVolunteer.createdAt)}</p>
                                    <p>Last Updated: {formatDate(selectedVolunteer.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;