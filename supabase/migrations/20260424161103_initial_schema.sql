-- Table 1: users_profile (Updated)
CREATE TABLE users_profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    email TEXT,
    avatar_url TEXT,
    state TEXT,
    age INTEGER,
    is_first_time_voter BOOLEAN DEFAULT false,
    streak_count INTEGER DEFAULT 0,
    total_points INTEGER DEFAULT 0,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users_profile FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users_profile FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users_profile FOR UPDATE USING (auth.uid() = id);

-- Table 2: quiz_attempts
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users_profile(id),
    quiz_topic TEXT,
    score INTEGER,
    total_questions INTEGER,
    percentage NUMERIC(5,2),
    time_taken_seconds INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view quiz attempts for leaderboard" ON quiz_attempts FOR SELECT USING (true);

-- Table 3: chat_history
CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users_profile(id),
    session_id TEXT,
    role TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own chat history" ON chat_history FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert chat history" ON chat_history FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Table 4: myth_feedback
CREATE TABLE myth_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    myth_id TEXT,
    was_helpful BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE myth_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert myth feedback" ON myth_feedback FOR INSERT WITH CHECK (true);

-- Table 5: badges
CREATE TABLE badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon_type TEXT -- 'medal', 'shield', 'star', etc.
);

-- Table 6: user_badges
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users_profile(id),
    badge_id TEXT REFERENCES badges(id),
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);

-- Seed badges
INSERT INTO badges (id, name, description, icon_type) VALUES
('voter_basics_pass', 'Basics Master', 'Passed the Voter Basics Quiz', 'medal'),
('election_process_pass', 'Process Expert', 'Passed the Election Process Quiz', 'shield'),
('voting_rights_pass', 'Rights Advocate', 'Passed the Voting Rights Quiz', 'star'),
('perfect_score', 'Champion', 'Scored 100% on any quiz', 'award'),
('myth_buster', 'Skeptic', 'Gave feedback on 5 election myths', 'alert');

-- Function to increment user points
CREATE OR REPLACE FUNCTION increment_user_points(user_id UUID, points_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE users_profile
    SET total_points = total_points + points_to_add,
        last_active_at = now()
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
