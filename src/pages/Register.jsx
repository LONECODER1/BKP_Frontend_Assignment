import { useState } from 'react';
import { Heart, Users, Mail, Phone, MapPin, Calendar, MessageSquare } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', street: '', street2: '', city: '',
        state: '', zip: '', email: '', phone: '', comments: '',
        volunteeringPrefs: {}, shiftPrefs: {}
    });

    const categories = ['T-Shirts', 'Ticket Sales', 'Raffle Ticket Sales', 'Traffic/ Parking', 'Clean-Up/ Grounds'];
    const categoryOptions = ['Would love to!', 'Would like to.', "Wouldn't mind helping.", 'Not this area'];
    const shiftOptions = ['8am-1pm', '1pm-6pm', '6pm-11pm'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (category, value) => {
        setFormData(prev => ({
            ...prev,
            volunteeringPrefs: { ...prev.volunteeringPrefs, [category]: value }
        }));
    };

    const handleShiftChange = (shift, value) => {
        setFormData(prev => ({
            ...prev,
            shiftPrefs: { ...prev.shiftPrefs, [shift]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://bkp-backend-assignment.onrender.com/api/volunteer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Form submitted successfully!");
                setFormData({
                    firstName: '', lastName: '', street: '', street2: '', city: '',
                    state: '', zip: '', email: '', phone: '', comments: '',
                    volunteeringPrefs: {}, shiftPrefs: {}
                });
            } else {
                const err = await response.json();
                alert(`Submission failed: ${err.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit form. Please try again.");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Volunteer Registration</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join our amazing community of volunteers! Let us know your areas of interest and we'll get back to you soon.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Personal Information Section */}
                    <div className="border-b border-gray-200 pb-8">
                        <div className="flex items-center mb-6">
                            <Users className="w-6 h-6 text-blue-600 mr-3" />
                            <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    placeholder="Enter your first name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    placeholder="Enter your last name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                            <h3 className="text-lg font-medium text-gray-700">Address</h3>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                placeholder="Street Address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="street2"
                                value={formData.street2}
                                placeholder="Street Address Line 2 (Optional)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                onChange={handleChange}
                            />
                            <div className="grid md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    placeholder="City"
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    placeholder="State / Province"
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    placeholder="Zip Code"
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="border-b border-gray-200 pb-8">
                        <h3 className="text-lg font-medium text-gray-700 mb-6">Contact Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center mb-2">
                                    <Mail className="w-5 h-5 text-gray-500 mr-2" />
                                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="your.email@example.com"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <div className="flex items-center mb-2">
                                    <Phone className="w-5 h-5 text-gray-500 mr-2" />
                                    <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    placeholder="(000) 000-0000"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Volunteering Preferences */}
                    <div className="border-b border-gray-200 pb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Volunteering Preferences</h3>
                        <div className="space-y-6">
                            {categories.map((cat) => (
                                <div key={cat} className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-800 mb-3">{cat}</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {categoryOptions.map(opt => (
                                            <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`category-${cat}`}
                                                    value={opt}
                                                    checked={formData.volunteeringPrefs[cat] === opt}
                                                    onChange={() => handleCategoryChange(cat, opt)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shift Preferences */}
                    <div className="border-b border-gray-200 pb-8">
                        <div className="flex items-center mb-6">
                            <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                            <h3 className="text-xl font-semibold text-gray-800">Shift Preferences</h3>
                        </div>
                        <div className="space-y-6">
                            {['Best time for me.', 'Not Available'].map(label => (
                                <div key={label} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-800 mb-3">{label}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {shiftOptions.map(opt => (
                                            <label key={opt} className="flex items-center space-x-2 cursor-pointer bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 transition-colors">
                                                <input
                                                    type="radio"
                                                    name={`shift-${label}`}
                                                    value={opt}
                                                    checked={formData.shiftPrefs[label] === opt}
                                                    onChange={() => handleShiftChange(label, opt)}
                                                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="pb-8">
                        <div className="flex items-center mb-4">
                            <MessageSquare className="w-6 h-6 text-green-600 mr-3" />
                            <label className="text-lg font-medium text-gray-800">Additional Comments</label>
                        </div>
                        <textarea
                            name="comments"
                            value={formData.comments}
                            placeholder="Tell us anything else you'd like us to know about your volunteer interests or availability..."
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Submit Registration
                        </button>
                        <p className="text-sm text-gray-500 mt-3">
                            We'll review your application and get back to you within 2-3 business days.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;