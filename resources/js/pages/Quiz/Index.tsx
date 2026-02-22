import { useState, useMemo } from 'react';
import { Button, Card, Text, Radio, RadioGroup } from '@fluentui/react-components';
import Layout from '../../layouts/Layout';

interface Word {
    id: number;
    word_oromo: string;
    word_english: string;
    image_path: string;
    category: { id: number; name: string };
}

interface QuizAttempt {
    id: number;
    score: number;
    total_questions: number;
    category: { name: string } | null;
    created_at: string;
}

export default function Index({ attempts }: { attempts: QuizAttempt[] }) {
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState<Word[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const startQuiz = async () => {
        try {
            const response = await fetch('/quiz/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin'
            });
            
            if (!response.ok) {
                throw new Error('Failed to start quiz');
            }
            
            const data = await response.json();
            setQuestions(data);
            setQuizStarted(true);
            setCurrentQuestion(0);
            setScore(0);
            setQuizFinished(false);
        } catch (error) {
            console.error('Failed to start quiz:', error);
            alert('Failed to start quiz. Please try again.');
        }
    };

    const handleAnswer = () => {
        if (selectedAnswer === questions[currentQuestion].word_oromo) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer('');
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        const finalScore = selectedAnswer === questions[currentQuestion].word_oromo ? score + 1 : score;
        
        try {
            await fetch('/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    score: finalScore,
                    total_questions: questions.length,
                    category_id: null,
                }),
            });
        } catch (error) {
            console.error('Failed to submit quiz:', error);
        }

        setQuizFinished(true);
    };

    const getOptions = () => {
        const current = questions[currentQuestion];
        const others = questions.filter((q) => q.id !== current.id).slice(0, 3);
        const options = [current.word_oromo, ...others.map((q) => q.word_oromo)];
        return options.sort(() => Math.random() - 0.5);
    };

    const options = useMemo(() => {
        if (questions.length === 0 || currentQuestion >= questions.length) return [];
        return getOptions();
    }, [currentQuestion, questions]);

    return (
        <Layout title="Quiz - Afaan Oromo Picture Dictionary">
            <h1 style={{ fontSize: '2rem', color: '#dc143c', marginBottom: '2rem', textAlign: 'center' }}>Quiz</h1>

            {!quizStarted && !quizFinished && (
                <div>
                    <Card style={{ padding: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
                        <Text size={600} style={{ marginBottom: '1rem', display: 'block', color: '#dc143c' }}>
                            Test Your Knowledge!
                        </Text>
                        <Text size={400} style={{ marginBottom: '2rem', display: 'block', color: '#666' }}>
                            Challenge yourself with 10 random questions from our dictionary
                        </Text>
                        <Button
                            appearance="primary"
                            onClick={startQuiz}
                            style={{ backgroundColor: '#228b22', paddingLeft: '1rem', paddingRight: '1rem' }}
                        >
                            Take A Quiz
                        </Button>
                    </Card>

                    {attempts.length > 0 && (
                        <>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#dc143c' }}>Recent Attempts</h2>
                            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                                {attempts.map((attempt) => (
                                    <Card key={attempt.id} style={{ padding: '1.5rem' }}>
                                        <Text size={500} style={{ display: 'block', marginBottom: '0.5rem', color: '#228b22', fontWeight: 'bold' }}>
                                            {Math.round((attempt.score / attempt.total_questions) * 100)}%
                                        </Text>
                                        <Text style={{ display: 'block', marginBottom: '0.25rem' }}>
                                            Score: {attempt.score}/{attempt.total_questions}
                                        </Text>
                                        {attempt.category && (
                                            <Text style={{ display: 'block', color: '#666', fontSize: '0.9rem' }}>
                                                Category: {attempt.category.name}
                                            </Text>
                                        )}
                                        <Text size={200} style={{ display: 'block', color: '#999', marginTop: '0.5rem' }}>
                                            {new Date(attempt.created_at).toLocaleDateString()}
                                        </Text>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {quizStarted && !quizFinished && questions.length > 0 && (
                <Card style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
                    <Text size={300} style={{ marginBottom: '0.75rem', display: 'block', color: '#666' }}>
                        Question {currentQuestion + 1} of {questions.length}
                    </Text>
                    {questions[currentQuestion].image_path ? (
                        <>
                            <img
                                src={questions[currentQuestion].image_path}
                                alt="Question"
                                style={{
                                    width: '100%',
                                    maxWidth: '300px',
                                    maxHeight: '250px',
                                    objectFit: 'cover',
                                    marginBottom: '1rem',
                                    borderRadius: '8px',
                                    display: 'block',
                                    margin: '0 auto 1rem',
                                }}
                            />
                            <Text weight="bold" size={500} style={{ marginBottom: '1rem', display: 'block', textAlign: 'center' }}>
                                What is this in Afaan Oromoo?
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text weight="bold" size={500} style={{ marginBottom: '0.75rem', display: 'block' }}>
                                What is this in Afaan Oromoo?
                            </Text>
                            <Text size={600} style={{ color: '#dc143c', marginBottom: '1rem', display: 'block' }}>
                                {questions[currentQuestion].word_english}
                            </Text>
                        </>
                    )}

                    <RadioGroup value={selectedAnswer} onChange={(_, data) => setSelectedAnswer(data.value)}>
                        {options.map((option) => (
                            <Radio key={option} value={option} label={option} style={{ marginBottom: '0.5rem' }} />
                        ))}
                    </RadioGroup>

                    <Button
                        appearance="primary"
                        onClick={handleAnswer}
                        disabled={!selectedAnswer}
                        style={{ marginTop: '1.5rem', backgroundColor: '#228b22' }}
                    >
                        {currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}
                    </Button>
                </Card>
            )}

            {quizFinished && (
                <Card style={{ padding: '2rem', textAlign: 'center' }}>
                    <Text size={600} style={{ color: '#228b22', marginBottom: '1rem', display: 'block' }}>
                        Quiz Complete!
                    </Text>
                    <Text size={500} style={{ marginBottom: '2rem', display: 'block' }}>
                        Your Score: {score}/{questions.length} (
                        {Math.round((score / questions.length) * 100)}%)
                    </Text>
                    <Button
                        appearance="primary"
                        onClick={() => {
                            setQuizStarted(false);
                            setQuizFinished(false);
                        }}
                        style={{ backgroundColor: '#228b22' }}
                    >
                        Back to Quiz
                    </Button>
                </Card>
            )}
        </Layout>
    );
}
