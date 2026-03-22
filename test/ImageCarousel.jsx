import React, { useEffect, useState, useRef, useCallback } from "react";
import "./ApartmentDetail.css";
import { useParams } from "react-router-dom";
import { generateBaseURL } from "../../utils.js";
import { useNavigate } from "react-router-dom";
import placeholder from "../../assests/apartments.jpg";
import cozyStudioImage from "../../assests/Cozy Studio Apartment.jpg";
import luxuryPenthouseImage from "../../assests/Luxury Penthouse Suite.jpg";
import spaciousFamilyImage from "../../assests/Spacious Family Apartment.png";
import charmingCottageImage from "../../assests/Charming Cottage Retreat.jpg";
import beachfrontParadiseImage from "../../assests/Beachfront Paradise.jpg";
import beachsideVillaImage from "../../assests/Beachside Villa.jpg";
import citySkylineStudioImage from "../../assests/City Skyline Studio.jpg";
import cosmopolitanApartmentImage from "../../assests/Cosmopolitan Apartment.jpg";
import countryFarmhouseImage from "../../assests/Country Farmhouse.jpg";
import elegantTownhouseImage from "../../assests/Elegant Townhouse.jpg";
import historicCityCenterImage from "../../assests/Historic City Center Apartment.jpg";
import historicTownhouseImage from "../../assests/Historic Townhouse.jpg";
import lakefrontRetreatImage from "../../assests/Lakefront Retreat.jpg";
import modernCityApartmentImage from "../../assests/Modern City Apartment.jpg";
import mountainViewChaletImage from "../../assests/Mountain View Chalet.jpg";
import riverfrontCottageImage from "../../assests/Riverfront Cottage.jpg";
import rusticMountainCabinImage from "../../assests/Rustic Mountain Cabin.jpg";
import secludedBeachBungalowImage from "../../assests/Secluded Beach Bungalow.jpg";
import skiInSkiOutChaletImage from "../../assests/Ski-In_Ski-Out Chalet.jpg";
import sunnySeasideApartmentImage from "../../assests/Sunny Seaside Apartment.jpg";
import urbanLoftImage from "../../assests/Urban Loft.jpg";
import { useAuth } from "../../contexts/onAuth";
import toast from "react-hot-toast";
import Review from "./Review.jsx";
import StarRating from "../StarRating";
import ReportListingButton from "../ReportListingButton.jsx";
import SimilarApartments from "./SimilarApartments.jsx";

