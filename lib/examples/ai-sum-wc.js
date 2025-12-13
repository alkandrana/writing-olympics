// controllers/goalController.js
exports.getGoalDetails = async (req, res) => {
    // 1. Fetch the data (The EF Core .Include() equivalent)
    const goal = await prisma.goal.findUnique({
        where: { id: Number(req.params.id) },
        include: { 
            sessions: {
                orderBy: { startTime: 'desc' } // Sort sessions for your table
            } 
        }
    });

    if (!goal) return res.status(404).send("Goal not found");

    // 2. Perform the Calculations (The "Business Logic")
    
    // LINQ: sessions.Sum(s => s.wordCount)
    const currentWordCount = goal.sessions.reduce((sum, session) => sum + session.wordCount, 0);
    
    // Simple math for the remaining count
    // Using Math.max ensures we don't display negative words if they overachieve!
    const wordsRemaining = Math.max(0, goal.targetWordCount - currentWordCount);
    
    // Calculate progress percentage for a progress bar
    const percentComplete = Math.min(100, Math.floor((currentWordCount / goal.targetWordCount) * 100));

    // 3. Send to View (Pass data as a clean package)
    res.render('goal-detail', { 
        goal, 
        stats: {
            current: currentWordCount,
            remaining: wordsRemaining,
            percent: percentComplete
        },
        // Optional: Helper for formatting numbers (e.g., "50,000" instead of "50000")
        formatNumber: new Intl.NumberFormat().format 
    });
};
