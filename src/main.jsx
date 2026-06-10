import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AOS from 'aos';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';

const logo = '/assets/images/logo.png';

const footer_logo = '/assets/images/footer-logo.png';

const about_img = '/assets/images/about/car.png';

const cars = [
  // Hatchback
  {
    name: 'Swift',
    price: '₹2,199/day',
    seats: 5,
    fuel: 'Petrol/CNG',
    ac: 'AC',
    type: 'Hatchback',
    image: 'https://www.autovista.in/assets/product_images/gallery/new-all-new-swift-front.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Compact and fuel-efficient hatchback for daily city commutes and quick getaways.',
  },
  {
    name: 'Baleno',
    price: '₹2,399/day',
    seats: 5,
    fuel: 'Petrol/CNG',
    ac: 'AC',
    type: 'Hatchback',
    image: 'https://imgd-ct.aeplcdn.com/664x415/n/7a8rrua_1559471.jpg?q=80?auto=format&fit=crop&w=1200&q=80',
    description: 'Stylish premium hatchback with spacious interiors for modern families.',
  },
  {
    name: 'i10',
    price: '₹1,999/day',
    seats: 5,
    fuel: 'Petrol',
    ac: 'AC',
    type: 'Hatchback',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Grand-i10-Nios/10088/1762430432997/front-left-side-47.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Affordable and reliable hatchback perfect for budget-conscious travelers.',
  },
  {
    name: 'Tiago',
    price: '₹2,099/day',
    seats: 5,
    fuel: 'Petrol/CNG',
    ac: 'AC',
    type: 'Hatchback',
    image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/219990/next-gen-tiago-exterior-left-front-three-quarter-8.jpeg?isig=0&q=80&q=80?auto=format&fit=crop&w=1200&q=80',
    description: 'Vibrant hatchback with great mileage and easy handling for city drives.',
  },
  // Sedan
  {
    name: 'Dzire',
    price: '₹2,599/day',
    seats: 5,
    fuel: 'Petrol/CNG',
    ac: 'AC',
    type: 'Sedan',
    image: 'https://motomotar.com/wp-content/uploads/2024/04/Maruti-Dzire-2024-reder.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Smart and economical sedan for daily bookings, quick transfers, and city errands.',
  },
  {
    name: 'Amaze',
    price: '₹2,799/day',
    seats: 5,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'Sedan',
    image: 'https://acko-cms.ackoassets.com/features_honda_amaze_6bdea0f520.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Comfortable compact sedan with excellent boot space for family trips.',
  },
  {
    name: 'City',
    price: '₹3,099/day',
    seats: 5,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'Sedan',
    image: 'https://5.imimg.com/data5/GN/GC/QU/GLADMIN-31549807/citycar-500x500-500x500.png?auto=format&fit=crop&w=1200&q=80',
    description: 'Stylish mid-size sedan for business travel and premium comfort journeys.',
  },
  {
    name: 'Verna',
    price: '₹3,399/day',
    seats: 5,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'Sedan',
    image: 'https://cdn-s3.autocarindia.com/legacy/cdni/ExtraImages/20200330032320_2020-Hyundai-Verna-1.jpg?w=728&q=75?q=80?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium sedan with modern features for corporate and leisure travelers.',
  },
  // SUV
  {
    name: 'Thar',
    price: '₹5,499/day',
    seats: 5,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'SUV',
    image: 'https://i.pinimg.com/736x/41/65/ba/4165baadad75c1d4c1c08f0096957ee3.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Adventure-ready SUV with rugged design for off-road expeditions and bold journeys.',
  },
  {
    name: 'Scorpio N',
    price: '₹6,299/day',
    seats: 7,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'SUV',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    description: 'Powerful SUV with commanding road presence for family adventures and long routes.',
  },
  {
    name: 'Scorpio Classic',
    price: '₹5,799/day',
    seats: 7,
    fuel: 'Diesel',
    ac: 'AC',
    type: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Classic workhorse SUV known for durability and performance across terrain.',
  },
  {
    name: 'Creta',
    price: '₹3,999/day',
    seats: 5,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'SUV',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1755765115423/front-left-side-47.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Compact SUV with modern styling for tours, airport pickups, and weekend escapes.',
  },
  {
    name: 'Seltos',
    price: '₹4,399/day',
    seats: 5,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'SUV',
    image: 'https://media.zigcdn.com/media/model/2026/Mar/front-1-4-left-1330986678_930x620.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Tech-packed SUV with contemporary design for modern travelers.',
  },
  {
    name: 'Nexon',
    price: '₹3,699/day',
    seats: 5,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'SUV',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80',
    description: 'Sporty compact SUV with agile handling perfect for urban expeditions.',
  },
  {
    name: 'XUV700',
    price: '₹7,499/day',
    seats: 7,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'SUV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium 3-row SUV with luxury features for family expeditions and group travel.',
  },
  // Family Cars
  {
    name: 'Ertiga',
    price: '₹4,099/day',
    seats: 7,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'Family Cars',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious 7-seater for family outings with comfortable seating and modern amenities.',
  },
  {
    name: 'Carens',
    price: '₹4,499/day',
    seats: 7,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'Family Cars',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    description: 'Flexible family car with generous room for luggage, comfort, and group travel.',
  },
  {
    name: 'Rumion',
    price: '₹4,299/day',
    seats: 7,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'Family Cars',
    image: 'https://cdn-s3.autocarindia.com/legacy/cdni/mmv_images/colors/20250714024406_Toyota_Rumion_Cafe_White[1].jpg?w=640&q=75?auto=format&fit=crop&w=1200&q=80',
    description: 'Multi-purpose 7-seater ideal for family gatherings and weekend retreats.',
  },
  {
    name: 'Innova',
    price: '₹5,999/day',
    seats: 8,
    fuel: 'Petrol/Diesel',
    ac: 'AC',
    type: 'Family Cars',
    image: 'https://cdn-s3.autocarindia.com/legacy/cdni/ExtraImages/20201124124812_Toyota-Innova-Crysta-2020.jpg?w=728&q=75?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium 8-seater for comfortable family tours and group adventures.',
  },
  // Traveller
  {
    name: 'Force Traveller 12 Seater',
    price: '₹9,999/day',
    seats: 12,
    fuel: 'Diesel',
    ac: 'AC',
    type: 'Traveller',
    image: 'https://monarchtravelservices.com/wp-content/uploads/2026/02/17-seater-tempo-traveller.webp?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious 12-seater coach for group tours and large family expeditions.',
  },
  {
    name: 'Force Traveller 17 Seater',
    price: '₹12,999/day',
    seats: 17,
    fuel: 'Diesel',
    ac: 'AC',
    type: 'Traveller',
    image: 'https://buscdn.cardekho.com/in/force/traveller-3350-super/force-traveller-3350-super.jpg?impolicy=resize&imwidth=480?auto=format&fit=crop&w=1200&q=80',
    description: 'Extra spacious 17-seater for corporate outings and large group journeys.',
  },
  {
    name: 'Tempo Traveller',
    price: '₹8,999/day',
    seats: 12,
    fuel: 'Diesel',
    ac: 'AC',
    type: 'Traveller',
    image: 'https://www.pawarcarrentals.com/uploads/page-images/1688817927_23)%20Tempo%20Traveller%2017%20Seater%20on%20Rent%20in%20Pune.jpg?auto=format&fit=crop&w=1200&q=80',
    description: 'Comfortable luxury coach perfect for weddings, tours, and group travel.',
  },
];

