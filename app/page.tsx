"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Play, Volume2, VolumeX, Music, Award, Users, ArrowRight, Star, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HansZimmerWebsite() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const heroY = useSpring(useTransform(scrollY, [0, 1000], [0, -200]), springConfig)
  const heroOpacity = useSpring(useTransform(scrollY, [0, 500], [1, 0]), springConfig)
  const heroScale = useSpring(useTransform(scrollY, [0, 1000], [1, 1.2]), springConfig)

  const soundtracks = [
    {
      title: "Interstellar",
      year: "2014",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      color: "#4A90E2",
      description: "A journey through space and time",
      duration: "4:35",
      awards: ["Grammy", "Oscar Nominated"],
    },
    {
      title: "Inception",
      year: "2010",
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      color: "#E94B3C",
      description: "Dreams within dreams",
      duration: "3:28",
      awards: ["BAFTA", "Grammy"],
    },
    {
      title: "Dune",
      year: "2021",
      image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      color: "#F5A623",
      description: "Epic desert symphony",
      duration: "5:12",
      awards: ["Oscar Winner", "Grammy"],
    },
    {
      title: "The Dark Knight",
      year: "2008",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      color: "#7B68EE",
      description: "Heroic darkness",
      duration: "4:47",
      awards: ["Grammy", "Saturn Award"],
    },
    {
      title: "Gladiator",
      year: "2000",
      image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      color: "#50C878",
      description: "Ancient Rome's glory",
      duration: "6:18",
      awards: ["Oscar Winner", "Golden Globe"],
    },
    {
      title: "Lion King",
      year: "1994",
      image: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
      color: "#FF6B35",
      description: "Circle of life",
      duration: "3:59",
      awards: ["Oscar Winner", "Grammy"],
    },
  ]

  const achievements = [
    { icon: Award, number: "2", label: "Academy Awards", color: "#FFD700" },
    { icon: Music, number: "150+", label: "Film Scores", color: "#4A90E2" },
    { icon: Star, number: "4", label: "Grammy Awards", color: "#E94B3C" },
    { icon: Users, number: "40+", label: "Years Experience", color: "#50C878" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full mx-auto mb-8"
          />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-gold mb-4"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            HANS ZIMMER
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400"
          >
            Loading the symphony...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-gold/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-black/20 backdrop-blur-xl border border-gold/20 rounded-full px-8 py-4"
      >
        <div className="flex items-center space-x-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold text-gold cursor-pointer"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            HZ
          </motion.div>
          <div className="hidden md:flex space-x-6">
            {["Home", "Works", "About", "Contact"].map((item, index) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1, color: "#D4AF37" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`transition-colors duration-300 ${
                  activeSection === item.toLowerCase() ? "text-gold" : "text-white/70"
                }`}
              >
                {item}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className="text-white/70 hover:text-gold transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section with Advanced Animations */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${["#4A90E2", "#E94B3C", "#F5A623", "#7B68EE", "#50C878"][i]} 0%, transparent 70%)`,
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
              }}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
            />
          ))}

          {/* Sound Wave Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 bg-gold/20"
                style={{
                  left: `${(i / 50) * 100}%`,
                  height: "2px",
                }}
                animate={{
                  height: [2, Math.random() * 200 + 50, 2],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-6 max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <motion.h1
              className="text-8xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
              style={{ fontFamily: "Cinzel, serif" }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              HANS
            </motion.h1>
            <motion.h1
              className="text-8xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent"
              style={{ fontFamily: "Cinzel, serif" }}
              animate={{
                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            >
              ZIMMER
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="space-y-6"
          >
            <p className="text-2xl md:text-3xl text-gray-300 font-light">Maestro of Cinematic Emotions</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting the soundtracks that define our most cherished cinematic moments
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("works")}
                className="bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-600 hover:to-gold text-black font-semibold px-8 py-4 rounded-full text-lg"
              >
                Explore Masterpieces
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-black px-8 py-4 rounded-full text-lg"
              >
                <Play className="mr-2" size={20} />
                Listen Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-gold rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-6 text-gold" style={{ fontFamily: "Cinzel, serif" }}>
              Iconic Soundtracks
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Journey through the musical landscapes that have defined modern cinema
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soundtracks.map((soundtrack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -20,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group relative"
              >
                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-0 overflow-hidden backdrop-blur-sm">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img
                      src={soundtrack.image}
                      alt={soundtrack.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end"
                    >
                      <div className="p-6 w-full">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Button size="sm" className="bg-gold hover:bg-gold/80 text-black mb-4">
                            <Play size={16} className="mr-2" />
                            Play
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Color accent */}
                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: soundtrack.color }} />
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{soundtrack.title}</h3>
                      <Badge variant="outline" className="text-gold border-gold">
                        {soundtrack.year}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{soundtrack.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <Headphones size={16} className="mr-1" />
                        {soundtrack.duration}
                      </span>
                      <div className="flex gap-1">
                        {soundtrack.awards.map((award, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {award}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-8 text-gold" style={{ fontFamily: "Cinzel, serif" }}>
                The Visionary
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Hans Zimmer has revolutionized film music, creating emotional landscapes that transcend the boundaries
                  between sound and story. His innovative approach combines traditional orchestration with cutting-edge
                  technology.
                </p>
                <p>
                  From the haunting melodies of "Interstellar" to the thunderous themes of "The Dark Knight," Zimmer's
                  compositions have become the heartbeat of modern cinema.
                </p>
                <motion.blockquote
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-l-4 border-gold pl-6 italic text-xl text-gold"
                >
                  "I want to go and write music that people can feel... that's the only currency I deal in."
                </motion.blockquote>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="inline-block mb-4"
                  >
                    <achievement.icon size={40} style={{ color: achievement.color }} />
                  </motion.div>
                  <div className="text-3xl font-bold text-white mb-2">{achievement.number}</div>
                  <div className="text-gray-400">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-5xl font-bold mb-8 text-gold" style={{ fontFamily: "Cinzel, serif" }}>
              Join the Symphony
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Stay connected with the latest compositions, concerts, and behind-the-scenes moments from Hans Zimmer's
              world.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/50 border-gold/30 text-white placeholder-gray-400 flex-1 rounded-full px-6 py-3"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-600 hover:to-gold text-black font-semibold px-8 py-3 rounded-full">
                  Subscribe
                </Button>
              </motion.div>
            </motion.div>

            <div className="flex justify-center space-x-8">
              {["Spotify", "YouTube", "Instagram", "Twitter"].map((platform, index) => (
                <motion.button
                  key={platform}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, color: "#D4AF37" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gold transition-colors text-lg font-medium"
                >
                  {platform}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gold/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-6 md:mb-0 text-center md:text-left"
            >
              <div className="text-3xl font-bold text-gold mb-2" style={{ fontFamily: "Cinzel, serif" }}>
                Hans Zimmer
              </div>
              <p className="text-gray-400">Composing the soundtrack of our lives</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center text-gray-500">
              <p>&copy; 2024 Hans Zimmer. All rights reserved.</p>
              <p className="text-sm mt-1">This is a tribute website celebrating the maestro's work.</p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
