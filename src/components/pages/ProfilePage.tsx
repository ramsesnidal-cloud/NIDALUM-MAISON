import { useEffect } from 'react';
import { useMember } from '@/integrations';
import { useUserProgressStore } from '@/lib/user-progress-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LogOut, BookOpen, Target, Flame } from 'lucide-react';

export default function ProfilePage() {
  const { member, actions } = useMember();
  const { progress } = useUserProgressStore();

  const handleLogout = () => {
    actions.logout();
  };

  const getInitials = () => {
    if (member?.contact?.firstName && member?.contact?.lastName) {
      return `${member.contact.firstName[0]}${member.contact.lastName[0]}`.toUpperCase();
    }
    return member?.loginEmail?.[0].toUpperCase() || 'U';
  };

  const accuracyRate = progress
    ? Math.round((progress.correctAnswers / progress.totalAttempts) * 100) || 0
    : 0;

  const chartData = [
    { name: 'Correct', value: progress?.correctAnswers || 0 },
    { name: 'Incorrect', value: (progress?.totalAttempts || 0) - (progress?.correctAnswers || 0) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold font-heading text-primary mb-4">
            Mon Profil
          </h1>
          <p className="text-xl text-secondary">
            Gérez votre compte et suivez votre progression
          </p>
        </div>

        {/* Profile Card */}
        <Card className="bg-white/5 border-secondary/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <Avatar className="w-24 h-24 border-2 border-primary">
              {member?.profile?.photo?.url ? (
                <AvatarImage src={member.profile.photo.url} alt="Profile" />
              ) : null}
              <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">
                {member?.profile?.nickname ||
                  `${member?.contact?.firstName || ''} ${member?.contact?.lastName || ''}`.trim() ||
                  'Utilisateur'}
              </h2>
              <p className="text-secondary mb-4">{member?.loginEmail}</p>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-primary/20 rounded-lg">
                  <p className="text-xs text-secondary">Statut</p>
                  <p className="text-white font-semibold capitalize">
                    {member?.status || 'Actif'}
                  </p>
                </div>
                <div className="px-4 py-2 bg-secondary/20 rounded-lg">
                  <p className="text-xs text-secondary">Membre depuis</p>
                  <p className="text-white font-semibold">
                    {member?._createdDate
                      ? new Date(member._createdDate).toLocaleDateString('fr-FR')
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Déconnexion
            </Button>
          </div>
        </Card>

        {/* Learning Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="bg-white/5 border-secondary/20 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <BookOpen className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-secondary text-sm">Mots appris</p>
                <p className="text-3xl font-bold text-white">
                  {progress?.wordsLearned.length || 0}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 border-secondary/20 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <Target className="text-secondary" size={24} />
              </div>
              <div>
                <p className="text-secondary text-sm">Exercices complétés</p>
                <p className="text-3xl font-bold text-white">
                  {progress?.exercisesCompleted || 0}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 border-secondary/20 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Flame className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-secondary text-sm">Série d'apprentissage</p>
                <p className="text-3xl font-bold text-white">
                  {progress?.learningStreak || 0} jours
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 border-secondary/20 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Target className="text-yellow-400" size={24} />
              </div>
              <div>
                <p className="text-secondary text-sm">Taux de précision</p>
                <p className="text-3xl font-bold text-white">{accuracyRate}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Chart */}
        {progress && progress.totalAttempts > 0 && (
          <Card className="bg-white/5 border-secondary/20 p-6 mb-8">
            <h3 className="text-xl font-bold text-primary font-heading mb-6">
              Performance aux exercices
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 208, 255, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
                <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 23, 46, 0.9)',
                    border: '1px solid rgba(0, 208, 255, 0.3)',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#FBBF24" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Learning Level */}
        <Card className="bg-white/5 border-secondary/20 p-6">
          <h3 className="text-xl font-bold text-primary font-heading mb-4">
            Niveau d'apprentissage
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white font-semibold">
                  {progress?.currentLevel || 'Débutant'}
                </p>
                <p className="text-secondary text-sm">
                  {progress?.wordsLearned.length || 0} / 500 mots
                </p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(((progress?.wordsLearned.length || 0) / 500) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
