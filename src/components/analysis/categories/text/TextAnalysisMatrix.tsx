import { DataField } from '@/types/data';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface TextAnalysisMatrixProps {
  field: DataField;
}

interface AnalysisMetrics {
  basic: {
    wordCount: number;
    charCount: number;
    uniqueWords: number;
    sentences: number;
    paragraphs: number;
    readingTime: number;
    vocabulary: number; // unique words / total words ratio
  };
  complexity: {
    avgWordLength: number;
    avgWordsPerSentence: number;
    avgSentencesPerParagraph: number;
    readabilityScore: number;
    readabilityGrade: string;
    complexWordPercentage: number;
    mostFrequentWord: string;
    longestWord: string;
    syllableCount: number;
  };
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
    compound: number;
    emotions: Record<string, number>;
    overallTone: string;
  };
  distribution: {
    wordLength: Record<string, number>;
    topWords: Array<{ word: string; count: number; percentage: number }>;
    punctuationStats: Record<string, number>;
    partOfSpeech: Record<string, number>;
  };
  advanced: {
    lexicalDiversity: number;
    typeTokenRatio: number;
    averageSyllablesPerWord: number;
    difficultWords: string[];
    keyPhrases: Array<{ phrase: string; frequency: number }>;
    textDensity: number;
  };
}

// Enhanced stop words list
const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 
  'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 
  'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 
  'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 
  'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 
  'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 
  'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 
  'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 
  'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
  'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
]);

// Enhanced sentiment words with emotions
const SENTIMENT_LEXICON = {
  positive: {
    joy: ['happy', 'joyful', 'delighted', 'cheerful', 'ecstatic', 'elated', 'jubilant'],
    love: ['love', 'adore', 'cherish', 'affection', 'romantic', 'devoted', 'passion'],
    excitement: ['excited', 'thrilled', 'enthusiastic', 'energetic', 'exhilarated'],
    satisfaction: ['satisfied', 'content', 'pleased', 'fulfilled', 'accomplished'],
    optimism: ['optimistic', 'hopeful', 'positive', 'confident', 'bright', 'promising'],
    appreciation: ['grateful', 'thankful', 'appreciate', 'blessed', 'fortunate'],
    admiration: ['amazing', 'wonderful', 'fantastic', 'excellent', 'outstanding', 'brilliant', 'magnificent']
  },
  negative: {
    sadness: ['sad', 'depressed', 'melancholy', 'gloomy', 'sorrowful', 'miserable'],
    anger: ['angry', 'furious', 'irritated', 'annoying', 'rage', 'hostile', 'outraged'],
    fear: ['afraid', 'scared', 'terrified', 'anxious', 'worried', 'nervous', 'panic'],
    disgust: ['disgusting', 'revolting', 'repulsive', 'awful', 'horrible', 'terrible'],
    disappointment: ['disappointed', 'let down', 'frustrated', 'dissatisfied'],
    criticism: ['bad', 'poor', 'worst', 'disappointing', 'inadequate', 'inferior']
  }
};