const carBrands = {
  Honda: ['Amaze', 'City'],
  Hyundai: ['Grand i10 Nios', 'i20', 'Aura', 'Verna', 'Venue', 'Creta'],
  'Maruti Suzuki': ['Swift', 'Dzire', 'Brezza', 'Ertiga', 'Baleno', 'Fronx'],
};

const features = [
  ['bi-person-check', 'Professional Drivers'],
  ['bi-cash-coin', 'Affordable Pricing'],
  ['bi-headset', '24/7 Support'],
  ['bi-stars', 'Luxury Fleet'],
  ['bi-shield-check', 'Sanitized Cars'],
  ['bi-clock-history', 'On-Time Pickup'],
  ['bi-calendar2-check', 'Easy Booking'],
  ['bi-patch-check', 'Trusted Service'],
];

const gallery = [
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
];

const testimonials = [
  {
    name: 'Kiran Kumar Majhi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    text: 'The wedding car arrived spotless and exactly on time. The driver was calm, polite, and made the day easier.',
  },
  {
    name: 'Sougat Swain',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    text: 'Booked an Innova for a family picnic. Transparent pricing, comfortable seats, and excellent support.',
  },
  {
    name: 'Somya Behera',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: 'Our airport transfers for guests were managed smoothly. Premium service without confusing charges.',
  },
];

