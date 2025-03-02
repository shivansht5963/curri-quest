import React from 'react';
import { motion } from 'framer-motion';
import { Medal, Trophy, User, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export interface LeaderboardEntry {
  id: string;
  name: string;
  rank: number;
  score: number;
  previousRank?: number;
  avatar?: string;
  subjects?: {
    name: string;
    score: number;
  }[];
}

export interface Props {
  entries: LeaderboardEntry[];
  title?: string;
  currentUserId?: string;
  showMovement?: boolean;
}

export function Leaderboard({
  entries,
  title = "Class Leaderboard",
  currentUserId,
  showMovement = true
}: Props) {
  // Sort entries by score descending
  const sortedEntries = [...entries].sort((a, b) => b.score - a.score);
  
  return (
    <div className="w-full rounded-xl bg-card shadow-neo-flat p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <Trophy className="h-5 w-5 text-amber-500" />
      </div>
      
      <div className="space-y-2 max-h-80 overflow-y-auto pr-2 -mr-2">
        {sortedEntries.map((entry, index) => {
          const isCurrentUser = entry.id === currentUserId;
          const rankChange = entry.previousRank !== undefined ? 
                            entry.previousRank - entry.rank : 0;
                            
          return (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center rounded-lg ${isCurrentUser ? 'bg-accent/10' : 'bg-secondary/5'} p-3 shadow-neo-inner`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center h-8 w-8 rounded-full mr-3 shadow-neo-inner">
                {entry.rank <= 3 ? (
                  <Medal className={`h-5 w-5 ${entry.rank === 1 ? 'text-amber-500' : entry.rank === 2 ? 'text-slate-400' : 'text-amber-700'}`} />
                ) : (
                  <span className="text-sm font-bold">{entry.rank}</span>
                )}
              </div>
              
              {/* Student Info */}
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-2 shadow-neo-inner">
                    {entry.avatar ? (
                      <img src={entry.avatar} alt={entry.name} className="h-8 w-8 rounded-full" />
                    ) : (
                      <User className="h-4 w-4 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${isCurrentUser ? 'text-accent' : ''}`}>{entry.name}</p>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">Score: {entry.score}</span>
                      {showMovement && rankChange !== 0 && (
                        <span className={`ml-2 text-xs flex items-center ${
                          rankChange > 0 ? 'text-green-500' : 
                          rankChange < 0 ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                          {rankChange > 0 ? (
                            <>
                              <ArrowUp className="h-3 w-3 mr-0.5" />
                              {rankChange}
                            </>
                          ) : rankChange < 0 ? (
                            <>
                              <ArrowDown className="h-3 w-3 mr-0.5" />
                              {Math.abs(rankChange)}
                            </>
                          ) : (
                            <>
                              <Minus className="h-3 w-3 mr-0.5" />
                              0
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Score */}
              <div className="text-right">
                {entry.subjects && (
                  <div className="flex space-x-1">
                    {entry.subjects.slice(0, 3).map((subject) => (
                      <div 
                        key={subject.name} 
                        className="text-xs rounded-full px-2 py-0.5 bg-muted" 
                        title={`${subject.name}: ${subject.score}`}
                      >
                        {subject.name.substring(0, 3)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
