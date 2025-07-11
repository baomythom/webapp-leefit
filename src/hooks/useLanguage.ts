
import { create } from 'zustand';

interface LanguageState {
  language: 'vi' | 'en';
  setLanguage: (language: 'vi' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Navigation
    features: 'Tính năng',
    trainers: 'Huấn luyện viên',
    testimonials: 'Đánh giá',
    signIn: 'Đăng nhập',
    getStarted: 'Bắt đầu',
    
    // Hero Section
    globalPlatform: 'Nền tảng toàn cầu',
    heroTitle: 'Chuyển đổi sức khỏe của bạn với ',
    heroTitleHighlight: 'huấn luyện chuyên nghiệp',
    heroDescription: 'Kết nối với các huấn luyện viên được chứng nhận, theo dõi tiến trình và đạt được mục tiêu thể dục của bạn với nền tảng coaching cá nhân hóa của chúng tôi.',
    startYourJourney: 'Bắt đầu hành trình',
    watchDemo: 'Xem demo',
    activeUsers: 'Người dùng hoạt động',
    certifiedTrainers: 'Huấn luyện viên được chứng nhận',
    successRate: 'Tỷ lệ thành công',
    
    // Features
    whyChooseUs: 'Tại sao chọn chúng tôi?',
    whyChooseUsDesc: 'Khám phá các tính năng mạnh mẽ giúp bạn đạt được mục tiêu thể dục nhanh hơn và hiệu quả hơn.',
    expertTrainers: 'Huấn luyện viên chuyên gia',
    expertTrainersDesc: 'Huấn luyện viên được chứng nhận với nhiều năm kinh nghiệm',
    smartScheduling: 'Lịch trình thông minh',
    smartSchedulingDesc: 'Tích hợp Google Calendar để lên lịch liền mạch',
    progressTrackingFeature: 'Theo dõi tiến trình',
    progressTrackingDesc: 'Biểu đồ chi tiết và phân tích để theo dõi cải thiện',
    personalizedPrograms: 'Chương trình cá nhân hóa',
    personalizedProgramsDesc: 'Chương trình tập luyện được thiết kế riêng cho mục tiêu của bạn',
    
    // Trainers
    meetOurTrainers: 'Gặp gỡ huấn luyện viên của chúng tôi',
    meetOurTrainersDesc: 'Đội ngũ huấn luyện viên chuyên nghiệp sẵn sàng hướng dẫn bạn đạt được mục tiêu thể dục.',
    
    // Testimonials
    whatClientsSay: 'Khách hàng nói gì',
    whatClientsSayDesc: 'Nghe từ những người đã chuyển đổi cuộc sống của họ với nền tảng của chúng tôi.',
    fitnessEnthusiast: 'Người yêu thể dục',
    businessman: 'Doanh nhân',
    personalTrainer: 'Huấn luyện viên cá nhân',
    testimonial1: 'FITTR đã thay đổi hoàn toàn cách tiếp cận thể dục của tôi. Các huấn luyện viên rất chuyên nghiệp và hỗ trợ.',
    testimonial2: 'Với lịch trình bận rộn, tính năng lập lịch thông minh của FITTR là cứu cánh. Tôi không bao giờ bỏ lỡ buổi tập.',
    testimonial3: 'Là một huấn luyện viên, tôi yêu thông các công cụ theo dõi tiến trình. Nó giúp tôi hỗ trợ khách hàng tốt hơn.',
    
    // CTA
    readyToStart: 'Sẵn sàng bắt đầu?',
    readyToStartDesc: 'Tham gia cùng hàng nghìn người khác đã chuyển đổi cuộc sống của họ với FITTR.',
    beginAssessment: 'Bắt đầu đánh giá',
    
    // Footer
    footerDescription: 'Nền tảng coaching thể dục hàng đầu kết nối bạn với các huấn luyện viên chuyên nghiệp.',
    platform: 'Nền tảng',
    programs: 'Chương trình',
    pricing: 'Giá cả',
    support: 'Hỗ trợ',
    helpCenter: 'Trung tâm trợ giúp',
    contact: 'Liên hệ',
    community: 'Cộng đồng',
    blog: 'Blog',
    legal: 'Pháp lý',
    privacy: 'Quyền riêng tư',
    terms: 'Điều khoản',
    cookies: 'Cookies',
    allRightsReserved: 'Tất cả quyền được bảo lưu.',
    
    // Survey
    surveyTitle: 'Hãy cho chúng tôi biết về bạn',
    surveyDescription: 'Trả lời một vài câu hỏi để chúng tôi có thể cá nhân hóa trải nghiệm của bạn.',
    fitnessExperience: 'Kinh nghiệm thể dục của bạn như thế nào?',
    newToFitness: 'Tôi mới với thể dục',
    returningToFitness: 'Tôi đã từng tập và muốn quay lại',
    currentlyActive: 'Tôi hiện đang tập thể dục',
    fitnessEnthusiastLevel: 'Tôi là người đam mê thể dục',
    primaryGoal: 'Mục tiêu chính của bạn là gì?',
    loseWeight: 'Giảm cân',
    buildMuscle: 'Tăng cơ',
    improveCardio: 'Cải thiện tim mạch',
    generalFitness: 'Thể dục tổng quát',
    preferredGender: 'Bạn có ưu tiên giới tính huấn luyện viên không?',
    male: 'Nam',
    female: 'Nữ',
    noPreference: 'Không ưu tiên',
    weeklyCommitment: 'Bạn có thể cam kết bao nhiêu buổi tập mỗi tuần?',
    sessions: 'buổi',
    healthConcerns: 'Bạn có mối quan ngại nào về sức khỏe không?',
    healthConcernsPlaceholder: 'Ví dụ: đau lưng, vấn đề về khớp, v.v. (tùy chọn)',
    submitSurvey: 'Gửi khảo sát',
    surveyCompleted: 'Cảm ơn! Chúng tôi sẽ liên hệ với bạn sớm.',
    
    // Trainers
    yearsExperience: 'năm kinh nghiệm',
    rating: 'Đánh giá',
    specialties: 'Chuyên môn',
    viewProfile: 'Xem hồ sơ',
    bookSession: 'Đặt buổi tập',
    
    // Dashboard Navigation
    dashboard: 'Bảng điều khiển',
    progress: 'Tiến độ',
    schedule: 'Lịch trình',
    feedback: 'Phản hồi',
    profile: 'Hồ sơ',
    
    // Dashboard Content
    totalSessions: 'Tổng buổi tập',
    goalProgress: 'Tiến độ mục tiêu',
    activeStreak: 'Chuỗi hoạt động',
    nextSession: 'Buổi tập tiếp theo',
    recentActivity: 'Hoạt động gần đây',
    upcomingSessions: 'Buổi tập sắp tới',
    weeklyGoals: 'Mục tiêu tuần',
    progressTracking: 'Theo dõi tiến độ'
  },
  en: {
    // Navigation
    features: 'Features',
    trainers: 'Trainers',
    testimonials: 'Testimonials',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    
    // Hero Section
    globalPlatform: 'Global Platform',
    heroTitle: 'Transform Your Health with ',
    heroTitleHighlight: 'Expert Coaching',
    heroDescription: 'Connect with certified trainers, track your progress, and achieve your fitness goals with our personalized coaching platform.',
    startYourJourney: 'Start Your Journey',
    watchDemo: 'Watch Demo',
    activeUsers: 'Active Users',
    certifiedTrainers: 'Certified Trainers',
    successRate: 'Success Rate',
    
    // Features
    whyChooseUs: 'Why Choose Us?',
    whyChooseUsDesc: 'Discover the powerful features that help you achieve your fitness goals faster and more effectively.',
    expertTrainers: 'Expert Trainers',
    expertTrainersDesc: 'Certified trainers with years of experience',
    smartScheduling: 'Smart Scheduling',
    smartSchedulingDesc: 'Google Calendar integration for seamless scheduling',
    progressTrackingFeature: 'Progress Tracking',
    progressTrackingDesc: 'Detailed charts and analytics to track improvements',
    personalizedPrograms: 'Personalized Programs',
    personalizedProgramsDesc: 'Workout programs tailored to your specific goals',
    
    // Trainers
    meetOurTrainers: 'Meet Our Trainers',
    meetOurTrainersDesc: 'Our team of professional trainers ready to guide you to your fitness goals.',
    
    // Testimonials
    whatClientsSay: 'What Our Clients Say',
    whatClientsSayDesc: 'Hear from those who have transformed their lives with our platform.',
    fitnessEnthusiast: 'Fitness Enthusiast',
    businessman: 'Businessman',
    personalTrainer: 'Personal Trainer',
    testimonial1: 'FITTR has completely changed my approach to fitness. The trainers are professional and supportive.',
    testimonial2: 'With my busy schedule, FITTR\'s smart scheduling feature is a lifesaver. I never miss a workout.',
    testimonial3: 'As a trainer myself, I love the progress tracking tools. It helps me support my clients better.',
    
    // CTA
    readyToStart: 'Ready to Get Started?',
    readyToStartDesc: 'Join thousands of others who have transformed their lives with FITTR.',
    beginAssessment: 'Begin Assessment',
    
    // Footer
    footerDescription: 'The leading fitness coaching platform connecting you with professional trainers.',
    platform: 'Platform',
    programs: 'Programs',
    pricing: 'Pricing',
    support: 'Support',
    helpCenter: 'Help Center',
    contact: 'Contact',
    community: 'Community',
    blog: 'Blog',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    cookies: 'Cookies',
    allRightsReserved: 'All rights reserved.',
    
    // Survey
    surveyTitle: 'Tell us about yourself',
    surveyDescription: 'Answer a few questions so we can personalize your experience.',
    fitnessExperience: 'What\'s your experience with fitness?',
    newToFitness: 'I\'m new to this',
    returningToFitness: 'I used to work out and want to get back into it',
    currentlyActive: 'I currently work out',
    fitnessEnthusiastLevel: 'I am a fitness enthusiast',
    primaryGoal: 'What\'s your primary goal?',
    loseWeight: 'Lose Weight',
    buildMuscle: 'Build Muscle',
    improveCardio: 'Improve Cardio',
    generalFitness: 'General Fitness',
    preferredGender: 'Do you have a preferred trainer gender?',
    male: 'Male',
    female: 'Female',
    noPreference: 'No Preference',
    weeklyCommitment: 'How many sessions can you commit to per week?',
    sessions: 'sessions',
    healthConcerns: 'Do you have any health concerns?',
    healthConcernsPlaceholder: 'e.g., back pain, joint issues, etc. (optional)',
    submitSurvey: 'Submit Survey',
    surveyCompleted: 'Thank you! We\'ll be in touch soon.',
    
    // Trainers
    yearsExperience: 'years experience',
    rating: 'Rating',
    specialties: 'Specialties',
    viewProfile: 'View Profile',
    bookSession: 'Book Session',
    
    // Dashboard Navigation
    dashboard: 'Dashboard',
    progress: 'Progress',
    schedule: 'Schedule',
    feedback: 'Feedback',
    profile: 'Profile',
    
    // Dashboard Content
    totalSessions: 'Total Sessions',
    goalProgress: 'Goal Progress',
    activeStreak: 'Active Streak',
    nextSession: 'Next Session',
    recentActivity: 'Recent Activity',
    upcomingSessions: 'Upcoming Sessions',
    weeklyGoals: 'Weekly Goals',
    progressTracking: 'Progress Tracking'
  }
};

export const useLanguage = create<LanguageState>((set, get) => ({
  language: 'vi',
  setLanguage: (language) => set({ language }),
  t: (key: string) => {
    const { language } = get();
    return translations[language][key as keyof typeof translations.vi] || key;
  },
}));
