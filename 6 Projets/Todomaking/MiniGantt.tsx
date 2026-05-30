import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "shadcn";
import { Badge } from "shadcn";
import { Button } from "shadcn";
import { Progress } from "shadcn";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";

interface Task {
  id: string;
  name: string;
  priority: "Haute" | "Moyenne" | "Basse";
  category: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  responsible: string;
}

const MiniGantt = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Environnement Dev", "Formation", "Administratif", "Professionnel", "Personnel", "Financier"])
  );
  const [filterPriority, setFilterPriority] = useState<string>("Toutes");

  const today = new Date("2026-01-23");
  
  const tasks: Task[] = [
    // Environnement Dev - Priorité Haute
    {
      id: "1",
      name: "Installer Node.js",
      priority: "Haute",
      category: "Environnement Dev",
      startDate: new Date("2026-01-22"),
      endDate: new Date("2026-01-23"),
      progress: 95,
      responsible: "Jahdiel KINVI"
    },
    {
      id: "2",
      name: "Installer Google Chrome",
      priority: "Haute",
      category: "Environnement Dev",
      startDate: new Date("2026-01-22"),
      endDate: new Date("2026-01-23"),
      progress: 100,
      responsible: "Jahdiel KINVI"
    },
    {
      id: "3",
      name: "Installer Git Bash",
      priority: "Haute",
      category: "Environnement Dev",
      startDate: new Date("2026-01-22"),
      endDate: new Date("2026-01-23"),
      progress: 95,
      responsible: "Jahdiel KINVI"
    },
    // Administratif - Priorité Haute
    {
      id: "4",
      name: "Télécharger Edusign Student",
      priority: "Haute",
      category: "Administratif",
      startDate: new Date("2026-01-22"),
      endDate: new Date("2026-01-24"),
      progress: 0,
      responsible: "Jahdiel KINVI"
    },
    {
      id: "5",
      name: "Configurer compte Edusign",
      priority: "Haute",
      category: "Administratif",
      startDate: new Date("2026-01-23"),
      endDate: new Date("2026-01-24"),
      progress: 0,
      responsible: "Jahdiel KINVI"
    },
    // Professionnel - Nouvelle opportunité
    {
      id: "6",
      name: "Se renseigner sur Orasio et confirmer intérêt (CV transmis)",
      priority: "Haute",
      category: "Professionnel",
      startDate: new Date("2026-01-22"),
      endDate: new Date("2026-01-23"),
      progress: 100,
      responsible: "Jahdiel KINVI"
    },
    {
      id: "18",
      name: "Attendre retour Orasio pour entretien",
      priority: "Moyenne",
      category: "Professionnel",
      startDate: new Date("2026-01-23"),
      endDate: new Date("2026-01-31"),
      progress: 20,
      responsible: "Florian Fournier"
    },
    // Personnel
    {
      id: "17",
      name: "Choisir prénom bébé",
      priority: "Haute",
      category: "Personnel",
      startDate: new Date("2026-01-22"),
      endDate: new Date("2026-01-29"),
      progress: 65,
      responsible: "Jahdiel KINVI"
    },
    // Formation - JavaScript
    {
      id: "7",
      name: "Consulter présentation JavaScript découverte",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-23"),
      endDate: new Date("2026-01-25"),
      progress: 0,
      responsible: "Non spécifié"
    },
    {
      id: "8",
      name: "Exercice variables (02-01)",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-24"),
      endDate: new Date("2026-01-26"),
      progress: 0,
      responsible: "Non spécifié"
    },
    {
      id: "9",
      name: "Exercice fonctions (02-02)",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-26"),
      endDate: new Date("2026-01-28"),
      progress: 0,
      responsible: "Non spécifié"
    },
    {
      id: "10",
      name: "Exercice conditions (02-03)",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-28"),
      endDate: new Date("2026-01-30"),
      progress: 0,
      responsible: "Non spécifié"
    },
    // Formation - Google Sheets
    {
      id: "11",
      name: "Exercice chaînes de caractères (01-01)",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-23"),
      endDate: new Date("2026-01-25"),
      progress: 70,
      responsible: "Non spécifié"
    },
    {
      id: "12",
      name: "Exercice listes (01-02)",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-25"),
      endDate: new Date("2026-01-27"),
      progress: 10,
      responsible: "Non spécifié"
    },
    {
      id: "13",
      name: "Exercice calculs listes (01-03)",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-27"),
      endDate: new Date("2026-01-29"),
      progress: 0,
      responsible: "Non spécifié"
    },
    {
      id: "14",
      name: "Exercice dates (01-03)",
      priority: "Moyenne",
      category: "Formation",
      startDate: new Date("2026-01-29"),
      endDate: new Date("2026-01-31"),
      progress: 0,
      responsible: "Non spécifié"
    },
    // Autres
    {
      id: "15",
      name: "Analyser opportunités BNP Paribas 2026",
      priority: "Moyenne",
      category: "Financier",
      startDate: new Date("2026-01-25"),
      endDate: new Date("2026-02-05"),
      progress: 5,
      responsible: "Non spécifié"
    },
    {
      id: "16",
      name: "Confirmer email Slack",
      priority: "Moyenne",
      category: "Administratif",
      startDate: new Date("2026-01-22"),
      endDate: new Date("2026-01-24"),
      progress: 0,
      responsible: "Jahdiel KINVI"
    }
  ];

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredTasks = tasks.filter(task => 
    filterPriority === "Toutes" || task.priority === filterPriority
  );

  const categories = Array.from(new Set(filteredTasks.map(t => t.category)));

  const getTimelineStart = () => {
    return new Date("2026-01-22");
  };

  const getTimelineEnd = () => {
    return new Date("2026-02-05");
  };

  const calculatePosition = (date: Date) => {
    const start = getTimelineStart().getTime();
    const end = getTimelineEnd().getTime();
    const current = date.getTime();
    return ((current - start) / (end - start)) * 100;
  };

  const calculateWidth = (startDate: Date, endDate: Date) => {
    const start = getTimelineStart().getTime();
    const end = getTimelineEnd().getTime();
    const taskStart = startDate.getTime();
    const taskEnd = endDate.getTime();
    return ((taskEnd - taskStart) / (end - start)) * 100;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "bg-red-500";
      case "Moyenne":
        return "bg-yellow-500";
      case "Basse":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
  };

  const generateTimelineLabels = () => {
    const labels = [];
    const start = getTimelineStart();
    const end = getTimelineEnd();
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const step = Math.max(1, Math.floor(diffDays / 7));
    
    for (let i = 0; i <= diffDays; i += step) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      labels.push(date);
    }
    return labels;
  };

  const getOverallProgress = () => {
    const totalProgress = filteredTasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / filteredTasks.length);
  };

  const getTasksByPriority = (priority: string) => {
    return filteredTasks.filter(t => t.priority === priority).length;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-background">
      {/* Header avec stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">📊 Mini GANTT - Gestion des Tâches</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Progression Globale</p>
              <div className="flex items-center gap-2">
                <Progress value={getOverallProgress()} className="flex-1" />
                <span className="text-lg font-bold">{getOverallProgress()}%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Tâches</p>
              <p className="text-2xl font-bold">{filteredTasks.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Priorité Haute</p>
              <p className="text-2xl font-bold text-red-500">{getTasksByPriority("Haute")}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Période</p>
              <p className="text-sm font-medium">{formatDate(getTimelineStart())} - {formatDate(getTimelineEnd())}</p>
            </div>
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtrer par priorité:</span>
            {["Toutes", "Haute", "Moyenne", "Basse"].map(priority => (
              <Button
                key={priority}
                variant={filterPriority === priority ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterPriority(priority)}
              >
                {priority}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex">
            <div className="w-80 flex-shrink-0"></div>
            <div className="flex-1 relative" style={{ minHeight: "30px" }}>
              <div className="flex justify-between text-xs text-muted-foreground">
                {generateTimelineLabels().map((date, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="font-medium">{formatDate(date)}</div>
                  </div>
                ))}
              </div>
              {/* Ligne aujourd'hui */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-10"
                style={{ left: `${calculatePosition(today)}%` }}
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-500 whitespace-nowrap">
                  Aujourd'hui
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gantt par catégorie */}
      {categories.map(category => {
        const categoryTasks = filteredTasks.filter(t => t.category === category);
        const isExpanded = expandedCategories.has(category);
        const categoryProgress = Math.round(
          categoryTasks.reduce((sum, task) => sum + task.progress, 0) / categoryTasks.length
        );

        return (
          <Card key={category}>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleCategory(category)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <Badge variant="outline">{categoryTasks.length} tâches</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Progress value={categoryProgress} className="w-24" />
                    <span className="text-sm font-medium">{categoryProgress}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="space-y-2 pb-4">
                {categoryTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 hover:bg-muted/30 p-2 rounded-lg transition-colors">
                    <div className="w-80 flex-shrink-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-sm font-medium truncate">{task.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(task.startDate)} → {formatDate(task.endDate)}
                      </div>
                    </div>
                    
                    <div className="flex-1 relative h-8">
                      {/* Background bar */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 h-6 bg-muted rounded"
                        style={{
                          left: `${calculatePosition(task.startDate)}%`,
                          width: `${calculateWidth(task.startDate, task.endDate)}%`
                        }}
                      >
                        {/* Progress bar */}
                        <div 
                          className={`h-full rounded ${getPriorityColor(task.priority)} opacity-80 flex items-center justify-center`}
                          style={{ width: `${task.progress}%` }}
                        >
                          {task.progress > 15 && (
                            <span className="text-xs font-bold text-white">{task.progress}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-16 text-right">
                      <span className="text-sm font-bold">{task.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        );
      })}

      {/* Légende */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6 text-sm flex-wrap">
            <span className="font-medium">Légende:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Haute priorité</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Moyenne priorité</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Basse priorité</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-blue-500"></div>
              <span>Aujourd'hui</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiniGantt;