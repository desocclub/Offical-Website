import "./global.css";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, StyleSheet, ScrollView, Image, ImageBackground, Dimensions } from "react-native";
import HomeBg from "./assets/Homebg.svg";
import { useState, useRef, useEffect } from "react";
import { useFonts, RobotoCondensed_900Black } from "@expo-google-fonts/roboto-condensed";

// Import committee member images
const AdityaImage = require("./assets/Heads/Aditya.png");
const AyushiImage = require("./assets/Heads/Ayushi.png");
const VedantImage = require("./assets/Heads/Vedant.png");
const IshaniImage = require("./assets/Heads/Ishani.png");
const PranitaImage = require("./assets/Heads/pranita.png");
const SanskrutiImage = require("./assets/Heads/Sanskruti.png");

const { width: screenWidth } = Dimensions.get("window");

const eventsData = [
  {
    id: 1,
    title: "UCL - Ultimate Coding League",
    date: "March 15, 2024",
    image: "https://via.placeholder.com/300x200",
    description: "Lorem ipsum dolor sit amet consectetur. Aliquam rutrum sit iaculis lacus. Id odio vel suspendisse a. Ultrices nulla auctor cras nisl tristique eros massa phasellus. Nisl habitant vel non in sodales nulla tempus lectus.",
    isLive: true,
    type: "technical",
  },
  {
    id: 2,
    title: "CYBERSABHA 2025",
    date: "March 20, 2024",
    image: "https://via.placeholder.com/300x200",
    description: "Lorem ipsum dolor sit amet consectetur. Aliquam rutrum sit iaculis lacus. Id odio vel suspendisse a. Ultrices nulla auctor cras nisl tristique eros massa phasellus. Nisl habitant vel non in sodales nulla tempus lectus.",
    isLive: false,
    type: "technical",
  },
  {
    id: 3,
    title: "Design Hackathon",
    date: "March 25, 2024",
    image: "https://via.placeholder.com/300x200",
    description: "Lorem ipsum dolor sit amet consectetur. Aliquam rutrum sit iaculis lacus. Id odio vel suspendisse a. Ultrices nulla auctor cras nisl tristique eros massa phasellus. Nisl habitant vel non in sodales nulla tempus lectus.",
    isLive: false,
    type: "non-technical",
  },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoCondensed_900Black,
  });
  
  const [activeFilter, setActiveFilter] = useState("all");
  const carouselRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = 320 * 5; // 6 members, scroll 5 times to see all

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev >= maxScroll ? 0 : prev + 320;
        carouselRef.current?.scrollTo({ x: newPosition, animated: true });
        return newPosition;
      });
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - 320);
    carouselRef.current?.scrollTo({ x: newPosition, animated: true });
    setScrollPosition(newPosition);
  };

  const scrollRight = () => {
    const newPosition = scrollPosition + 320;
    carouselRef.current?.scrollTo({ x: newPosition, animated: true });
    setScrollPosition(newPosition);
  };

  const filteredEvents = eventsData.filter((event) => {
    if (activeFilter === "all") return true;
    return event.type === activeFilter;
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-black">
      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <Text style={styles.navLogo}>DESOC</Text>
        <View style={styles.navButtons}>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>HOME</Text>
          </Pressable>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>EVENTS</Text>
          </Pressable>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>ALUMNI</Text>
          </Pressable>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>COMMITTEE</Text>
          </Pressable>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>GALLERY</Text>
          </Pressable>
          <Pressable style={[styles.navButton, styles.navButtonContact]}>
            <Text style={styles.navButtonTextContact}>CONTACT US</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* SVG Background */}
          <View style={styles.backgroundContainer}>
            <HomeBg width="100%" preserveAspectRatio="xMinYMin slice" />
          </View>

          {/* Content Overlay */}
          <View style={styles.contentOverlay}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>DESOC</Text>
              <Text style={styles.quote}>
                "Inspiring a future where technology and design harmoniously advance society through innovation and creativity."
              </Text>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>About Us  →</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Events Section */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsTitle}>EVENTS</Text>
          
          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            <Pressable
              style={[styles.filterTab, activeFilter === "all" && styles.filterTabActive]}
              onPress={() => setActiveFilter("all")}
            >
              <Text style={[styles.filterText, activeFilter === "all" && styles.filterTextActive]}>ALL EVENTS</Text>
            </Pressable>
            <Pressable
              style={[styles.filterTab, activeFilter === "technical" && styles.filterTabActive]}
              onPress={() => setActiveFilter("technical")}
            >
              <Text style={[styles.filterText, activeFilter === "technical" && styles.filterTextActive]}>TECHNICAL</Text>
            </Pressable>
            <Pressable
              style={[styles.filterTab, activeFilter === "non-technical" && styles.filterTabActive]}
              onPress={() => setActiveFilter("non-technical")}
            >
              <Text style={[styles.filterText, activeFilter === "non-technical" && styles.filterTextActive]}>NON-TECHNICAL</Text>
            </Pressable>
          </View>

          {/* Event Cards */}
          <View style={styles.eventsContainer}>
            {filteredEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventImagePlaceholder} />
                <View style={styles.eventContent}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    {event.isLive && (
                      <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>LIVE</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Alumni Connect Section */}
        <View style={styles.alumniSection}>
          {/* Header Bar */}
          <View style={styles.alumniHeader}>
            <Text style={styles.alumniHeaderText}>ALUMNI CONNECT</Text>
          </View>

          {/* Content Area */}
          <View style={styles.alumniContent}>
            {/* Background Image */}
            <Image
              source={require("./assets/Alumnibg.png")}
              style={styles.alumniBgImage}
              resizeMode="cover"
            />
            <View style={styles.alumniGrid}>
              {/* Left Column */}
              <View style={styles.alumniLeftColumn}>
                {/* Industries Card */}
                <View style={styles.alumniGlassCard}>
                  <Text style={styles.industriesTitle}>Industries</Text>
                  <View style={styles.industriesPlaceholder} />
                </View>

                {/* Description Card */}
                <View style={styles.alumniGlassCardSmall}>
                  <Text style={styles.alumniDescription}>
                    Lorem ipsum dolor sit amet consectetur. Tincidunt vestibulum amet dui et. Tortor risus placerat mauris sit vulputate dictum congue. Dui non quisque erat vitae tincidunt. Turpis vulputate posuere quis in purus tempor aliquet. Turpis vulputate posuere quis in purus tempor aliquet Turpis vulputate posuere quis in purus tempor aliquet Turpis vulputate posuere quis in purus tempor aliquet
                  </Text>
                </View>
              </View>

              {/* Center Column */}
              <View style={styles.alumniCenterColumn}>
                {/* Stats Card */}
                <View style={styles.alumniStatsCard}>
                  <Text style={styles.statsNumber}>2.8K</Text>
                  <Text style={styles.statsLabel}>Alumni Registered</Text>
                </View>
              </View>

              {/* Right Column */}
              <View style={styles.alumniRightColumn}>
                {/* Description Box */}
                <View style={styles.alumniRightBox}>
                  <Text style={styles.alumniRightDescription}>
                    Lorem ipsum dolor sit amet consectetur. Tincidunt vestibulum amet dui et. Tortor risus placerat mauris sit vulputate dictum congue. Dui non quisque erat vitae tincidunt. Turpis vulputate posuere quis in purus tempor aliquet.
                  </Text>

                  {/* Register Button */}
                  <Pressable style={styles.alumniButton}>
                    <Text style={styles.alumniButtonText}>Register as an Alumni</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Committee 2025-26 Section */}
        <View style={styles.committeeSection}>
          {/* Header Bar */}
          <View style={styles.committeeHeader}>
            <Text style={styles.committeeHeaderText}>COMMITTEE 2025-26</Text>
          </View>

          {/* Committee Members Carousel */}
          <View style={styles.committeeContent}>
            {/* Left Arrow */}
            <Pressable style={styles.carouselArrowLeft} onPress={scrollLeft}>
              <Text style={styles.arrowText}>‹</Text>
            </Pressable>

            <ScrollView 
              ref={carouselRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.committeeCarousel}
              style={styles.carouselScrollView}
            >
                {/* Committee Members */}
              <View style={styles.committeeMember}>
                <View style={styles.memberImageContainer}>
                  <Image 
                    source={AdityaImage}
                    style={styles.memberImage}
                  />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>ADITYA{'\n'}AHIRRAO</Text>
                  <Text style={styles.memberPosition}>PRESIDENT</Text>
                </View>
              </View>

              <View style={styles.committeeMember}>
                <View style={styles.memberImageContainer}>
                  <Image 
                    source={AyushiImage}
                    style={styles.memberImage}
                  />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>AYUSHI{'\n'}DEORE</Text>
                  <Text style={styles.memberPosition}>VICE-PRESIDENT</Text>
                </View>
              </View>

              <View style={styles.committeeMember}>
                <View style={styles.memberImageContainer}>
                  <Image 
                    source={VedantImage}
                    style={styles.memberImage}
                  />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>VEDANT{'\n'}SONAWANE</Text>
                  <Text style={styles.memberPosition}>HEAD OF OPERATIONS</Text>
                </View>
              </View>

              <View style={styles.committeeMember}>
                <View style={styles.memberImageContainer}>
                  <Image 
                    source={IshaniImage}
                    style={styles.memberImage}
                  />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>ISHANI{' '}[ADD LAST NAME]</Text>
                  <Text style={styles.memberPosition}>[ADD POSITION]</Text>
                </View>
              </View>

              <View style={styles.committeeMember}>
                <View style={styles.memberImageContainer}>
                  <Image 
                    source={PranitaImage}
                    style={styles.memberImage}
                  />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>PRANITA{' '}[ADD LAST NAME]</Text>
                  <Text style={styles.memberPosition}>[ADD POSITION]</Text>
                </View>
              </View>

              <View style={styles.committeeMember}>
                <View style={styles.memberImageContainer}>
                  <Image 
                    source={SanskrutiImage}
                    style={styles.memberImage}
                  />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>SANSKRUTI{' '}[ADD LAST NAME]</Text>
                  <Text style={styles.memberPosition}>[ADD POSITION]</Text>
                </View>
              </View>
            </ScrollView>

            {/* Right Arrow */}
            <Pressable style={styles.carouselArrowRight} onPress={scrollRight}>
              <Text style={styles.arrowText}>›</Text>
            </Pressable>

            {/* View All Button */}
            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All →</Text>
            </Pressable>
          </View>
        </View>

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={styles.galleryTitle}>GALLERY</Text>
          
          {/* Filter Tabs */}
          <View style={styles.galleryFilterBar}>
            <Pressable style={styles.galleryFilterTab}>
              <Text style={styles.galleryFilterText}>CYBER SABHA</Text>
            </Pressable>
            <Pressable style={styles.galleryFilterTab}>
              <Text style={styles.galleryFilterText}>INSTALLATION</Text>
            </Pressable>
            <Pressable style={[styles.galleryFilterTab, styles.galleryFilterTabActive]}>
              <Text style={styles.galleryFilterTextActive}>UCL</Text>
            </Pressable>
            <Pressable style={styles.galleryFilterTab}>
              <Text style={styles.galleryFilterText}>GENESIS</Text>
            </Pressable>
            <Pressable style={styles.galleryFilterTab}>
              <Text style={styles.galleryFilterText}>GAME PITCH</Text>
            </Pressable>
            <Pressable style={styles.galleryFilterTab}>
              <Text style={styles.galleryFilterText}>SHARK VERSE</Text>
            </Pressable>
          </View>

          {/* Gallery Grid */}
          <View style={styles.galleryGrid}>
            {/* Row 1 */}
            <View style={styles.galleryRow}>
              <View style={styles.galleryBox} />
              <View style={styles.galleryBox} />
              <View style={styles.galleryBox} />
            </View>
            {/* Row 2 */}
            <View style={styles.galleryRow}>
              <View style={styles.galleryBox} />
              <View style={styles.galleryBox} />
              <View style={styles.galleryBox} />
            </View>
            {/* Row 3 */}
            <View style={styles.galleryRow}>
              <View style={styles.galleryBox} />
              <View style={styles.galleryBox} />
              <View style={styles.galleryBox} />
            </View>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <View style={styles.footerTopBar} />
          <View style={styles.footerRedLine} />
          <View style={styles.footerContent}>
            {/* Footer content placeholder */}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3e3e3e",
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cc0000",
    zIndex: 100,
  },
  navLogo: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 3,
  },
  navButtons: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  navButtonContact: {
    backgroundColor: "#cc0000",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  navButtonTextContact: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    minHeight: 800,
    position: "relative",
    overflow: "hidden",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  contentOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 650,
    zIndex: 1,
  },
  contentContainer: {
    maxWidth: 700,
  },
  title: {
    fontSize: 120,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 32,
    letterSpacing: 6,
    textShadowColor: "rgba(255, 255, 255, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  quote: {
    fontSize: 28,
    color: "#ffffff",
    lineHeight: 44,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#8B0000",
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
  },
  // Events Section Styles
  eventsSection: {
    backgroundColor: "#000",
    paddingVertical: 60,
    paddingHorizontal: 80,
  },
  eventsTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 4,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 16,
  },
  filterTab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#444",
  },
  filterTabActive: {
    backgroundColor: "#333",
    borderColor: "#666",
  },
  filterText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#ffffff",
  },
  eventsContainer: {
    gap: 24,
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "rgba(80, 0, 0, 0.4)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5a0000",
    overflow: "hidden",
    padding: 20,
    gap: 20,
  },
  eventImagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#d9d9d9",
    borderRadius: 4,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B0000",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff4444",
  },
  liveText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  eventDescription: {
    fontSize: 14,
    color: "#cccccc",
    lineHeight: 22,
  },
  // Alumni Connect Section Styles
  alumniSection: {
    backgroundColor: "#000",
  },
  alumniHeader: {
    backgroundColor: "#ebebeb",
    height: 60,
    paddingVertical: 10,
    alignItems: "center",
  },
  alumniHeaderText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: 3,
    fontFamily: "RobotoCondensed_900Black",
  },
  alumniContent: {
    paddingVertical: 60,
    paddingHorizontal: 80,
    minHeight: 500,
    position: "relative",
    backgroundColor: "#0a0000",
  },
  alumniBgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    alignSelf: "center",
    width: "100%",
    height: "100%"
    
  },
  alumniGrid: {
    flexDirection: "row",
    gap: 20,
    maxWidth: 1000,
    alignSelf: "center",
    width: "100%",
    zIndex: 1,
    position: "relative",
  },
  alumniLeftColumn: {
    flex: 1.6,
    gap: 20,
  },
  alumniGlassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: 24,
    height: 200,
    width: 730,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  industriesTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  industriesPlaceholder: {
    flex: 1,
    minHeight: 60,
  },
  alumniGlassCardSmall: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  alumniDescription: {
    fontSize: 14,
    color: "#ffffff",
    lineHeight: 22,
    textAlign: "justify",
  },
  alumniCenterColumn: {
    justifyContent: "flex-end",
  },
  alumniStatsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
    height: 180,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  statsNumber: {
    fontSize: 72,
    fontWeight: "900",
    color: "#ffffff",
  },
  statsLabel: {
    fontSize: 18,
    color: "#ffffff",
    marginTop: 8,
  },
  alumniRightColumn: {
    flex: 0.8,
    justifyContent: "flex-start",
  },
  alumniRightBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: 24,
    height: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  alumniRightDescription: {
    fontSize: 14,
    color: "#ffffff",
    lineHeight: 22,
    textAlign: "justify",
  },
  alumniButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
    marginTop: 20,
  },
  alumniButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Committee Section Styles
  committeeSection: {
    backgroundColor: "#000",
    paddingBottom: 60,
  },
  committeeHeader: {
    backgroundColor: "#ebebeb",
    paddingVertical: 10,
    height: 70,
    alignItems: "center",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#000000",
  },
  committeeHeaderText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#000000",
    letterSpacing: 3,
    fontFamily: "RobotoCondensed_900Black",
  },
  committeeContent: {
    paddingTop: 60,
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  carouselScrollView: {
    flex: 1,
  },
  committeeCarousel: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "flex-start",
    gap: 30,
  },
  carouselArrowLeft: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  carouselArrowRight: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  carouselArrow: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  arrowText: {
    fontSize: 60,
    color: "#ffffff",
    fontWeight: "300",
  },
  committeeMember: {
    width: 280,
    alignItems: "center",
  },
  memberLogo: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 10,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  memberImageContainer: {
    width: "100%",
    height: 549,
    position: "relative",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    overflow: "hidden",
  },
  memberImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  socialIcons: {
    position: "absolute",
    bottom: 15,
    left: "50%",
    transform: [{ translateX: -30 }],
    flexDirection: "row",
    gap: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#E1306C",
  },
  memberInfo: {
    alignItems: "flex-start",
    marginTop: -70,
  },
  memberName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "left",
    letterSpacing: 1,
    lineHeight: 28,
  },
  memberPosition: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff0000",
    marginTop: 8,
    letterSpacing: 1,
  },
  viewAllButton: {
    position: "absolute",
    bottom: -40,
    right: 60,
    backgroundColor: "#cc0000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  viewAllText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  // Gallery Section Styles
  gallerySection: {
    backgroundColor: "#000",
    paddingVertical: 60,
    paddingHorizontal: 10,
  },
  galleryTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 2,
  },
  galleryFilterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 40,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#cc0000",
    width: "80%",
    maxWidth: 1500,
  },
  galleryFilterTab: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
  },
  galleryFilterTabActive: {
    backgroundColor: "#cc0000",
  },
  galleryFilterText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
  galleryFilterTextActive: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
  galleryGrid: {
    gap: 20,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  galleryRow: {
    flexDirection: "row",
    gap: 20,
  },
  galleryBox: {
    flex: 1,
    aspectRatio: 16 / 9,
    backgroundColor: "#d3d3d3",
    borderRadius: 4,
  },
  // Footer Section Styles
  footerSection: {
    backgroundColor: "#2a2a2a",
    paddingBottom: 40,
  },
  footerTopBar: {
    backgroundColor: "#000000",
    height: 20,
  },
  footerRedLine: {
    backgroundColor: "#cc0000",
    height: 4,
  },
  footerContent: {
    backgroundColor: "#2a2a2a",
    marginHorizontal: 30,
    marginTop: 0,
    minHeight: 500,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
