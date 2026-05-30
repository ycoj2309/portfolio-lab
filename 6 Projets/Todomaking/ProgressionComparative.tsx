import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "shadcn";
import { Badge } from "shadcn";
import { Progress } from "shadcn";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";

interface TaskProgress {
  name: string;
  category: string;
  priority: "Haute" | "Moyenne" | "Basse";
  progressYesterday: number;
  progressToday: number;
}

const ProgressionComparative = () => {
  const tasks: TaskProgress[] = [
    // Environnement Dev
    {
      name: "Installer Node.js",
      category: "Environnement Dev",
      priority: "Haute",
      progressYesterday: 0,
      progressToday: 30,
    },
    {
      name: "Installer Google Chrome",
      category: "Environnement Dev",
      priority: "Haute",
      progressYesterday: 0,
      progressToday: 30,
    },
    {
      name: "Installer Git Bash",
      category: "Environnement Dev",
      priority: "Haute",
      progressYesterday: 0,
      progressToday: 30,
    },
    // Professionnel
    {
      name: "Se renseigner sur Orasio et contacter Florian Fournier",
      category: "Professionnel",
      priority: "Haute",
      progressYesterday: 0,
      progressToday: 20,
    },
    // Administratif
    {
      name: "Télécharger Edusign Student",
      category: "Administratif",
      priority: "Haute",
      progressYesterday: 0,
      progressToday: 0,
    },
    {
      name: "Configurer compte Edusign",
      category: "Administratif",
      priority: "Haute",
      progressYesterday: 0,
      progressToday: 0,
    },
    {
      name: "Confirmer email Slack",
      category: "Administratif",
      priority: "Moyenne",
      progressYesterday: 0,
      progressToday: 0,
    },
    // Personnel
    {
      name: "Choisir prénom bébé",
      category: "Personnel",
      priority: "Haute",
      progressYesterday: 30,
      progressToday: 40,
    },
    // Formation
    {
      name: "Consulter présentation JavaScript découverte",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 0,
      progressToday: 0,
    },
    {
      name: "Exercice variables (02-01)",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 0,
      progressToday: 0,
    },
    {
      name: "Exercice fonctions (02-02)",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 0,
      progressToday: 0,
    },
    {
      name: "Exercice conditions (02-03)",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 0,
      progressToday: 0,
    },
    {
      name: "Exercice chaînes de caractères (01-01)",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 20,
      progressToday: 35,
    },
    {
      name: "Exercice listes (01-02)",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 10,
      progressToday: 10,
    },
    {
      name: "Exercice calculs listes (01-03)",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 0,
      progressToday: 0,
    },
    {
      name: "Exercice dates (01-03)",
      category: "Formation",
      priority: "Moyenne",
      progressYesterday: 0,
      progressToday: 0,
    },
    // Financier
    {
      name: "Analyser opportunités BNP Paribas 2026",
      category: "Financier",
      priority: "Moyenne",
      progressYesterday: 5,
      progressToday: 5,
    },
  ];

  const getProgressChange = (yesterday: number, today: number) => {
    return today - yesterday;
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getPriorityBadgeVariant = (priority: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (priority) {
      case "Haute":
        return "destructive";
      case "Moyenne":
        return "default";
      case "Basse":
        return "secondary";
      default:
        return "outline";
    }
  };

  const categories = Array.from(new Set(tasks.map(t => t.category)));

  const getOverallProgress = (day: "yesterday" | "today") => {
    const field = day === "yesterday" ? "progressYesterday" : "progressToday";
    const total = tasks.reduce((sum, task) => sum + task[field], 0);
    return Math.round(total / tasks.length);
  };

  const getCategoryProgress = (category: string, day: "yesterday" | "today") => {
    const field = day === "yesterday" ? "progressYesterday" : "progressToday";
    const categoryTasks = tasks.filter(t => t.category === category);
    const total = categoryTasks.reduce((sum, task) => sum + task[field], 0);
    return Math.round(total / categoryTasks.length);
  };

  const getTasksWithProgress = () => {
    return tasks.filter(t => t.progressYesterday > 0 || t.progressToday > 0);
  };

  const getTasksWithChange = () => {
    return tasks.filter(t => t.progressToday !== t.progressYesterday);
  };

  const yesterdayOverall = getOverallProgress("yesterday");
  const todayOverall = getOverallProgress("today");
  const overallChange = todayOverall - yesterdayOverall;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-background">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            Progression Comparative : 22 vs 23 Janvier 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hier */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Hier (22 janvier)</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Progress value={yesterdayOverall} className="flex-1" />
                  <span className="text-2xl font-bold">{yesterdayOverall}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Progression globale</p>
              </div>
            </div>

            {/* Aujourd'hui */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <p className="text-sm font-medium text-blue-500">Aujourd'hui (23 janvier)</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Progress value={todayOverall} className="flex-1" />
                  <span className="text-2xl font-bold text-blue-500">{todayOverall}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Progression globale</p>
              </div>
            </div>

            {/* Évolution */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getTrendIcon(overallChange)}
                <p className="text-sm font-medium">Évolution</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${overallChange > 0 ? 'text-green-500' : overallChange < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    {overallChange > 0 ? '+' : ''}{overallChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {overallChange > 0 && '🎉 Progression positive !'}
                  {overallChange === 0 && '⏸️ Aucun changement'}
                  {overallChange < 0 && '⚠️ Régression'}
                </p>
              </div>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tâches modifiées</p>
              <p className="text-xl font-bold">{getTasksWithChange().length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tâches en cours</p>
              <p className="text-xl font-bold">{getTasksWithProgress().length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total tâches</p>
              <p className="text-xl font-bold">{tasks.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Catégories</p>
              <p className="text-xl font-bold">{categories.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progression par catégorie */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Progression par Catégorie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map(category => {
            const yesterdayProg = getCategoryProgress(category, "yesterday");
            const todayProg = getCategoryProgress(category, "today");
            const change = todayProg - yesterdayProg;

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{category}</h3>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(change)}
                    <span className={`text-sm font-bold ${change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                      {change > 0 ? '+' : ''}{change}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Hier</p>
                    <div className="flex items-center gap-2">
                      <Progress value={yesterdayProg} className="flex-1" />
                      <span className="text-sm font-medium w-10">{yesterdayProg}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-blue-500">Aujourd'hui</p>
                    <div className="flex items-center gap-2">
                      <Progress value={todayProg} className="flex-1" />
                      <span className="text-sm font-medium w-10 text-blue-500">{todayProg}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Détail des tâches modifiées */}
      <Card>
        <CardHeader>
          <CardTitle>🔄 Tâches avec Changements ({getTasksWithChange().length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {getTasksWithChange().length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune tâche n'a été mise à jour entre hier et aujourd'hui.</p>
          ) : (
            getTasksWithChange().map((task, idx) => {
              const change = getProgressChange(task.progressYesterday, task.progressToday);
              return (
                <div key={idx} className="border rounded-lg p-4 space-y-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{task.category}</span>
                      </div>
                      <p className="font-medium">{task.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(change)}
                      <span className={`text-lg font-bold ${change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                        {change > 0 ? '+' : ''}{change}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Hier (22 jan)</p>
                      <div className="flex items-center gap-2">
                        <Progress value={task.progressYesterday} className="flex-1" />
                        <span className="text-sm font-medium w-10">{task.progressYesterday}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-500">Aujourd'hui (23 jan)</p>
                      <div className="flex items-center gap-2">
                        <Progress value={task.progressToday} className="flex-1" />
                        <span className="text-sm font-medium w-10 text-blue-500">{task.progressToday}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Tâches sans changement */}
      <Card>
        <CardHeader>
          <CardTitle>⏸️ Tâches Sans Changement ({tasks.length - getTasksWithChange().length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.filter(t => t.progressToday === t.progressYesterday).map((task, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs">
                    {task.priority}
                  </Badge>
                  <span className="text-sm">{task.name}</span>
                  <span className="text-xs text-muted-foreground">({task.category})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={task.progressToday} className="w-20" />
                  <span className="text-sm font-medium w-10">{task.progressToday}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressionComparative;