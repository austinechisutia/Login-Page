function LocationSelect({ country, value, onChange }) {
    try {
        const locations = {
            '+254': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Nyeri', 'Thika', 'Malindi', 'Kitale', 'Garissa', 'Kakamega', 'Ruiru', 'Machakos', 'Kisii', 'Bungoma'],
            '+234': ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Kaduna', 'Enugu', 'Oyo', 'Warri', 'Calabar', 'Aba', 'Jos', 'Maiduguri', 'Zaria'],
            '+1': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco'],
            '+44': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Bristol', 'Cardiff', 'Edinburgh', 'Leicester', 'Sheffield', 'Belfast', 'Nottingham', 'Oxford'],
            '+91': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane'],
            '+27': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Polokwane', 'Nelspruit', 'Kimberley'],
            '+255': ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya', 'Morogoro', 'Tanga', 'Kigoma', 'Moshi', 'Tabora'],
            '+256': ['Kampala', 'Gulu', 'Lira', 'Mbarara', 'Jinja', 'Bwizibwera', 'Mbale', 'Mukono', 'Kasese', 'Masaka'],
            '+251': ['Addis Ababa', 'Dire Dawa', 'Mek\'ele', 'Gondar', 'Adama', 'Hawassa', 'Bahir Dar', 'Jimma', 'Dessie', 'Jijiga'],
            '+220': ['Banjul', 'Serekunda', 'Brikama', 'Bakau', 'Farafenni', 'Lamin', 'Gunjur', 'Soma', 'Basse Santa Su', 'Kerewan'],
            '+233': ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi', 'Sunyani', 'Cape Coast', 'Obuasi', 'Teshie', 'Tema', 'Koforidua'],
            '+225': ['Abidjan', 'Bouaké', 'Yamoussoukro', 'Daloa', 'San-Pédro', 'Divo', 'Korhogo', 'Man', 'Gagnoa', 'Abengourou'],
            '+234': ['Lagos', 'Kano', 'Ibadan', 'Kaduna', 'Port Harcourt', 'Benin City', 'Maiduguri', 'Zaria', 'Aba', 'Jos'],
            '+20': ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Tanta'],
            '+212': ['Casablanca', 'Rabat', 'Fes', 'Marrakesh', 'Agadir', 'Tangier', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan'],
            '+216': ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana', 'Gafsa', 'La Marsa', 'Monastir'],
            '+218': ['Tripoli', 'Benghazi', 'Misrata', 'Tarhuna', 'Al Khums', 'Zawiya', 'Sirte', 'Zliten', 'Ajdabiya', 'Sabha'],
            '+249': ['Khartoum', 'Omdurman', 'Nyala', 'Port Sudan', 'Kassala', 'Al-Qadarif', 'Al-Fashir', 'Wad Madani', 'Al-Ubayyid', 'Kosti'],
            '+86': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Wuhan', 'Chengdu', 'Tianjin', 'Xi\'an', 'Hangzhou', 'Nanjing'],
            '+81': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
            '+82': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Seongnam', 'Changwon'],
            '+7': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod', 'Chelyabinsk', 'Krasnoyarsk', 'Samara', 'Ufa'],
            '+55': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
            '+52': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Zapopan', 'Mérida', 'Cancún'],
            '+33': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
            '+49': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen'],
            '+39': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
            '+34': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
            '+61': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Hobart']
        };

        const countryLocations = locations[country] || [];
        const [searchTerm, setSearchTerm] = React.useState('');
        const [isOpen, setIsOpen] = React.useState(false);

        const filteredLocations = countryLocations.filter(location =>
            location.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="relative" data-name="location-select-container">
                <div 
                    className="input-field p-3 rounded-lg w-full cursor-pointer flex items-center justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                    data-name="location-select-trigger"
                >
                    <span>{value || 'Select Location'}</span>
                    <i className="fas fa-chevron-down text-xs"></i>
                </div>
                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg" data-name="location-select-dropdown">
                        <input
                            type="text"
                            className="input-field w-full p-2 sticky top-0"
                            placeholder="Search location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            data-name="location-search-input"
                        />
                        {filteredLocations.map((location) => (
                            <div
                                key={location}
                                className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
                                onClick={() => {
                                    onChange(location);
                                    setIsOpen(false);
                                    setSearchTerm('');
                                }}
                                data-name="location-option"
                            >
                                {location}
                            </div>
                        ))}
                        {filteredLocations.length === 0 && (
                            <div className="px-3 py-2 text-gray-500" data-name="no-locations-message">
                                {countryLocations.length === 0 
                                    ? 'No locations available for this country' 
                                    : 'No locations found matching your search'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('LocationSelect Error:', error);
        reportError(error);
        return null;
    }
}
