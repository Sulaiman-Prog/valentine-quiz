import { useState, useEffect } from 'react'
import JSConfetti from 'js-confetti'
import './App.css'

function App() {
  const questions = [
    {
      id: 1,
      question: "What activity did we do on our very first date?",
      clue: "It involved canvas, colors, and drinks.",
      answer: "Sip and Paint"
    },
    {
      id: 2,
      question: "If I was stuck on an island, what's the ONE meal I'd eat forever?",
      clue: "Naija no dey carry last!",
      answer: "Jollof Rice"
    },
    {
      id: 3,
      question: "What was the first movie we watched together in the cinema?",
      clue: "Witches, Emerald City, and 'Defying Gravity'.",
      answer: "Wicked for Good"
    },
    {
      id: 4,
      question: "What is 'our' song?",
      clue: "By PartyNextDoor.",
      answer: "Resentment"
    },
    {
      id: 5,
      question: "On what day did we have our first kiss?",
      clue: "Format: Month Day Year (e.g., January 1st 2020)",
      answer: "May 24th 2025"
    },
    {
      id: 6,
      question: "What is your absolute favorite snack?",
      clue: "Sweet and Salty Kettle Corn.",
      answer: "Boom Chicka Pop"
    },
    {
      id: 7,
      question: "What was the very first meal you ever cooked for me?",
      clue: "You made it with love (and tomatoes).",
      answer: "Jollof Rice"
    },
    {
      id: 8,
      question: "Name the restaurant where we had our first proper dinner date.",
      clue: "Starts with 'E'.",
      answer: "Earls"
    },
    {
      id: 9,
      question: "What is the color of the shirt I wore on our first date?", 
      clue: "No CLUE! Look back at pictures if you must.",
      answer: "Black" 
    },
    {
      id: 10,
      question: "What is the nickname I call you the most?",
      clue: "It's what I always say when I see you.",
      answer: "Jolizzy" 
    },
  ];

  const [inputs, setInputs] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Slideshow images
  const memories = [
    "/memories/pic1.jpg",
    "/memories/pic2.jpg",
    "/memories/pic3.jpg",
    "/memories/pic4.jpg",
    "/memories/pic5.jpg",
    "/memories/pic6.jpg",
    "/memories/pic7.jpg",
    "/memories/pic8.jpg",
    "/memories/pic9.jpg",
    // Add more...
  ];

  // Check if everything is correct
  const allCorrect = questions.every((q) => {
    const userAnswer = inputs[q.id] || "";
    return userAnswer.toLowerCase().trim() === q.answer.toLowerCase();
  });

  // 1. Confetti Effect when UNLOCKED
  useEffect(() => {
    if (allCorrect) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ['❤️', '🌹', '✨', '🔓'],
        emojiSize: 50,
        confettiNumber: 100,
      });
    }
  }, [allCorrect]);

  // Slideshow Timer
  useEffect(() => {
    if (!allCorrect) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [allCorrect, memories.length]);

  const handleChange = (id, value) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleYesClick = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
    alert("YAY! I love you! ❤️");
  };

  const moveButton = (e) => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    e.target.style.position = 'absolute';
    e.target.style.left = `${x}px`;
    e.target.style.top = `${y}px`;
  };

  return (
    <div className="app-container">
      <header>
        <h1>🌹 Hello, Anjola</h1>
        <p>Can you get all couple quizzes?</p>
      </header>

      <div className="quiz-grid">
        {questions.map((q) => {
          const userAnswer = inputs[q.id] || "";
          const isCorrect = userAnswer.toLowerCase().trim() === q.answer.toLowerCase();

          return (
            <div key={q.id} className={`card ${isCorrect ? 'correct' : ''}`}>
              <div className="icon">{isCorrect ? '❤️' : '🔒'}</div>
              <h3>Lock #{q.id}</h3>
              <p className="question">{q.question}</p>
              <p className="clue">Hint: {q.clue}</p>
              <input 
                type="text" 
                placeholder="Type answer..."
                value={userAnswer}
                onChange={(e) => handleChange(q.id, e.target.value)}
                disabled={isCorrect} 
              />
            </div>
          )
        })}
      </div>

      {allCorrect && (
        <div className="secret-section">
          <h2>🎉 Access Granted! 🎉</h2>
          
          {/* NEW: Romantic Message Section */}
          <div className="love-letter">
            <p>
              Anjola mi ❤️, if you are reading this, it means you remember every little detail about us.
              From our first date to our favorite snacks, you are the person who knows me best.
              Looking at these pictures, I realize how lucky I am to have you...
            </p>
          </div>

          <div className="slideshow-container">
            <div className="polaroid-frame">
              <img 
                src={memories[currentImageIndex]} 
                alt="Our Memory" 
                className="slide-image" 
              />
              <p className="caption">SEYI & ANJOLA #{currentImageIndex + 1}  </p>
            </div>
          </div>

          <div className="final-proposal">
            <h1>Will you be my Valentine?</h1>
            <div className="buttons">
              <button className="yes-btn" onClick={handleYesClick}>YES!</button>
              <button className="no-btn" onMouseEnter={moveButton} onClick={moveButton}>NO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App