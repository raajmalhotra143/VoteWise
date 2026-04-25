import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy_anon_key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveMessage = async (sessionId: string, role: 'user' | 'assistant', message: string, userId?: string) => {
  const { data, error } = await supabase
    .from('chat_history')
    .insert([{ session_id: sessionId, role, message, user_id: userId || null }]);
  if (error) console.error('Error saving message:', error);
  return data;
};

export const getSessionMessages = async (sessionId: string) => {
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const saveQuizAttempt = async (userId: string, topic: string, score: number, total: number, timeTaken: number) => {
  const percentage = (score / total) * 100;
  
  // 1. Save attempt
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert([{ user_id: userId, quiz_topic: topic, score, total_questions: total, percentage, time_taken_seconds: timeTaken }]);
  
  if (error) {
    console.error('Error saving quiz attempt:', error);
    return null;
  }

  // 2. Award points (10 points per correct answer)
  const points = score * 10;
  await supabase.rpc('increment_user_points', { user_id: userId, points_to_add: points });

  // 3. Check for badges
  if (percentage >= 100) {
    await supabase.from('user_badges').upsert([{ user_id: userId, badge_id: 'perfect_score' }], { onConflict: 'user_id,badge_id' });
  }
  
  if (percentage >= 50) {
    const badgeId = `${topic}_pass`;
    await supabase.from('user_badges').upsert([{ user_id: userId, badge_id: badgeId }], { onConflict: 'user_id,badge_id' });
  }

  return data;
};

export const getUserStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('score, total_questions, percentage')
    .eq('user_id', userId);
  
  if (error) throw error;
  if (!data || data.length === 0) return { count: 0, average: 0, best: 0 };
  
  const count = data.length;
  const average = data.reduce((acc, curr) => acc + curr.percentage, 0) / count;
  const best = Math.max(...data.map(d => d.percentage));
  
  return { count, average, best };
};

export const saveMyFeedback = async (userId: string | null, mythId: string, wasHelpful: boolean) => {
  const { data, error } = await supabase
    .from('myth_feedback')
    .insert([{ user_id: userId, myth_id: mythId, was_helpful: wasHelpful }]);
  if (error) console.error('Error saving myth feedback:', error);
  return data;
};

export const getLeaderboard = async () => {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select(`
      percentage,
      user_id,
      users_profile (full_name, avatar_url)
    `)
    .order('percentage', { ascending: false })
    .limit(5);
  if (error) throw error;
  return data;
};