export function TextAnalysisMatrix({ field }: TextAnalysisMatrixProps) {
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyzeText = async () => {
      try {
        const texts = field.value as string[];
        const allText = texts.join(' ');

        if (!allText.trim()) {
          setMetrics(null);
          setLoading(false);
          return;
        }

        // Enhanced text preprocessing
        const originalText = allText.trim();
        const cleanText = originalText
          .replace(/\s+/g, ' ')
          .trim();

        // Split into paragraphs, sentences, and words
        const paragraphs = cleanText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        // More sophisticated word extraction
        const words = cleanText
          .toLowerCase()
          .replace(/[^\w\s'-]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length > 0 && /[a-zA-Z]/.test(w));

        const chars = cleanText.replace(/\s+/g, '');

        // Enhanced word frequency analysis
        const wordFreq = new Map<string, number>();
        const bigrams = new Map<string, number>();
        
        words.forEach((word, index) => {
          wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
          
          // Create bigrams for key phrase detection
          if (index < words.length - 1) {
            const bigram = `${word} ${words[index + 1]}`;
            if (!STOP_WORDS.has(word) && !STOP_WORDS.has(words[index + 1])) {
              bigrams.set(bigram, (bigrams.get(bigram) || 0) + 1);
            }
          }
        });

        // Get top words with percentages
        const totalWords = words.length;
        const topWords = Array.from(wordFreq.entries())
          .filter(([word]) => !STOP_WORDS.has(word) && word.length > 2)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map(([word, count]) => ({ 
            word, 
            count, 
            percentage: Number(((count / totalWords) * 100).toFixed(2))
          }));

        // Key phrases from bigrams
        const keyPhrases = Array.from(bigrams.entries())
          .filter(([, freq]) => freq > 1)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([phrase, frequency]) => ({ phrase, frequency }));

        // Enhanced syllable counting
        const syllableCount = words.reduce((count, word) => count + countSyllables(word), 0);
        const averageSyllablesPerWord = syllableCount / words.length;

        // Complex words (3+ syllables)
        const complexWords = words.filter(word => countSyllables(word) >= 3);
        const complexWordPercentage = (complexWords.length / words.length) * 100;

        // Enhanced readability calculations
        const avgWordsPerSentence = words.length / sentences.length;
        const avgSentencesPerParagraph = sentences.length / Math.max(paragraphs.length, 1);

        // Flesch Reading Ease Score
        const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * averageSyllablesPerWord);
        
        const readabilityGrade = getReadabilityGrade(fleschScore);

        // Enhanced sentiment analysis
        const sentimentAnalysis = analyzeSentimentDetailed(words);

        // Word length distribution (more granular)
        const wordLengthDist: Record<string, number> = {
          'Very Short (1-2)': 0,
          'Short (3-4)': 0,
          'Medium (5-6)': 0,
          'Long (7-9)': 0,
          'Very Long (10+)': 0
        };

        words.forEach(word => {
          const length = word.length;
          if (length <= 2) wordLengthDist['Very Short (1-2)']++;
          else if (length <= 4) wordLengthDist['Short (3-4)']++;
          else if (length <= 6) wordLengthDist['Medium (5-6)']++;
          else if (length <= 9) wordLengthDist['Long (7-9)']++;
          else wordLengthDist['Very Long (10+)']++;
        });

        // Punctuation analysis
        const punctuationStats = analyzePunctuation(originalText);

        // Lexical diversity measures
        const uniqueWords = new Set(words).size;
        const typeTokenRatio = uniqueWords / words.length;
        const lexicalDiversity = calculateLexicalDiversity(words);

        // Find longest word
        const longestWord = words.reduce((longest, current) => 
          current.length > longest.length ? current : longest, '');

        // Difficult words (not in common word list)
        const difficultWords = Array.from(new Set(complexWords))
          .filter(word => word.length > 6)
          .slice(0, 10);

        // Text density (average information per word)
        const textDensity = uniqueWords / words.length;

        // Enhanced reading time (adjusts for complexity)
        const baseReadingSpeed = 200; // words per minute
        const complexityFactor = Math.max(0.7, Math.min(1.3, 1 - (fleschScore - 60) / 100));
        const adjustedReadingSpeed = baseReadingSpeed * complexityFactor;
        const readingTime = Number((words.length / adjustedReadingSpeed).toFixed(1));

        setMetrics({
          basic: {
            wordCount: words.length,
            charCount: chars.length,
            uniqueWords,
            sentences: sentences.length,
            paragraphs: paragraphs.length,
            readingTime,
            vocabulary: Number((typeTokenRatio * 100).toFixed(2))
          },
          complexity: {
            avgWordLength: Number((chars.length / words.length).toFixed(2)),
            avgWordsPerSentence: Number(avgWordsPerSentence.toFixed(2)),
            avgSentencesPerParagraph: Number(avgSentencesPerParagraph.toFixed(2)),
            readabilityScore: Number(fleschScore.toFixed(2)),
            readabilityGrade,
            complexWordPercentage: Number(complexWordPercentage.toFixed(2)),
            mostFrequentWord: topWords[0]?.word || '',
            longestWord,
            syllableCount
          },
          sentiment: sentimentAnalysis,
          distribution: {
            wordLength: wordLengthDist,
            topWords,
            punctuationStats,
            partOfSpeech: {} // Could be enhanced with NLP library
          },
          advanced: {
            lexicalDiversity: Number(lexicalDiversity.toFixed(3)),
            typeTokenRatio: Number(typeTokenRatio.toFixed(3)),
            averageSyllablesPerWord: Number(averageSyllablesPerWord.toFixed(2)),
            difficultWords,
            keyPhrases,
            textDensity: Number(textDensity.toFixed(3))
          }
        });
      } catch (error) {
        console.error('Error analyzing text:', error);
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    };

    analyzeText();
  }, [field]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Analyzing text...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No text data available for analysis.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="complexity">Complexity</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard title="Word Count" value={metrics.basic.wordCount} />
            <MetricCard title="Character Count" value={metrics.basic.charCount} />
            <MetricCard title="Unique Words" value={metrics.basic.uniqueWords} />
            <MetricCard title="Sentences" value={metrics.basic.sentences} />
            <MetricCard title="Paragraphs" value={metrics.basic.paragraphs} />
            <MetricCard 
              title="Reading Time" 
              value={`${metrics.basic.readingTime} min`} 
              subtitle="Adjusted for complexity"
            />
            <MetricCard 
              title="Vocabulary Richness" 
              value={`${metrics.basic.vocabulary}%`}
              subtitle="Unique words ratio"
            />
          </div>
        </TabsContent>

        <TabsContent value="complexity">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard 
                title="Readability Score" 
                value={metrics.complexity.readabilityScore}
                subtitle={metrics.complexity.readabilityGrade}
              />
              <MetricCard 
                title="Average Word Length" 
                value={`${metrics.complexity.avgWordLength} chars`}
              />
              <MetricCard 
                title="Words per Sentence" 
                value={metrics.complexity.avgWordsPerSentence}
              />
              <MetricCard 
                title="Sentences per Paragraph" 
                value={metrics.complexity.avgSentencesPerParagraph}
              />
              <MetricCard 
                title="Complex Words" 
                value={`${metrics.complexity.complexWordPercentage}%`}
                subtitle="3+ syllables"
              />
              <MetricCard 
                title="Total Syllables" 
                value={metrics.complexity.syllableCount}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Most Frequent Word</h4>
                <Badge variant="secondary" className="text-lg">
                  {metrics.complexity.mostFrequentWord}
                </Badge>
              </Card>
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Longest Word</h4>
                <Badge variant="outline" className="text-lg">
                  {metrics.complexity.longestWord}
                </Badge>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sentiment">
          <div className="space-y-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Overall Sentiment</h4>
              <div className="text-center mb-4">
                <Badge 
                  variant={metrics.sentiment.overallTone === 'Positive' ? 'default' : 
                          metrics.sentiment.overallTone === 'Negative' ? 'destructive' : 'secondary'}
                  className="text-lg px-4 py-2"
                >
                  {metrics.sentiment.overallTone}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Positive</span>
                    <span>{metrics.sentiment.positive.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.sentiment.positive} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Negative</span>
                    <span>{metrics.sentiment.negative.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.sentiment.negative} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Neutral</span>
                    <span>{metrics.sentiment.neutral.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.sentiment.neutral} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Emotional Analysis</h4>
              <div className="grid gap-2">
                {Object.entries(metrics.sentiment.emotions)
                  .filter(([, value]) => value > 0)
                  .sort((a, b) => b[1] - a[1])
                  .map(([emotion, intensity]) => (
                    <div key={emotion} className="flex items-center justify-between">
                      <span className="capitalize">{emotion}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={intensity} className="w-20 h-2" />
                        <span className="text-sm text-gray-500">{intensity.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution">
          <div className="space-y-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Word Length Distribution</h4>
              <div className="space-y-3">
                {Object.entries(metrics.distribution.wordLength).map(([category, count]) => {
                  const percentage = (count / metrics.basic.wordCount) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span>{category}</span>
                        <span>{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Top Words</h4>
              <div className="grid gap-2">
                {metrics.distribution.topWords.slice(0, 10).map(({ word, count, percentage }) => (
                  <div key={word} className="flex justify-between items-center">
                    <Badge variant="outline">{word}</Badge>
                    <div className="flex items-center gap-2">
                      <Progress value={percentage * 10} className="w-20 h-2" />
                      <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Punctuation Usage</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(metrics.distribution.punctuationStats).map(([punct, count]) => (
                  <div key={punct} className="flex justify-between">
                    <span className="font-mono">"{punct}"</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard 
                title="Lexical Diversity" 
                value={metrics.advanced.lexicalDiversity}
                subtitle="Higher = more varied vocabulary"
              />
              <MetricCard 
                title="Type-Token Ratio" 
                value={metrics.advanced.typeTokenRatio}
                subtitle="Vocabulary complexity"
              />
              <MetricCard 
                title="Avg Syllables/Word" 
                value={metrics.advanced.averageSyllablesPerWord}
              />
              <MetricCard 
                title="Text Density" 
                value={metrics.advanced.textDensity}
                subtitle="Information per word"
              />
            </div>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Key Phrases</h4>
              <div className="flex flex-wrap gap-2">
                {metrics.advanced.keyPhrases.map(({ phrase, frequency }) => (
                  <Badge key={phrase} variant="secondary">
                    {phrase} ({frequency})
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Complex Words</h4>
              <div className="flex flex-wrap gap-2">
                {metrics.advanced.difficultWords.map(word => (
                  <Badge key={word} variant="outline">
                    {word}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper Components
function MetricCard({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) {
  return (
    <Card className="p-4">
      <h4 className="font-semibold text-sm text-gray-600 mb-1">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </Card>
  );
}

// Enhanced helper functions
function countSyllables(word: string): number {
  if (!word || word.length === 0) return 0;
  
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length === 0) return 1;
  
  // Handle special cases
  if (word.length <= 3) return 1;
  
  // Remove silent e at the end
  word = word.replace(/e$/, '');
  
  // Count vowel groups
  const vowelGroups = word.match(/[aeiouy]+/g);
  let syllables = vowelGroups ? vowelGroups.length : 1;
  
  // Adjust for common patterns
  if (word.match(/le$/)) syllables++;
  if (word.match(/[^aeiou]y$/)) syllables++;
  
  return Math.max(1, syllables);
}

function getReadabilityGrade(score: number): string {
  if (score >= 90) return "Very Easy (5th grade)";
  if (score >= 80) return "Easy (6th grade)";
  if (score >= 70) return "Fairly Easy (7th grade)";
  if (score >= 60) return "Standard (8th-9th grade)";
  if (score >= 50) return "Fairly Difficult (10th-12th grade)";
  if (score >= 30) return "Difficult (College level)";
  return "Very Difficult (Graduate level)";
}

function analyzeSentimentDetailed(words: string[]) {
  const emotions = {
    joy: 0, love: 0, excitement: 0, satisfaction: 0, optimism: 0, appreciation: 0, admiration: 0,
    sadness: 0, anger: 0, fear: 0, disgust: 0, disappointment: 0, criticism: 0
  };

  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    // Check positive emotions
    Object.entries(SENTIMENT_LEXICON.positive).forEach(([emotion, wordList]) => {
      if (wordList.includes(word)) {
        emotions[emotion as keyof typeof emotions]++;
        positiveCount++;
      }
    });

    // Check negative emotions
    Object.entries(SENTIMENT_LEXICON.negative).forEach(([emotion, wordList]) => {
      if (wordList.includes(word)) {
        emotions[emotion as keyof typeof emotions]++;
        negativeCount++;
      }
    });
  });

  const totalSentimentWords = positiveCount + negativeCount;

  // Calculate percentages
  const positive = totalSentimentWords > 0 ? (positiveCount / words.length) * 100 : 0;
  const negative = totalSentimentWords > 0 ? (negativeCount / words.length) * 100 : 0;
  const neutral = 100 - positive - negative;

  // Calculate compound score
  const compound = totalSentimentWords > 0 ? ((positiveCount - negativeCount) / totalSentimentWords) * 100 : 0;

  // Determine overall tone
  let overallTone = 'Neutral';
  if (compound > 10) overallTone = 'Positive';
  else if (compound < -10) overallTone = 'Negative';

  // Convert emotion counts to percentages
  const emotionPercentages: Record<string, number> = {};
  Object.entries(emotions).forEach(([emotion, count]) => {
    emotionPercentages[emotion] = totalSentimentWords > 0 ? (count / totalSentimentWords) * 100 : 0;
  });

  return {
    positive,
    negative,
    neutral,
    compound,
    emotions: emotionPercentages,
    overallTone
  };
}

function analyzePunctuation(text: string): Record<string, number> {
  const punctuationMap: Record<string, number> = {
    '.': 0, '!': 0, '?': 0, ',': 0, ';': 0, ':': 0, '-': 0, '"': 0, "'": 0
  };

  for (const char of text) {
    if (punctuationMap.hasOwnProperty(char)) {
      punctuationMap[char]++;
    }
  }

  return punctuationMap;
}

function calculateLexicalDiversity(words: string[]): number {
  if (words.length === 0) return 0;
  
  const uniqueWords = new Set(words).size;
  const totalWords = words.length;
  
  // TTR (Type-Token Ratio) with square root transformation for text length normalization
  return uniqueWords / Math.sqrt(totalWords);
} 