function ApartmentDetail() {
	const [apartment, setApartment] = useState(null);
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [guests, setGuests] = useState(1);
	const [rating, setRating] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const timerRef = useRef(null);
	const [auth] = useAuth();
	const navigate = useNavigate();

	const { id } = useParams();

	// Scroll to top when component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const goNext = useCallback(() => setCurrentIndex((i) => (i + 1) % 3), []);
	const goPrev = useCallback(() => setCurrentIndex((i) => (i + 2) % 3), []);

	// 3초 자동 슬라이드 — hover 시 정지
	useEffect(() => {
		if (isHovered) { clearInterval(timerRef.current); return; }
		timerRef.current = setInterval(goNext, 3000);
		return () => clearInterval(timerRef.current);
	}, [isHovered, goNext]);

	useEffect(() => {
		const fetchApartment = async () => {
			try {
				setIsLoading(true);
				const baseURL = generateBaseURL();
				const response = await fetch(`${baseURL}/api/apartments/detail/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setApartment(data);
			} catch (error) {
				console.error("Error retrieving apartments:", error);
				toast.error("Failed to load apartment details");
			} finally {
				setIsLoading(false);
			}
		};
		fetchApartment();
	}, [id]);

	const handleCheckInChange = (event) => {
		setCheckIn(event.target.value);
	};

	const handleCheckOutChange = (event) => {
		setCheckOut(event.target.value);
	};

	const handleGuestsChange = (event) => {
		setGuests(event.target.value);
	};

	const handleRate = (star) => {
		setRating(star);
	};

	const handleSubmitRating = async () => {
		if (rating === 0) {
			toast.error("Please select a rating");
			return;
		}

		try {
			const baseURL = generateBaseURL();
			const response = await fetch(`${baseURL}/api/rating/rate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${auth.token}`,
				},
				body: JSON.stringify({ 
					apartmentId: apartment._id,
					username: auth.user.username,
					rating,
				}),
			});
			const data = await response.json();

			if (response.ok) {
				toast.success(`You rated ${rating} stars!`);
				setApartment((prev) => ({
					...prev,
					averageRating: data.averageRating,
					numberOfRatings: (prev.numberOfRatings || 0) + 1,
				}));
				setRating(0); // Reset rating after submission
			} else {
				toast.error(`Failed to submit rating: ${data.message}`);
			}
		} catch (error) {
			toast.error("Failed to submit rating");
			console.error("Error submitting rating:", error);
		}
	};

	// Format price for better display
	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(price);
	};

	// Calculate total price for booking
	const calculateTotalPrice = (pricePerNight, checkInDate, checkOutDate) => {
		if (!checkInDate || !checkOutDate) return 0;
		const startDate = new Date(checkInDate);
		const endDate = new Date(checkOutDate);
		const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
		return numberOfNights > 0 ? pricePerNight * numberOfNights : 0;
	};

	// Get today's date in YYYY-MM-DD format
	const getTodayDate = () => {
		return new Date().toISOString().split('T')[0];
	};

	// Function to get the appropriate image based on apartment title
	const getApartmentImage = (title) => {
		switch (title) {
			case "Cozy Studio Apartment":
				return cozyStudioImage;
			case "Luxury Penthouse Suite":
				return luxuryPenthouseImage;
			case "Spacious Family Apartment":
				return spaciousFamilyImage;
			case "Charming Cottage Retreat":
				return charmingCottageImage;
			case "Beachfront Paradise":
				return beachfrontParadiseImage;
			case "Beachside Villa":
				return beachsideVillaImage;
			case "City Skyline Studio":
				return citySkylineStudioImage;
			case "Cosmopolitan Apartment":
				return cosmopolitanApartmentImage;
			case "Country Farmhouse":
				return countryFarmhouseImage;
			case "Elegant Townhouse":
				return elegantTownhouseImage;
			case "Historic City Center Apartment":
				return historicCityCenterImage;
			case "Historic Townhouse":
				return historicTownhouseImage;
			case "Lakefront Retreat":
				return lakefrontRetreatImage;
			case "Modern City Apartment":
				return modernCityApartmentImage;
			case "Mountain View Chalet":
				return mountainViewChaletImage;
			case "Riverfront Cottage":
				return riverfrontCottageImage;
			case "Rustic Mountain Cabin":
				return rusticMountainCabinImage;
			case "Secluded Beach Bungalow":
				return secludedBeachBungalowImage;
			case "Ski-In/Ski-Out Chalet":
				return skiInSkiOutChaletImage;
			case "Sunny Seaside Apartment":
				return sunnySeasideApartmentImage;
			case "Urban Loft":
				return urbanLoftImage;
			default:
				return placeholder;
		}
	};

	if (isLoading) {
		return (
			<div className="apartment-detail-page">
				<div className="loading-state">
					Loading apartment details...
				</div>
			</div>
		);
	}

	if (!apartment) {
		return (
			<div className="apartment-detail-page">
				<div className="loading-state">
					Apartment not found
				</div>
			</div>
		);
	}

	const maxGuests = apartment.maxGuests;
	const totalPrice = calculateTotalPrice(apartment.price, checkIn, checkOut);
	const numberOfNights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;

	const handleReserve = () => {
		const userID = auth?.user?.id;
		const username = auth?.user?.username;

		const bookingData = {
			userId: userID,
			username: username,
			apartmentId: apartment._id,
			title: apartment.title,
			checkIn: checkIn,
			checkOut: checkOut,
			guests: guests,
			totalPrice: totalPrice,
		};

		const isValidDates = checkIn !== "" && checkOut !== "" && 
			new Date(checkIn) < new Date(checkOut) && 
			new Date(checkIn) >= new Date(getTodayDate());

		if (!userID) {
			navigate("/login");
		} else if (!isValidDates) {
			toast.error("Please select valid check-in and check-out dates.");
		} else if (totalPrice <= 0) {
			toast.error("Please select valid dates for your stay.");
		} else {
			navigate("/pay", { state: { bookingData } });
		}
	};

	const handleSaveForLater = () => {
		console.log("Save for Later");
	};

	return (
		<div className="apartment-detail-page">
			<div className="details-container">
				{/* Left Column - Apartment Details */}
				<div className="apartment-detail-container">
					{/* Header */}
					<div className="apartment-header">
						<h1 className="title">{apartment.title}</h1>
					</div>

				{/* Image Carousel */}
				<div
					className="apartment-gallery"
					style={{ position: "relative", overflow: "hidden" }}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onKeyDown={(e) => { if (e.key === "ArrowLeft") goPrev(); if (e.key === "ArrowRight") goNext(); }}
					role="region"
					aria-label="Apartment image carousel"
					tabIndex={0}
				>
					{[
						{ src: getApartmentImage(apartment.title), alt: `${apartment.title} - Apartment in ${apartment.address}` },
						{ src: placeholder, alt: "Apartment placeholder image 1" },
						{ src: placeholder, alt: "Apartment placeholder image 2" },
					].map((img, i) => (
						<img
							key={i}
							src={img.src}
							alt={img.alt}
							data-testid={`carousel-image-${i + 1}`}
							aria-hidden={i !== currentIndex}
							style={{
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								opacity: i === currentIndex ? 1 : 0,
								transition: "opacity 0.5s ease-in-out",
							}}
						/>
					))}

					{/* 이전 버튼 */}
					<button
						onClick={goPrev}
						data-testid="carousel-btn-prev"
						aria-label="Previous image"
						style={{ position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)", zIndex: 10, width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 26, cursor: "pointer" }}
					>&#8249;</button>

					{/* 다음 버튼 */}
					<button
						onClick={goNext}
						data-testid="carousel-btn-next"
						aria-label="Next image"
						style={{ position: "absolute", top: "50%", right: 12, transform: "translateY(-50%)", zIndex: 10, width: 40, height: 40, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 26, cursor: "pointer" }}
					>&#8250;</button>

					{/* 인디케이터 점 */}
					<div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
						{[0, 1, 2].map((i) => (
							<button
								key={i}
								onClick={() => setCurrentIndex(i)}
								aria-label={`Image ${i + 1}`}
								style={{ width: 10, height: 10, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.8)", background: i === currentIndex ? "#fff" : "transparent", cursor: "pointer", padding: 0 }}
							/>
						))}
					</div>

					{/* 카운터 */}
					<span aria-live="polite" style={{ position: "absolute", top: 10, right: 12, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 13, padding: "3px 10px", borderRadius: 20, zIndex: 10, pointerEvents: "none" }}>
						{currentIndex + 1} / 3
					</span>
				</div>

					{/* Details */}
					<div className="apartment-details">
						<div className="detail-item">
							<span className="detail-label">📍 Location</span>
							<span className="detail-value">{apartment.address}</span>
						</div>

						<div className="detail-item">
							<span className="detail-label">💰 Price</span>
							<span className="detail-value price">{formatPrice(apartment.price)} per night</span>
						</div>

						<div className="detail-item">
							<span className="detail-label">👥 Max Guests</span>
							<span className="detail-value">{maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}</span>
						</div>

						<div className="detail-item">
							<span className="detail-label">⭐ Rating</span>
							<div className="detail-value">
								<StarRating 
									rating={apartment.averageRating || 0} 
									numberOfRatings={apartment.numberOfRatings || 0}
									compact={true}
									interactive={false}
								/>
							</div>
						</div>

						{apartment.amenities && apartment.amenities.length > 0 && (
							<div className="detail-item amenities-item">
								<span className="detail-label">🏠 Amenities</span>
								<div className="detail-value">
									<ul className="amenities-list">
										{apartment.amenities.map((amenity, index) => (
											<li className="amenity-item" key={index}>
												{amenity}
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
					</div>

					{/* Description */}
					<div className="apartment-description">
						<h3 className="description-heading">About this place</h3>
						<p className="description-text">{apartment.description}</p>
					</div>
				</div>

				{/* Right Column - Booking Card */}
				<div className="booking-card">
					<h3 className="booking-heading">Reserve Your Stay</h3>
					
					<div className="booking-inputs">
						<div className="input-group">
							<label htmlFor="check-in">Check-in Date</label>
							<input
								type="date"
								id="check-in"
								value={checkIn}
								onChange={handleCheckInChange}
								min={getTodayDate()}
							/>
						</div>

						<div className="input-group">
							<label htmlFor="check-out">Check-out Date</label>
							<input
								type="date"
								id="check-out"
								value={checkOut}
								onChange={handleCheckOutChange}
								min={checkIn || getTodayDate()}
							/>
						</div>

						<div className="input-group">
							<label htmlFor="guests">Number of Guests</label>
							<input
								type="number"
								id="guests"
								min={1}
								max={maxGuests}
								value={guests}
								onChange={handleGuestsChange}
							/>
						</div>
					</div>

					{/* Price Breakdown */}
					{numberOfNights > 0 && (
						<div style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
								<span>{formatPrice(apartment.price)} × {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}</span>
								<span>{formatPrice(totalPrice)}</span>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-lg)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-light)' }}>
								<span>Total</span>
								<span>{formatPrice(totalPrice)}</span>
							</div>
						</div>
					)}

					<div className="booking-button-wrapper">
						<button className="booking-button" onClick={handleReserve}>
							{auth?.user ? 'Reserve Now' : 'Login to Reserve'}
						</button>
						<button
							className="save-later-button"
							onClick={handleSaveForLater}
						>
							Save for Later
						</button>
					</div>

					<p className="booking-note">You won't be charged yet</p>
					
					{/* Report listing */}
					{auth?.token && (
						<div className="report-listing-container">
							<div className="report-link">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flag-icon">
									<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
									<line x1="4" y1="22" x2="4" y2="15"></line>
								</svg>
								<ReportListingButton apartmentId={apartment._id} token={auth.token} />
							</div>
						</div>
					)}
				</div>
			</div>
			
			{/* Section Divider */}
			<div className="section-divider"></div>
			
			{/* Rating Section - Full Width Below */}
			<div className="rating-section-container">
				<div className="rating-card">
					<h3 className="rating-card-heading">Rate this Apartment</h3>
					
					{/* Current Rating Display */}
					{apartment.numberOfRatings > 0 && (
						<div className="rating-info">
							<h4>Current Rating</h4>
							<div className="rating-summary">
								<span className="average-rating">
									{apartment.averageRating ? apartment.averageRating.toFixed(1) : "0.0"}
								</span>
								<div className="rating-breakdown">
									<StarRating 
										rating={apartment.averageRating || 0} 
										numberOfRatings={0}
										compact={false}
										interactive={false}
									/>
									<div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
										Based on {apartment.numberOfRatings} review{apartment.numberOfRatings !== 1 ? 's' : ''}
									</div>
								</div>
							</div>
						</div>
					)}
					
					{/* Rating Input */}
					<div className="rating-input-section">
						<h4 className="rating-input-title">
							{auth?.user ? 'Your Rating' : 'Rate this place'}
						</h4>
						<StarRating 
							rating={rating} 
							onRate={handleRate} 
							compact={false}
							interactive={!!auth?.user}
						/>
						
						<button 
							className="submit-rating-button" 
							onClick={handleSubmitRating}
							disabled={!auth?.user || rating === 0}
						>
							{!auth?.user ? 'Login to Rate' : 'Submit Rating'}
						</button>
						
						{!auth?.user && (
							<div className="auth-message">
								<h4>Want to rate this place?</h4>
								<p>Please log in to share your rating and help other travelers</p>
							</div>
						)}
					</div>
				</div>
			</div>
			
			{/* Reviews Section - Full Width Below Rating */}
			<div className="reviews-section-container">
				<div className="reviews-card">
					<Review />
				</div>
			</div>
			
			{/* Similar Apartments Section - Full Width Below Reviews */}
			<SimilarApartments apartmentId={apartment._id} />
		</div>
	);
}

export default ApartmentDetail;