function App() {
  const [selectedType, setSelectedType] = useState('All');
  const [showTop, setShowTop] = useState(false);
  const [submissionState, setSubmissionState] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('qt4MehMFptnRVP1Tc'); // Replace with your EmailJS public key
    
    AOS.init({ duration: 850, once: true, offset: 90 });
    const loader = setTimeout(() => setLoading(false), 700);
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => {
      clearTimeout(loader);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const types = useMemo(() => ['All', ...new Set(cars.map((car) => car.type))], []);
  const filteredCars = selectedType === 'All' ? cars : cars.filter((car) => car.type === selectedType);

  const submitBooking = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.classList.add('was-validated');
      return;
    }

    // Collect form data
    const formData = {
      to_email: 'smtravelsbbsr@gmail.com', // Replace with your email
      name: event.currentTarget.name?.value || event.currentTarget.heroName?.value,
      email: event.currentTarget.email?.value || event.currentTarget.heroEmail?.value,
      phone: event.currentTarget.phone?.value || event.currentTarget.heroPhone?.value,
      event_type: event.currentTarget.event?.value || event.currentTarget.heroEvent?.value,
      car_brand: event.currentTarget.carBrand?.value || event.currentTarget.heroCarBrand?.value,
      car_model: event.currentTarget.car?.value || event.currentTarget.heroCar?.value,
      service_type: event.currentTarget.querySelector('input[name="serviceType"]:checked')?.value || 'car-rent',
      driver_preference: event.currentTarget.querySelector('input[name="driverPreference"]:checked')?.value || 'with-driver',
      description: event.currentTarget.description?.value || event.currentTarget.heroDescription?.value,
      message: `New Booking Request\n\nName: ${event.currentTarget.name?.value || event.currentTarget.heroName?.value}\nEmail: ${event.currentTarget.email?.value || event.currentTarget.heroEmail?.value}\nPhone: ${event.currentTarget.phone?.value || event.currentTarget.heroPhone?.value}\n\nEvent Type: ${event.currentTarget.event?.value || event.currentTarget.heroEvent?.value}\nService: ${event.currentTarget.querySelector('input[name="serviceType"]:checked')?.value || 'car-rent'}\nDriver: ${event.currentTarget.querySelector('input[name="driverPreference"]:checked')?.value || 'with-driver'}\nCar: ${event.currentTarget.carBrand?.value || event.currentTarget.heroCarBrand?.value} - ${event.currentTarget.car?.value || event.currentTarget.heroCar?.value}\n\nRequirements:\n${event.currentTarget.description?.value || event.currentTarget.heroDescription?.value}`
    };

    // Send email using EmailJS
    emailjs.send('service_uv7635o', 'template_0138vzt', formData)
      .then(() => {
        setSubmissionState('success');
        event.currentTarget.reset();
        event.currentTarget.classList.remove('was-validated');
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        setSubmissionState('error');
        event.currentTarget.reset();
        event.currentTarget.classList.remove('was-validated');
      });
  };

  if (currentPage === 'booking') {
    return <BookingPage onBack={() => setCurrentPage('home')} onSubmit={submitBooking} />;
  }

  return (
    <>
      {loading && (
        <div className="loader" aria-label="Loading">
          <div className="loader-ring" />
        </div>
      )}

      <nav className="navbar navbar-expand-lg fixed-top glass-nav px-lg-5" style={{width:'100vw'}}>
        <div className="container">
          <a className="navbar-brand" href="#home" aria-label="Company Car Rental home">
            <img className="brand-logo" src={logo} alt="Company Car Rental" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              {[
                ['Cars', 'fleet'],
                ['Gallery', 'gallery'],
                ['About', 'about'],
                ['FAQ', 'faq'],
              ].map(([item, target]) => (
                <li className="nav-item" key={item}>
                  <a className="nav-link" href={`#${target}`}>
                    {item}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <button className="btn btn-gold ms-lg-2" onClick={() => setCurrentPage('booking')} style={{border: 'none', cursor: 'pointer'}}>
                  <i className="bi bi-calendar2-check me-2" /> Book Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="row align-items-center g-4">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="proof-badge"><i className="bi bi-star-fill" /> 4.9 rated premium rental service</div>
              <h2>Luxury Cars for Every Special Journey</h2>
              <p>Wedding Cars, Picnic Trips, Corporate Travel & Premium Rentals at Affordable Prices</p>
              <div className="hero-actions">
                <button className="btn btn-gold btn-lg" onClick={() => setCurrentPage('booking')} style={{border: 'none', cursor: 'pointer', padding: '12px 28px', fontSize: 'inherit'}}>Book Now</button>
                <a className="btn btn-ghost btn-lg" href="#fleet">Explore Cars</a>
              </div>
              <div className="hero-stamps">
                <span><i className="bi bi-shield-check" /> Verified Drivers</span>
                <span><i className="bi bi-fuel-pump" /> Clean Fleet</span>
                <span><i className="bi bi-telephone" /> 24/7 Help</span>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <BookingForm onSubmit={submitBooking} compact />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section stats-strip">
          <div className="container">
            <div className="row g-3 text-center">
              {[
                ['12K+', 'Happy Customers'],
                ['85+', 'Cars Available'],
                ['28K+', 'Trips Completed'],
                ['10+', 'Years of Experience'],
              ].map(([value, label]) => (
                <div className="col-6 col-lg-3" key={label} data-aos="zoom-in">
                  <div className="stat-box">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="section booking-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5" data-aos="fade-right">
                <span className="section-kicker">Fast enquiry</span>
                <h2>Tell us the occasion. We will match the perfect ride.</h2>
                <p className="section-copy">Share your route, date, passenger count, and preferred car. Our team will confirm availability and negotiate a fair quote quickly.</p>
                <div className="contact-card">
                  <i className="bi bi-whatsapp" />
                  <div>
                    <strong>Need instant help?</strong>
                    <span>WhatsApp or call for wedding, airport, and tour bookings.</span>
                  </div>
                </div>
                <div className="booking-actions">
                  <button className="btn btn-gold btn-lg" onClick={() => setCurrentPage('booking')} style={{border: 'none', cursor: 'pointer'}}><i className="bi bi-calendar2-check me-2" /> Use Booking Form</button>
                  <a className="btn btn-outline-dark btn-lg" href="tel:9777082174"><i className="bi bi-telephone me-2" /> Call Now</a>
                </div>
              </div>
              <div className="col-lg-7" data-aos="fade-left" data-aos-delay="120">
                <div className="booking-showcase">
                  <div className="orbit-ring ring-one" />
                  <div className="orbit-ring ring-two" />
                  <div className="showcase-card main-ride-card">
                    <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1100&q=85" alt="Driver opening a car door for a customer" />
                    <div className="ride-overlay">
                      <span>Your trip plan</span>
                      <strong>Car + Driver + Pickup</strong>
                    </div>
                  </div>

                  <div className="showcase-card quote-card">
                    <i className="bi bi-lightning-charge-fill" />
                    <strong>Quick Quote</strong>
                    <span>price and car options</span>
                  </div>
                  <div className="showcase-card route-card">
                    <i className="bi bi-geo-alt-fill" />
                    <strong>Pickup Confirmed</strong>
                    <span>driver reaches your location</span>
                  </div>
                  <div className="showcase-card price-card">
                    <span>Best for</span>
                    <strong>Wedding, Airport, Tours</strong>
                    <small>and family trips</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="booking-process row g-3">
              {[
                ['bi-chat-left-text', 'Send Requirement', 'Use the hero booking form or call with your date, pickup point, and event type.'],
                ['bi-car-front', 'Get Car Options', 'We suggest cars that fit your passenger count, style, route, and budget.'],
                ['bi-patch-check', 'Confirm & Ride', 'Finalize the quote, driver, timing, and enjoy a polished rental experience.'],
              ].map(([icon, title, text], index) => (
                <div className="col-md-4" key={title} data-aos="fade-up" data-aos-delay={index * 90}>
                  <div className="process-card">
                    <i className={`bi ${icon}`} />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="fleet" className="section fleet-section">
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <span className="section-kicker">Premium fleet</span>
              <h2>Choose a car for every plan</h2>
              <p>Luxury sedans, spacious SUVs, family cars, and affordable daily rentals with negotiable pricing.</p>
            </div>
            <div className="filter-pills" data-aos="fade-up">
              {types.map((type) => (
                <button className={selectedType === type ? 'active' : ''} onClick={() => setSelectedType(type)} key={type}>
                  {type}
                </button>
              ))}
            </div>
            <div className="row g-4">
              {filteredCars.map((car, index) => (
                <div className="col-md-6 col-xl-3" key={car.name} data-aos="fade-up" data-aos-delay={(index % 4) * 80}>
                  <article className="car-card">
                    <div className="car-media">
                      <img src={car.image} alt={car.name} />
                      <span className="badge-negotiable">Negotiable</span>
                    </div>
                    <div className="car-body">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <h3>{car.name}</h3>
                        <strong>{car.price}</strong>
                      </div>
                      <div className="car-meta">
                        <span><i className="bi bi-people" /> {car.seats} Seats</span>
                        <span><i className="bi bi-fuel-pump" /> {car.fuel}</span>
                        <span><i className="bi bi-snow" /> {car.ac}</span>
                      </div>
                      <p>{car.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="type-chip">{car.type}</span>
                        <button className="btn btn-sm btn-dark" onClick={() => setCurrentPage('booking')} style={{border: 'none', cursor: 'pointer'}}>Book Now</button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section feature-section">
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <span className="section-kicker">Why choose us</span>
              <h2>Premium service without premium stress</h2>
            </div>
            <div className="row g-3">
              {features.map(([icon, label], index) => (
                <div className="col-6 col-lg-3" key={label} data-aos="zoom-in" data-aos-delay={(index % 4) * 70}>
                  <div className="feature-card">
                    <i className={`bi ${icon}`} />
                    <h3>{label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <span className="section-kicker">Gallery</span>
              <h2>Moments made better in the right car</h2>
            </div>
            <div className="gallery-grid">
              {gallery.map((image, index) => (
                <button className={`gallery-item item-${index + 1}`} key={image} onClick={() => setLightbox(image)} data-aos="fade-up">
                  <img src={image} alt="Car rental experience" />
                  <span><i className="bi bi-arrows-fullscreen" /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="section testimonial-section">
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <span className="section-kicker">Testimonials</span>
              <h2>Trusted by families and companies</h2>
            </div>
            <Swiper modules={[Autoplay, Pagination, Navigation]} slidesPerView={1} spaceBetween={24} pagination navigation autoplay={{ delay: 3200 }} breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}>
              {testimonials.map((review) => (
                <SwiperSlide key={review.name}>
                  <article className="testimonial-card">
                    <div className="stars">★★★★★</div>
                    <p>{review.text}</p>
                    <div className="reviewer">
                      <img src={review.image} alt={review.name} />
                      <strong>{review.name}</strong>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section> */}

        <section id="about" className="section about-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6" data-aos="fade-right">
                <img className="about-img" src={about_img} alt="Luxury rental car" />
              </div>
              <div className="col-lg-6" data-aos="fade-left">
                <span className="section-kicker">About Company</span>
                <h2 className='about-heading'>Safe, clean, comfortable cars for your important journeys.</h2>
                <p className="section-copy text-justify">we provide well-maintained self-drive cars and dependable airport and railway station transfer services in Bhubaneswar. Whether you need a vehicle for business, family travel, or a convenient pickup and drop service, we ensure a safe, comfortable, and hassle-free experience.Our fleet includes hatchbacks, sedans, SUVs, premium SUVs, family cars, and travellers to suit every travel requirement.</p>
                <div className="about-points">
                  <span><i className="bi bi-check2-circle" /> Flexible hourly and daily packages</span>
                  <span><i className="bi bi-check2-circle" /> Airport & Railway Station Transfers</span>
                  <span><i className="bi bi-check2-circle" /> Well-Maintained Vehicles</span>
                  <span><i className="bi bi-check2-circle" /> Competitive Pricing</span>
                  <span><i className="bi bi-check2-circle" /> Trusted Customer Support</span>


                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container">
            <div className="cta-inner" data-aos="zoom-in">
              <h2>Book Your Ride Today</h2>
              <div className="cta-actions">
                <a className="btn btn-dark btn-lg" href="tel:9777082174"><i className="bi bi-telephone me-2" /> Call Now</a>
                <button className="btn btn-light btn-lg" onClick={() => setCurrentPage('booking')} style={{border: 'none', cursor: 'pointer'}}><i className="bi bi-file-earmark-text me-2" /> Get Free Quote</button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq-map">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6" data-aos="fade-up">
                <span className="section-kicker">FAQ</span>
                <h2>Quick answers before you book</h2>
                <div className="accordion" id="faqList">
                  {[
                    ['Are prices negotiable?', 'Yes. Final pricing depends on car model, route, duration, date, and event requirements.'],
                    ['Do you provide drivers?', 'Yes. Most premium and event bookings include professional chauffeur service.'],
                    ['Can I book airport or railway station transfers?', 'Yes. We provide reliable pickup and drop services to and from the airport and railway station. Advance booking is recommended to ensure vehicle availability.'],
                  ].map(([question, answer], index) => (
                    <div className="accordion-item" key={question}>
                      <h3 className="accordion-header">
                        <button className={`accordion-button ${index ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq${index}`}>
                          {question}
                        </button>
                      </h3>
                      <div id={`faq${index}`} className={`accordion-collapse collapse ${index ? '' : 'show'}`} data-bs-parent="#faqList">
                        <div className="accordion-body">{answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="120">
                <div className="map-card">
                  <iframe title="Service location map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.7173751799605!2d85.7631912!3d20.2705528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a9b8f71ba331%3A0xd2c5c96061a78267!2sSM%20Travels%20-%20Self%20Drive%20Car%20rental!5e0!3m2!1sen!2sin!4v1780464900134!5m2!1sen!2sin" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <a className="footer-brand" href="#home" aria-label="Company Car Rental home">
                <img className="footer-logo" src={footer_logo} alt="Company Car Rental" />
              </a>
              <p>Premium cars for weddings, tours, airport transfers, corporate travel, family trips, and luxury events.</p>
              <div className="socials">
                <a href="#" aria-label="Facebook"><i className="bi bi-facebook" /></a>
                <a href="https://www.instagram.com/smtravels.bbsr?igsh=MXZ1azVrZ2d2OTdiag==" aria-label="Instagram"><i className="bi bi-instagram" /></a>
                <a href="#" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              </div>
            </div>
            <div className="col-6 col-lg-2">
              <h3>Links</h3>
              <a href="#fleet">Cars</a>
              <button onClick={() => setCurrentPage('booking')} style={{display: 'block', background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.78)', cursor: 'pointer', padding: 0, margin: '0 0 9px', textDecoration: 'none'}}>Booking</button>
              <a href="#gallery">Gallery</a>
              <a href="#about">About</a>
            </div>
            <div className="col-6 col-lg-3">
              <h3>Contact</h3>
              <p><i className="bi bi-telephone" />  +91 9777082174, +91 7978488457</p>
              <p><i className="bi bi-envelope" /> bookings@company.in</p>
              <p><i className="bi bi-geo-alt" /> K7, BDA Market complex, <br /> Kalinga Nagar, Ghatikia, Bhubaneswar, Odisha, 751029</p>
            </div>
            <div className="col-lg-3">
              <h3>Newsletter</h3>
              <form className="newsletter">
                <input type="email" className="form-control" placeholder="Email address" required />
                <button className="btn btn-gold" aria-label="Subscribe"><i className="bi bi-send" /></button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">© 2026 SM Travels. All rights reserved.</div>
        </div>
      </footer>

      <a className="phone-float" href="tel:9777082174" aria-label="Call us">
        <i className="bi bi-telephone" />
      </a>
      <a className="whatsapp-float" href="https://wa.me/9777082174" aria-label="Chat on WhatsApp">
        <i className="bi bi-whatsapp" />
      </a>
      {showTop && (
        <button className="top-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <i className="bi bi-arrow-up" />
        </button>
      )}
      {submissionState && (
        <div className="modal-backdrop-custom" onClick={() => setSubmissionState(null)}>
          <div className="success-modal" onClick={(event) => event.stopPropagation()}>
            <i className={`bi ${submissionState === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
            <h2>{submissionState === 'success' ? 'Booking request sent' : 'Booking request received'}</h2>
            <p>{submissionState === 'success'
              ? 'Thanks. Our team will contact you shortly with availability and quote details.'
              : 'Thanks. Our team will contact you shortly with availability and quote details.'}</p>
            <button className="btn btn-gold" onClick={() => setSubmissionState(null)}>Close</button>
          </div>
        </div>
      )}
      {lightbox && (
        <div className="modal-backdrop-custom" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" aria-label="Close gallery"><i className="bi bi-x-lg" /></button>
          <img className="lightbox-image" src={lightbox} alt="Expanded gallery view" />
        </div>
      )}
    </>
  );
}

function BookingPage({ onBack, onSubmit }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(loader);
  }, []);

  return (
    <>
      {loading && (
        <div className="loader" aria-label="Loading">
          <div className="loader-ring" />
        </div>
      )}

      <nav className="navbar navbar-expand-lg fixed-top glass-nav px-lg-5" style={{width:'100vw'}}>
        <div className="container">
          <button className="btn btn-link text-decoration-none" onClick={onBack} aria-label="Back to home" style={{padding: 0, marginRight: '16px'}}>
            <i className="bi bi-arrow-left" style={{fontSize: '1.3rem', color: 'var(--blue)'}} />
          </button>
          <a className="navbar-brand" onClick={onBack} style={{cursor: 'pointer'}} aria-label="Company Car Rental home">
            <img className="brand-logo" src={logo} alt="Company Car Rental" />
          </a>
          <div style={{marginLeft: 'auto'}} />
        </div>
      </nav>

      <div style={{paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #f4f8fb 48%, #fff7e4 100%)'}}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{textAlign: 'center', marginBottom: '40px', marginTop: '20px'}}>
                <h1 style={{fontSize: 'clamp(2rem, 5vw, 3.35rem)', fontWeight: '900', marginBottom: '12px', color: 'var(--ink)'}}>
                  Book Your Perfect Ride
                </h1>
                <p style={{fontSize: '1.05rem', color: 'var(--muted)', marginBottom: '8px'}}>
                  Fill in your details below and get instant quotes from our team
                </p>
              </div>
              <div style={{background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: 'var(--shadow)'}}>
                <BookingForm onSubmit={onSubmit} compact={false} />
              </div>
              <div style={{textAlign: 'center', marginTop: '28px'}}>
                <p style={{color: 'var(--muted)', marginBottom: '12px'}}>Need immediate assistance?</p>
                <a href="tel:9777082174" className="btn btn-gold btn-lg">
                  <i className="bi bi-telephone me-2" /> Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a className="phone-float" href="tel:9777082174" aria-label="Call us">
        <i className="bi bi-telephone" />
      </a>
      <a className="whatsapp-float" href="https://wa.me/9777082174" aria-label="Chat on WhatsApp">
        <i className="bi bi-whatsapp" />
      </a>
    </>
  );
}

function BookingForm({ onSubmit, compact = false }) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [serviceType, setServiceType] = useState('car-rent');
  const [driverPreference, setDriverPreference] = useState('with-driver');

  const availableCars = selectedBrand ? carBrands[selectedBrand] : [];

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedCar('');
  };

  return (
    <form className={`booking-form needs-validation ${compact ? 'hero-form' : ''}`} onSubmit={onSubmit} noValidate>
      <div className="form-title">
        <i className="bi bi-calendar-heart" />
        <div>
          <strong>Book your car</strong>
          <span>Quick response guaranteed</span>
        </div>
      </div>

      <div className="row g-3">
        <FloatingInput id={compact ? 'heroName' : 'name'} name={compact ? 'heroName' : 'name'} label="Full Name" required />
        <FloatingInput id={compact ? 'heroEmail' : 'email'} name={compact ? 'heroEmail' : 'email'} label="Email Address" type="email" required />
        <FloatingInput id={compact ? 'heroPhone' : 'phone'} name={compact ? 'heroPhone' : 'phone'} label="Phone Number" type="tel" required />
        
        <div className="col-md-6">
          <div className="form-floating">
            <select className="form-select" id={compact ? 'heroEvent' : 'event'} name={compact ? 'heroEvent' : 'event'} required defaultValue="">
              <option value="" disabled>Event type</option>
              {['Wedding', 'Picnic', 'Tour', 'Airport', 'Corporate', 'Other'].map((event) => <option key={event}>{event}</option>)}
            </select>
            <label htmlFor={compact ? 'heroEvent' : 'event'}>Event Type</label>
            <div className="invalid-feedback">Please choose an event type.</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating">
            <select className="form-select" id={compact ? 'heroCarBrand' : 'carBrand'} name={compact ? 'heroCarBrand' : 'carBrand'} required value={selectedBrand} onChange={handleBrandChange}>
              <option value="" disabled>Select car brand</option>
              {Object.keys(carBrands).map((brand) => <option key={brand} value={brand}>{brand}</option>)}
            </select>
            <label htmlFor={compact ? 'heroCarBrand' : 'carBrand'}>Car Brand</label>
            <div className="invalid-feedback">Please select a car brand.</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating">
            <select className="form-select" id={compact ? 'heroCar' : 'car'} name={compact ? 'heroCar' : 'car'} required value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} disabled={!selectedBrand}>
              <option value="" disabled>Select car model</option>
              {availableCars.map((carModel) => <option key={carModel} value={carModel}>{carModel}</option>)}
            </select>
            <label htmlFor={compact ? 'heroCar' : 'car'}>Car Model</label>
            <div className="invalid-feedback">Please select a car model.</div>
          </div>
        </div>

        {/* <FloatingInput id={compact ? 'heroPickup' : 'pickup'} label="Pickup Location" required />
        <FloatingInput id={compact ? 'heroDate' : 'date'} label="Pickup Date" type="date" required />
        <FloatingInput id={compact ? 'heroPassengers' : 'passengers'} label="Number of Passengers" type="number" min="1" required /> */}
        <div className="col-12">
          <div className="form-floating">
            <textarea className="form-control" id={compact ? 'heroDescription' : 'description'} name={compact ? 'heroDescription' : 'description'} placeholder="Description / Requirements" required />
            <label htmlFor={compact ? 'heroDescription' : 'description'}>Description / Requirements</label>
            <div className="invalid-feedback">Please add your requirements.</div>
          </div>
        </div>
      </div>

      <div className="row g-3 my-4">
        <div className="col-12">
          <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Service Type</label>
          <div style={{display: 'flex', gap: '16px', padding: '16px', background: '#f8f9fa', borderRadius: '8px'}}>
            <div className="form-check" style={{flex: 1}}>
              <input className="form-check-input" type="radio" name="serviceType" id="carRent" value="car-rent" checked={serviceType === 'car-rent'} onChange={(e) => setServiceType(e.target.value)} />
              <label className="form-check-label" htmlFor="carRent" style={{marginBottom: 0, cursor: 'pointer', fontSize: '0.95rem'}}>
                <strong>🚗 Car Rental</strong>
              </label>
            </div>
            <div className="form-check" style={{flex: 1}}>
              <input className="form-check-input" type="radio" name="serviceType" id="traveller" value="traveller" checked={serviceType === 'traveller'} onChange={(e) => setServiceType(e.target.value)} />
              <label className="form-check-label" htmlFor="traveller" style={{marginBottom: 0, cursor: 'pointer', fontSize: '0.95rem'}}>
                <strong>🚐 Traveller Coach</strong>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12">
          <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Driver Preference</label>
          <div style={{display: 'flex', gap: '16px', padding: '16px', background: '#f8f9fa', borderRadius: '8px'}}>
            <div className="form-check" style={{flex: 1}}>
              <input className="form-check-input" type="radio" name="driverPreference" id="withDriver" value="with-driver" checked={driverPreference === 'with-driver'} onChange={(e) => setDriverPreference(e.target.value)} />
              <label className="form-check-label" htmlFor="withDriver" style={{marginBottom: 0, cursor: 'pointer', fontSize: '0.95rem'}}>
                <strong>👤 With Driver</strong>
              </label>
            </div>
            <div className="form-check" style={{flex: 1}}>
              <input className="form-check-input" type="radio" name="driverPreference" id="withoutDriver" value="without-driver" checked={driverPreference === 'without-driver'} onChange={(e) => setDriverPreference(e.target.value)} />
              <label className="form-check-label" htmlFor="withoutDriver" style={{marginBottom: 0, cursor: 'pointer', fontSize: '0.95rem'}}>
                <strong>🔑 Self Drive</strong>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-gold w-100 mt-3" type="submit">
        <i className="bi bi-send-check me-2" /> Submit Enquiry
      </button>
    </form>
  );
}

function FloatingInput({ id, name, label, type = 'text', ...props }) {
  return (
    <div className="col-md-6">
      <div className="form-floating">
        <input className="form-control" id={id} name={name} placeholder={label} type={type} {...props} />
        <label htmlFor={id}>{label}</label>
        <div className="invalid-feedback">Please enter a valid {label.toLowerCase()}.</div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
