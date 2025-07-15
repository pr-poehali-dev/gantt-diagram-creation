import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Task {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dependencies: string[];
}

const GanttChart = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Разработка дизайна магазина',
      description: 'Создание UI/UX дизайна для парфюмерного магазина',
      startDate: '2024-07-01',
      endDate: '2024-07-10',
      duration: 9,
      progress: 100,
      status: 'completed',
      priority: 'high',
      assignee: 'Дизайнер',
      dependencies: []
    },
    {
      id: '2',
      name: 'Разработка каталога товаров',
      description: 'Создание системы каталога с карточками парфюмов',
      startDate: '2024-07-08',
      endDate: '2024-07-15',
      duration: 7,
      progress: 100,
      status: 'completed',
      priority: 'high',
      assignee: 'Разработчик',
      dependencies: ['1']
    },
    {
      id: '3',
      name: 'Интеграция корзины покупок',
      description: 'Добавление функционала корзины и оформления заказов',
      startDate: '2024-07-12',
      endDate: '2024-07-20',
      duration: 8,
      progress: 85,
      status: 'in-progress',
      priority: 'high',
      assignee: 'Разработчик',
      dependencies: ['2']
    },
    {
      id: '4',
      name: 'Система авторизации',
      description: 'Реализация входа и регистрации пользователей',
      startDate: '2024-07-18',
      endDate: '2024-07-25',
      duration: 7,
      progress: 30,
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Backend разработчик',
      dependencies: ['3']
    },
    {
      id: '5',
      name: 'Система платежей',
      description: 'Интеграция платежных систем',
      startDate: '2024-07-22',
      endDate: '2024-07-30',
      duration: 8,
      progress: 0,
      status: 'pending',
      priority: 'high',
      assignee: 'Backend разработчик',
      dependencies: ['4']
    },
    {
      id: '6',
      name: 'Мобильная оптимизация',
      description: 'Адаптация под мобильные устройства',
      startDate: '2024-07-25',
      endDate: '2024-08-05',
      duration: 11,
      progress: 0,
      status: 'pending',
      priority: 'medium',
      assignee: 'Frontend разработчик',
      dependencies: ['3']
    },
    {
      id: '7',
      name: 'Тестирование и отладка',
      description: 'Полное тестирование всех функций магазина',
      startDate: '2024-08-01',
      endDate: '2024-08-10',
      duration: 9,
      progress: 0,
      status: 'pending',
      priority: 'high',
      assignee: 'QA тестировщик',
      dependencies: ['5', '6']
    },
    {
      id: '8',
      name: 'Деплой и запуск',
      description: 'Развертывание на продакшн сервере',
      startDate: '2024-08-08',
      endDate: '2024-08-12',
      duration: 4,
      progress: 0,
      status: 'pending',
      priority: 'high',
      assignee: 'DevOps инженер',
      dependencies: ['7']
    }
  ]);

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDateRange = () => {
    const start = new Date('2024-07-01');
    const end = new Date('2024-08-15');
    const dates = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    
    return dates;
  };

  const calculatePosition = (startDate: string, endDate: string) => {
    const projectStart = new Date('2024-07-01');
    const taskStart = new Date(startDate);
    const taskEnd = new Date(endDate);
    
    const totalDays = 45; // общая длительность проекта
    const startOffset = Math.floor((taskStart.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.floor((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`
    };
  };

  const updateTaskProgress = (taskId: string, progress: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            progress,
            status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'pending'
          }
        : task
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Диаграмма Ганта проекта</h2>
          <p className="text-gray-600">Управление задачами разработки парфюмерного магазина</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={viewMode} onValueChange={(value: 'month' | 'week' | 'day') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="day">День</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить задачу
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Новая задача</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="task-name">Название задачи</Label>
                  <Input id="task-name" placeholder="Введите название..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-desc">Описание</Label>
                  <Textarea id="task-desc" placeholder="Описание задачи..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Дата начала</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Дата окончания</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Приоритет</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="low">Низкий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Исполнитель</Label>
                    <Input id="assignee" placeholder="Имя исполнителя" />
                  </div>
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  Создать задачу
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Timeline Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Временная шкала проекта</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Date Headers */}
            <div className="relative">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Июль 2024</span>
                <span>Август 2024</span>
              </div>
              <div className="grid grid-cols-15 gap-px bg-gray-200 h-6 rounded">
                {Array.from({ length: 45 }, (_, i) => (
                  <div key={i} className="bg-white"></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>01</span>
                <span>08</span>
                <span>15</span>
                <span>22</span>
                <span>29</span>
                <span>05</span>
                <span>12</span>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {tasks.map((task) => {
                const position = calculatePosition(task.startDate, task.endDate);
                return (
                  <div key={task.id} className="flex items-center space-x-4">
                    <div className="w-64 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{task.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                            </Badge>
                            <span className="text-xs text-gray-500">{task.assignee}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTask(task)}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <Icon name="Edit" size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 relative h-8 bg-gray-100 rounded">
                      <div
                        className={`absolute top-0 h-full rounded ${getStatusColor(task.status)} opacity-80`}
                        style={position}
                      >
                        <div className="relative h-full">
                          <div 
                            className="h-full bg-white bg-opacity-30 rounded"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {task.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-xs text-gray-500">
                      {task.duration} дней
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Icon name="CheckCircle" size={20} className="mr-2 text-green-600" />
              Выполнено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <p className="text-sm text-gray-600">из {tasks.length} задач</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Icon name="Clock" size={20} className="mr-2 text-blue-600" />
              В работе
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <p className="text-sm text-gray-600">активных задач</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Icon name="Calendar" size={20} className="mr-2 text-gray-600" />
              Прогресс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)}%
            </div>
            <Progress 
              value={tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length} 
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedTask.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">{selectedTask.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">ДАТА НАЧАЛА</Label>
                  <p className="font-medium">{new Date(selectedTask.startDate).toLocaleDateString('ru-RU')}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">ДАТА ОКОНЧАНИЯ</Label>
                  <p className="font-medium">{new Date(selectedTask.endDate).toLocaleDateString('ru-RU')}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-gray-500">ПРОГРЕСС</Label>
                <div className="flex items-center space-x-3 mt-1">
                  <Progress value={selectedTask.progress} className="flex-1" />
                  <span className="font-medium">{selectedTask.progress}%</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTaskProgress(selectedTask.id, Math.max(0, selectedTask.progress - 10))}
                >
                  -10%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTaskProgress(selectedTask.id, Math.min(100, selectedTask.progress + 10))}
                >
                  +10%
                </Button>
                <Button
                  size="sm"
                  className="bg-black hover:bg-gray-800 text-white"
                  onClick={() => updateTaskProgress(selectedTask.id, 100)}
                >
                  Завершить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default GanttChart;